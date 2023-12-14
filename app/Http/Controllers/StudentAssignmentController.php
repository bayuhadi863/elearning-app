<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassTeacherSubjects;
use App\Models\Season;
use App\Models\Assignment;
use App\Models\Student;
use App\Models\AssignmentSubmit;
use Inertia\Inertia;

class StudentAssignmentController extends Controller
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

    $thisSeasonAssignments = Assignment::with('cts.class.student_class.student.user', 'assignment_submit.student.user')
      ->whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->latest()->get();

    // dd($thisSeasonAssignments);

    return Inertia::render('Student/StudentAssignment', [
      'thisSeasonAssignments' => $thisSeasonAssignments,
      'ctsAll' => $ctsAll,
      'user' => $user,
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

    // $thisCtsAssignments = $ctsItem->assignment ?? [];
    $thisCtsAssignments = Assignment::with('cts.class', 'assignment_submit.student.user')->where('class_teacher_subject_id', $cts_id)->latest()->get();

    return Inertia::render('Student/StudentSta', [
      'ctsAll' => $ctsAll,
      'thisCtsAssignments' => $thisCtsAssignments,
      'ctsItem' => $ctsItem,
    ]);
  }

  public function download($assignment_id)
  {
    $file = Assignment::find($assignment_id);
    $myFile = public_path("document/$file->file");
    $newName = substr($file->file, 10);

    return response()->download($myFile, $newName);
  }

  public function show(Request $request, $assignment_id)
  {
    $user = $request->user();
    $thisStudent = Student::where('user_id', $user->id)->first();

    $assignment = Assignment::with('cts.teacher.user', 'cts.subject', 'assignment_submit')->find($assignment_id);

    $assignment_submit = AssignmentSubmit::where('student_id', $thisStudent->id)
      ->where('assignment_id', $assignment_id)
      ->first();
    // dd($assignment_submit);

    return Inertia::render('Student/StudentAssignmentShow', [
      'assignment' => $assignment,
      'assignment_submit' => $assignment_submit,
    ]);
  }
}
