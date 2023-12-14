<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TeachingMaterial;
use App\Models\ClassTeacherSubjects;
use App\Models\Season;
use Inertia\Inertia;

class StudentTeachingMaterialController extends Controller
{
  public function index(Request $request, $season_id)
  {
    $user = $request->user();
    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season')
      ->whereHas('class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $materi = TeachingMaterial::with('cts.class.student_class.student.user')
      ->whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->latest()->get();

    return Inertia::render('Student/StudentTeachingMaterial', [
      'materi' => $materi,
      'ctsAll' => $ctsAll,
    ]);
  }

  public function ctsIndex(Request $request, $cts_id)
  {
    $user = $request->user();
    $thisSeason = Season::where('is_active', true)->first();
    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season')
      ->whereHas('class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($thisSeason) {
        $query->where('id', $thisSeason->id);
      })
      ->get();

    $ctsItem = ClassTeacherSubjects::with('subject', 'teaching_material', 'class')->find($cts_id);
    $materi = TeachingMaterial::where('class_teacher_subject_id', $cts_id)->latest()->get();;

    return Inertia::render('Student/StudentStm', [
      'ctsAll' => $ctsAll,
      'materi' => $materi,
      'ctsItem' => $ctsItem,
    ]);
  }

  public function show($materi_id)
  {
    $materi = TeachingMaterial::with('cts.teacher.user', 'cts.subject')->find($materi_id);

    // dd($materi);

    if ($materi->type === 'video') {
      return Inertia::render('Student/StudentStmVideoShow', [
        'materi' => $materi,
      ]);
    } else {
      return Inertia::render('Student/StudentStmDocumentShow', [
        'materi' => $materi,
      ]);
    }
  }

  public function download($materi_id)
  {
    $file = TeachingMaterial::find($materi_id);
    $myFile = public_path("document/$file->document_file");
    $newName = substr($file->document_file, 10);

    return response()->download($myFile, $newName);
  }
}
