<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassTeacherSubjects;
use App\Models\Quiz;
use App\Models\StudentAnswer;
use App\Models\Question;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
  public function index(Request $request, $season_id)
  {
    $user = $request->user();
    $role = $user->role;
    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season', 'assignment')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $thisSeasonQuizzes = Quiz::with('cts.class.student_class.student.user', 'question')
      ->whereHas('cts.teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->latest()->get();

    // dd($thisSeasonQuizzes);
    // dd($ctsAll);


    return Inertia::render('Teacher/TeacherQuiz', [
      'thisSeasonQuizzes' => $thisSeasonQuizzes,
      'ctsAll' => $ctsAll,
    ]);
  }

  public function classIndex(Request $request, $cts_id)
  {
    $user = $request->user();
    $kelas = ClassTeacherSubjects::with('class.season', 'assignment')->find($cts_id);
    $quizzes = Quiz::with('cts.class.season', 'question')->where('class_teacher_subject_id', $cts_id)->latest()->get();

    $selectedSeason = $kelas->class->season;

    // dd($selectedSeason);

    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season', 'assignment')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($selectedSeason) {
        $query->where('id', $selectedSeason->id);
      })
      ->get();

    return Inertia::render('Teacher/TeacherCtq', [
      'kelas' => $kelas,
      'quizzes' => $quizzes,
      'ctsAll' => $ctsAll
    ]);
  }

  public function create($cts_id)
  {
    $kelas = ClassTeacherSubjects::with('class')->find($cts_id);
    return Inertia::render('Teacher/TeacherQuizCreate', [
      'kelas' => $kelas
    ]);
  }

  public function store(Request $request, $cts_id)
  {
    Validator::make($request->all(), [
      'title' => 'required|string|max:255',
      'number_of_question' => 'required|numeric',
    ])->validate();

    $quiz = new Quiz();
    $quiz->title = $request->input('title');
    $quiz->class_teacher_subject_id = $cts_id;
    $quiz->number_of_question = $request->input('number_of_question');
    $quiz->deadline = null;

    $quiz->save();

    return redirect()->back()->with('message', 'Berhasil Membuat Kuis');
  }

  public function start(Request $request, $quiz_id)
  {
    // dd($request->all());
    Validator::make($request->all(), [
      'deadline' => 'required',
    ])->validate();

    $quiz = Quiz::find($quiz_id);

    $quiz->deadline = $request->input('deadline');
    $quiz->is_started = true;

    $quiz->save();

    return redirect()->back()->with('message', 'Berhasil Memulai Kuis');
  }

  public function studentIndex(Request $request, $season_id)
  {
    $user = $request->user();
    $ctsAll = ClassTeacherSubjects::with('subject', 'class.season')
      ->whereHas('class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $thisSeasonQuizzes = Quiz::with('cts.class.student_class.student.user', 'cts.subject', 'question', 'student_answer')
      ->whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->latest()->get();

    // dd($thisSeasonQuizzes);
    // dd($ctsAll);

    return Inertia::render('Student/StudentQuiz', [
      'thisSeasonQuizzes' => $thisSeasonQuizzes,
      'ctsAll' => $ctsAll,
    ]);
  }

  public function studentCtsIndex(Request $request, $cts_id)
  {
    $user = $request->user();

    $ctsItem = ClassTeacherSubjects::with('subject', 'teaching_material', 'class.season', 'assignment.assignment_submit.student.user')->find($cts_id);



    $thisSeason = $ctsItem->class->season;

    $ctsAll = ClassTeacherSubjects::with('subject', 'class.season')
      ->whereHas('class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($thisSeason) {
        $query->where('id', $thisSeason->id);
      })
      ->get();

    // $thisCtsAssignments = $ctsItem->assignment ?? [];
    $thisCtsQuizzes = Quiz::with('cts.class', 'cts.subject', 'question', 'student_answer')->where('class_teacher_subject_id', $cts_id)->latest()->get();

    // dd($thisCtsQuizzes);

    return Inertia::render('Student/StudentStq', [
      'ctsAll' => $ctsAll,
      'thisCtsQuizzes' => $thisCtsQuizzes,
      'ctsItem' => $ctsItem,
    ]);
  }

  public function answerCreate($quiz_id)
  {
    $quiz = Quiz::with('question', 'cts.subject')->find($quiz_id);
    return Inertia::render('Student/StudentQuizAnswerCreate', [
      'quiz' => $quiz
    ]);
  }

  public function answerStore(Request $request, $quiz_id)
  {
    $input = $request->all();
    // dd($input);

    foreach ($input as $item) {
      // dd($item['question_id']);
      StudentAnswer::create([
        'question_id' => $item['question_id'],
        'quiz_id' => $quiz_id,
        'answer' => $item['answer'],
        'score' => $item['score'],
      ]);
    }

    return redirect()->back()->with('message', 'Berhasil Mengerjakan Kuis');
  }

  public function destroy($quiz_id)
  {
    $quiz = Quiz::find($quiz_id);
    $questions = Question::where('quiz_id', $quiz_id);
    $studentAnswers = StudentAnswer::where('quiz_id', $quiz_id);

    if ($studentAnswers) {
      $studentAnswers->delete();
    }

    if ($questions) {
      $questions->delete();
    }

    $quiz->delete();

    return redirect()->back()->with('message', 'Berhasil Menghapus Kuis');
  }
}
