<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Student;
use App\Models\ClassTeacherSubjects;
use App\Models\ClassModel;
use App\Models\TeachingMaterial;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class TeacherTeachingMaterialController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Teacher/TeacherTeachingMaterial');
  }
  /**
   * Menampilkan materi dari kelas tertentu.
   */
  public function classIndex($id)
  {
    $kelas = ClassTeacherSubjects::with('class', 'teaching_material')->find($id);
    $materi = $kelas->teaching_material;

    return Inertia::render('Teacher/TeacherCtm', [
      'kelas' => $kelas,
      'materi' => $materi
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create($id)
  {
    $kelas = ClassTeacherSubjects::with('class')->find($id);
    return Inertia::render('Teacher/TeacherTeachingMaterialCreate', [
      'kelas' => $kelas
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request, $id)
  {
    Validator::make($request->all(), [
      'title' => 'required|string|max:255',
      'type' => 'required|in:document,video',
      'document_file' => 'nullable|mimes:doc,docx,pdf,xls,xlsx,ppt,pptx,csv',
      'video_link' => 'nullable|string',
    ])->validate();

    $teachingMaterial = new TeachingMaterial;
    $teachingMaterial->title = $request->input('title');
    $teachingMaterial->class_teacher_subject_id = $id;
    $teachingMaterial->type = $request->input('type');

    if ($request->input('type') === 'document') {
      $path = "document/";
      // $fileName = time() . '.' . $request->file('document_file')->getClientOriginalExtension();
      $fileName = time() . $request->file('document_file')->getClientOriginalName();
      $request->file('document_file')->move(public_path($path), $fileName);
      $teachingMaterial->document_file = $fileName;
    }

    if ($request->input('type') === 'video') {
      $teachingMaterial->video_link = $request->input('video_link');
    }

    $teachingMaterial->save();

    return redirect()->route('teacherTeachingMaterial.classIndex', ['id' => $id]);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
