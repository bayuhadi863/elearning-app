<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Assignment;
use App\Models\Student;
use App\Models\AssignmentSubmit;
use Illuminate\Support\Facades\File;

class StudentAssignmentSubmitController extends Controller
{
  public function update(Request $request, $assignmentSubmit_id)
  {
    Validator::make($request->all(), [
      'student_note' => 'nullable|string',
      'file' => 'nullable|mimes:doc,docx,pdf,xls,xlsx,ppt,pptx,csv',
      'link' => 'nullable|string',
    ])->validate();

    $assignmentSubmit = AssignmentSubmit::find($assignmentSubmit_id);

    if ($request->input('student_note')) {
      $assignmentSubmit->student_note = $request->input('student_note');
    }

    if ($request->file("file")) {
      $path = "document/";
      if ($assignmentSubmit->file) {
        File::delete(public_path($path . $assignmentSubmit->file));
      }
      $fileName = time() . $request->file('file')->getClientOriginalName();
      $request->file('file')->move(public_path($path), $fileName);
      $assignmentSubmit->file = $fileName;
    }

    if ($request->input('link')) {
      $assignmentSubmit->link = $request->input('link');
    }

    $assignmentSubmit->save();
    return redirect()->back()->with('message', 'Berhasil Submit Tugas');
  }

  public function download($assignmentSubmit_id)
  {
    $file = AssignmentSubmit::find($assignmentSubmit_id);
    $myFile = public_path("document/$file->file");
    $newName = substr($file->file, 10);

    return response()->download($myFile, $newName);
  }
}
