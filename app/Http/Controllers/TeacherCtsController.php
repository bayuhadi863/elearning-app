<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassTeacherSubjects;
use App\Models\ClassModel;

class TeacherCtsController extends Controller
{
  public function index(Request $request, $season_id)
  {
    $user = $request->user();

    $kelas = ClassTeacherSubjects::with('teacher.user', 'subject', 'class.student_class.student.user', 'class.season')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    return Inertia::render('Teacher/TeacherCts', [
      'kelas' => $kelas
    ]);
  }

  public function show($cts_id)
  {
    $kelas = ClassTeacherSubjects::with('teacher.user', 'subject', 'class.student_class.student.user', 'teaching_material', 'assignment')->find($cts_id);
    $teacherClass = ClassModel::with('teacher.user')->find($kelas->class->id);
    $materi = $kelas->teaching_material()
      ->orderBy('updated_at', 'desc')
      ->limit(1)
      ->get();

    $assignments = $kelas->assignment()
      ->orderBy('updated_at', 'desc')
      ->limit(1)
      ->get();
    // dd($assignments);

    return Inertia::render('Teacher/TeacherCtsShow', [
      'kelas' => $kelas,
      'teacherClass' => $teacherClass,
      'assignments' => $assignments,
      'materi' => $materi
    ]);
  }
}
