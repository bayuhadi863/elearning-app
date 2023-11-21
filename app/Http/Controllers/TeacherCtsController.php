<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassTeacherSubjects;
use App\Models\ClassModel;

class TeacherCtsController extends Controller
{
  public function index(Request $request)
  {
    $user = $request->user();
    $kelas = ClassTeacherSubjects::with('teacher.user', 'subject', 'class.studentClass')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->get();
    return Inertia::render('Teacher/TeacherCts', [
      'kelas' => $kelas
    ]);
  }

  public function show($id)
  {
    $kelas = ClassTeacherSubjects::with('teacher.user', 'subject', 'class.studentClass.student.user',)->find($id);
    $teacherClass = ClassModel::with('teacher.user')->find($kelas->class->id);

    return Inertia::render('Teacher/TeacherCtsShow', [
      'kelas' => $kelas,
      'teacherClass' => $teacherClass
    ]);
  }
}
