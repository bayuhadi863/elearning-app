<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AssignmentSubmit;
use App\Models\Assignment;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class TeacherAssignmentSubmitController extends Controller
{
  public function download($assignmentSubmit_id)
  {
    $file = AssignmentSubmit::find($assignmentSubmit_id);
    $myFile = public_path("document/$file->file");
    $newName = substr($file->file, 10);

    return response()->download($myFile, $newName);
  }

  public function show($assignmentSubmit_id)
  {
    $assignmentSubmit = AssignmentSubmit::with('assignment.cts.subject', 'student.user')->find($assignmentSubmit_id);

    // dd($assignmentSubmit);

    return Inertia::render('Teacher/TeacherAssignmentSubmitShow', [
      'assignmentSubmit' => $assignmentSubmit,
    ]);
  }

  public function update(Request $request, $assignmentSubmit_id)
  {
    Validator::make($request->all(), [
      'teacher_note' => 'nullable|string',
      'score' => 'required|numeric',
    ])->validate();

    $assignmentSubmit = AssignmentSubmit::find($assignmentSubmit_id);

    if ($request->input('teacher_note')) {
      $assignmentSubmit->teacher_note = $request->input('teacher_note');
    }

    $assignmentSubmit->score = $request->input('score');

    $assignmentSubmit->save();
    return redirect()->back()->with('message', 'Berhasil Submit Tugas');
  }
}
