<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassTeacherSubjects;
use App\Models\Quiz;
use App\Models\Assignment;
use App\Models\AssignmentSubmit;
use App\Models\StudentAnswer;
use Inertia\Inertia;

class StudentReportController extends Controller
{
  public function index(Request $request, $season_id)
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

    $averageAssignmentScores = AssignmentSubmit::selectRaw('class_teacher_subjects.id as cts_id, subjects.name as subject_name, AVG(assignment_submits.score) as average_score')
      ->join('assignments', 'assignments.id', '=', 'assignment_submits.assignment_id')
      ->join('class_teacher_subjects', 'class_teacher_subjects.id', '=', 'assignments.class_teacher_subject_id')
      ->join('subjects', 'subjects.id', '=', 'class_teacher_subjects.subject_id')
      ->whereHas('assignment.cts.class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('assignment.cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->groupBy('class_teacher_subjects.id', 'subjects.name')
      ->get();

    $averageQuizScores = StudentAnswer::selectRaw('class_teacher_subjects.id as cts_id, subjects.name as subject_name, COUNT(student_answers.id) as total_answers, SUM(student_answers.score) as total_score, AVG(student_answers.score) as average_score')
      ->join('quizzes', 'quizzes.id', '=', 'student_answers.quiz_id')
      ->join('class_teacher_subjects', 'class_teacher_subjects.id', '=', 'quizzes.class_teacher_subject_id')
      ->join('subjects', 'subjects.id', '=', 'class_teacher_subjects.subject_id')
      ->whereHas('quiz.cts.class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('quiz.cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->groupBy('class_teacher_subjects.id', 'subjects.name')
      ->get();

    $quizzesCount = Quiz::with('cts.class.student_class.student.user', 'cts.subject', 'question', 'student_answer')
      ->whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->count();


    // dd($quizzesCount);

    return Inertia::render('Student/StudentReport', [
      'averageAssignmentScores' => $averageAssignmentScores,
      'averageQuizScores' => $averageQuizScores,
      'ctsAll' => $ctsAll,
      'quizzesCount' => $quizzesCount
    ]);
  }

  public function ctsIndex(Request $request, $cts_id)
  {
    $user = $request->user();

    $ctsItem = ClassTeacherSubjects::with('subject', 'teaching_material', 'class.season', 'assignment.assignment_submit.student.user')->find($cts_id);

    $thisSeason = $ctsItem->class->season;

    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season', 'assignment')
      ->whereHas('class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($thisSeason) {
        $query->where('id', $thisSeason->id);
      })
      ->get();

    $assignmentSubmits = AssignmentSubmit::with('assignment')->whereHas('assignment.cts', function ($query) use ($cts_id) {
      $query->where('id', $cts_id);
    })->whereHas('student.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })->get();

    $quizzes = Quiz::with('student_answer')->where('class_teacher_subject_id', $cts_id)
      ->whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })->get();

    return Inertia::render('Student/StudentStr', [
      'assignmentSubmits' => $assignmentSubmits,
      'quizzes' => $quizzes,
      'ctsAll' => $ctsAll,
      'ctsItem' => $ctsItem
    ]);
  }
}
