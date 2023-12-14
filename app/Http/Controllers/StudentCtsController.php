<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassTeacherSubjects;
use App\Models\Student;

class StudentCtsController extends Controller
{
  public function index(Request $request, $season_id)
  {
    $user = $request->user();

    $cts = ClassTeacherSubjects::with('teacher.user', 'subject', 'class.student_class.student.user', 'class.season')
      ->whereHas('class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    return Inertia::render('Student/StudentCts', [
      'cts' => $cts,
    ]);
  }

  public function show(Request $request, $cts_id)
  {
    $cts = ClassTeacherSubjects::with('teacher.user', 'subject', 'class.student_class.student.user', 'teaching_material', 'assignment.assignment_submit')->find($cts_id);
    $materi = $cts->teaching_material()
      ->orderBy('updated_at', 'desc')
      ->limit(1)
      ->get();

    $assignments = $cts->assignment()
      ->with('assignment_submit.student.user')
      ->orderBy('updated_at', 'desc')
      ->limit(1)
      ->get();

    $user = $request->user();
    $student = Student::where('user_id', $user->id)->first();

    $unSubmittedAssignments = $cts->assignment
      ->flatMap(function ($assignment) use ($student) {
        return $assignment->assignment_submit
          ->where('student_id', $student->id)
          ->whereNull('file')
          ->whereNull('link');
      });


    // dd($unSubmittedAssignments);

    return Inertia::render('Student/StudentCtsShow', [
      'cts' => $cts,
      'assignments' => $assignments,
      'materi' => $materi,
      'unSubmittedAssignments' => $unSubmittedAssignments
    ]);
  }
}
