<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassTeacherSubjects;
use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
  public function create($quiz_id)
  {
    $quiz = Quiz::find($quiz_id);
    $kelas = ClassTeacherSubjects::with('class')->where('id', $quiz->class_teacher_subject_id)->first();
    return Inertia::render('Teacher/TeacherQuestionCreate', [
      'quiz' => $quiz,
      'kelas' => $kelas,
    ]);
  }

  public function store(Request $request, $quiz_id)
  {
    // dd($request->all());
    Validator::make($request->all(), [
      'question' => 'required|string',
      'correct_answer' => 'required|string',
      'answer2' => 'required|string',
      'answer3' => 'required|string',
      'answer4' => 'required|string',
      'score' => 'required|numeric',
    ])->validate();

    $question = new Question();
    $question->question = $request->input('question');
    $question->quiz_id = $quiz_id;
    $question->correct_answer = $request->input('correct_answer');
    $question->answer2 = $request->input('answer2');
    $question->answer3 = $request->input('answer3');
    $question->answer4 = $request->input('answer4');
    $question->score = $request->input('score');

    $question->save();
  }
}
