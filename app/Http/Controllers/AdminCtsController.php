<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ClassTeacherSubjects;

class AdminCtsController extends Controller
{
  public function store(Request $request)
  {
    Validator::make($request->all(), [
      'subject_id' => 'required', // Validasi agar 'student_id' merupakan array dengan panjang antara 1 dan 10
      'teacher_id' => 'required',
      'class_id' => 'required',
    ])->validate();
    ClassTeacherSubjects::create([
      'subject_id' => $request->input('subject_id'),
      'teacher_id' => $request->input('teacher_id'),
      'class_id' => $request->input('class_id'),
    ]);


    return redirect()->back()->with('message', 'Data berhasil dibuat');
  }
}
