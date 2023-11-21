<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\StudentClass;

class AdminStudentClassController extends Controller
{
  public function store(Request $request)
  {
    Validator::make($request->all(), [
      'student_id' => 'required', // Validasi agar 'student_id' merupakan array dengan panjang antara 1 dan 10
      'class_id' => 'required',
    ])->validate();
    StudentClass::create([
      'student_id' => $request->input('student_id'),
      'class_id' => $request->input('class_id'),
    ]);


    return redirect()->back()->with('message', 'Data berhasil dibuat');
  }
}
