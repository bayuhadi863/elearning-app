<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Student;
use App\Models\ClassTeacherSubjects;
use App\Models\ClassModel;
use App\Models\TeachingMaterial;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

use Illuminate\Http\Request;

class TeacherTeachingMaterialController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request, $season_id)
  {
    $user = $request->user();
    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season', 'assignment')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $materi = TeachingMaterial::with('cts.class.student_class.student.user')
      ->whereHas('cts.teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->latest()->get();

    // dd($thisSeasonAssignments);
    // dd($ctsAll);

    return Inertia::render('Teacher/TeacherTeachingMaterial', [
      'materi' => $materi,
      'ctsAll' => $ctsAll,
    ]);
  }
  /**
   * Menampilkan materi dari kelas tertentu.
   */
  public function classIndex(Request $request, $cts_id)
  {
    $user = $request->user();
    $kelas = ClassTeacherSubjects::with('class.season', 'teaching_material')->find($cts_id);
    $materi = TeachingMaterial::where('class_teacher_subject_id', $cts_id)->latest()->get();

    $selectedSeason = $kelas->class->season;

    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season', 'assignment')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($selectedSeason) {
        $query->where('id', $selectedSeason->id);
      })
      ->get();

    return Inertia::render('Teacher/TeacherCtm', [
      'kelas' => $kelas,
      'materi' => $materi,
      'ctsAll' => $ctsAll
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create($cts_id)
  {
    $kelas = ClassTeacherSubjects::with('class')->find($cts_id);
    return Inertia::render('Teacher/TeacherTeachingMaterialCreate', [
      'kelas' => $kelas
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request, $cts_id)
  {
    Validator::make($request->all(), [
      'title' => 'required|string|max:255',
      'type' => 'required|in:document,video',
      'document_file' => 'nullable|mimes:doc,docx,pdf,xls,xlsx,ppt,pptx,csv',
      'video_link' => 'nullable|string',
    ])->validate();

    $teachingMaterial = new TeachingMaterial;
    $teachingMaterial->title = $request->input('title');
    $teachingMaterial->class_teacher_subject_id = $cts_id;
    $teachingMaterial->type = $request->input('type');

    if ($request->input('type') === 'document') {
      $path = "document/";
      $fileName = time() . $request->file('document_file')->getClientOriginalName();
      $request->file('document_file')->move(public_path($path), $fileName);
      $teachingMaterial->document_file = $fileName;
    }

    if ($request->input('type') === 'video') {
      $teachingMaterial->video_link = $request->input('video_link');
    }

    $teachingMaterial->save();
    return redirect()->back()->with('message', 'Berhasil Upload Materi');
  }

  /**
   * Show the form for creating a new resource.
   */
  public function download($materi_id)
  {
    $file = TeachingMaterial::find($materi_id);
    $myFile = public_path("document/$file->document_file");
    $newName = substr($file->document_file, 10);

    return response()->download($myFile, $newName);
  }

  /**
   * Display the specified resource.
   */
  public function show($materi_id)
  {
    $materi = TeachingMaterial::with('cts.teacher.user', 'cts.subject')->find($materi_id);

    // dd($materi);

    if ($materi->type === 'video') {
      return Inertia::render('Teacher/TeacherCtmVideoShow', [
        'materi' => $materi,
      ]);
    } else {
      return Inertia::render('Teacher/TeacherCtmDocumentShow', [
        'materi' => $materi,
      ]);
    }
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($id)
  {
    $materi = TeachingMaterial::with('cts.subject')->find($id);
    $kelas = ClassTeacherSubjects::with('class')->where('id', $materi->cts->id)->first();
    // dd($kelas);

    $fileLink = $materi->document_file ? url("document/$materi->document_file") : '';

    return Inertia::render('Teacher/TeacherTeachingMaterialEdit', [
      'materi' => $materi,
      'kelas' => $kelas,
      'fileLink' => $fileLink
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, $id)
  {
    Validator::make($request->all(), [
      'title' => 'required|string|max:255',
      'type' => 'required|in:document,video',
      'document_file' => 'nullable|mimes:doc,docx,pdf,xls,xlsx,ppt,pptx,csv',
      'video_link' => 'nullable|string',
    ])->validate();

    $teachingMaterial = TeachingMaterial::find($id);
    $teachingMaterial->title = $request->input('title');
    $teachingMaterial->type = $request->input('type');

    if ($request->input('type') === 'document') {
      $teachingMaterial->video_link = null;

      if ($request->file('document_file')) {
        $path = "document/";
        if ($teachingMaterial->document_file) {
          File::delete(public_path($path . $teachingMaterial->document_file));
        }
        $fileName = time() . $request->file('document_file')->getClientOriginalName();
        $request->file('document_file')->move(public_path($path), $fileName);
        $teachingMaterial->document_file = $fileName;
      }
    }

    if ($request->input('type') === 'video') {
      $path = "document/";
      if ($teachingMaterial->document_file) {
        File::delete(public_path($path . $teachingMaterial->document_file));
        $teachingMaterial->document_file = null;
      }

      if ($request->input('video_link') && $request->input('video_link') !==  $teachingMaterial->video_link) {
        $teachingMaterial->video_link = $request->input('video_link');
      }
    }

    $teachingMaterial->save();
    return redirect()->back()->with('message', 'Berhasil Update Materi');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id)
  {
    $teachingMaterial = TeachingMaterial::find($id);
    $path = "document/";

    if ($teachingMaterial->document_file) {
      File::delete(public_path(($path . $teachingMaterial->document_file)));
    }

    $teachingMaterial->delete();
    return redirect()->back()->with('message', 'Berhasil menghapus tugas');
  }
}
