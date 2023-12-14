<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassTeacherSubjects;
use App\Models\Assignment;
use App\Models\AssignmentSubmit;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class TeacherAssignmentController extends Controller
{
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

    $thisSeasonAssignments = Assignment::with('cts.class.student_class.student.user', 'assignment_submit.student.user')
      ->whereHas('cts.teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->latest()->get();

    // dd($thisSeasonAssignments);
    // dd($ctsAll);

    return Inertia::render('Teacher/TeacherAssignment', [
      'thisSeasonAssignments' => $thisSeasonAssignments,
      'ctsAll' => $ctsAll,
    ]);
  }

  public function classIndex(Request $request, $cts_id)
  {
    $user = $request->user();
    $kelas = ClassTeacherSubjects::with('class.season', 'assignment')->find($cts_id);
    $assignments = Assignment::with('cts.class.season')->where('class_teacher_subject_id', $cts_id)->latest()->get();

    $selectedSeason = $kelas->class->season;

    // dd($selectedSeason);

    $ctsAll = ClassTeacherSubjects::with('subject', 'class.student_class.student.user', 'teacher.user', 'teaching_material', 'class.season', 'assignment')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($selectedSeason) {
        $query->where('id', $selectedSeason->id);
      })
      ->get();

    return Inertia::render('Teacher/TeacherCta', [
      'kelas' => $kelas,
      'assignments' => $assignments,
      'ctsAll' => $ctsAll
    ]);
  }

  public function create($cts_id)
  {
    $kelas = ClassTeacherSubjects::with('class')->find($cts_id);
    return Inertia::render('Teacher/TeacherAssignmentCreate', [
      'kelas' => $kelas
    ]);
  }

  public function store(Request $request, $cts_id)
  {
    Validator::make($request->all(), [
      'title' => 'required|string|max:255',
      'description' => 'nullable|string',
      'file' => 'nullable|mimes:doc,docx,pdf,xls,xlsx,ppt,pptx,csv',
      'deadline' => 'required',
    ])->validate();

    $assignment = new Assignment();
    $assignment->title = $request->input('title');
    $assignment->class_teacher_subject_id = $cts_id;
    if ($request->input('description')) {
      $assignment->description = $request->input('description');
    }

    if ($request->file("file")) {
      $path = "document/";
      $fileName = time() . $request->file('file')->getClientOriginalName();
      $request->file('file')->move(public_path($path), $fileName);
      $assignment->file = $fileName;
    }

    $assignment->deadline = $request->input('deadline');

    $assignment->save();

    $students = Student::whereHas('student_class.class.cts', function ($query) use ($assignment) {
      // Filter siswa berdasarkan cts_id assignment
      $query->where('id', $assignment->class_teacher_subject_id);
    })->get();

    foreach ($students as $student) {
      AssignmentSubmit::create([
        'student_id' => $student->id,
        'assignment_id' => $assignment->id
      ]);
    }

    return redirect()->back()->with('message', 'Berhasil Upload Tugas');
  }

  public function download($assignment_id)
  {
    $file = Assignment::find($assignment_id);
    $myFile = public_path("document/$file->file");
    $newName = substr($file->file, 10);

    return response()->download($myFile, $newName);
  }

  public function show($assignment_id)
  {
    $assignment = Assignment::with('cts.subject', 'cts.class.student_class.student.user')->find($assignment_id);

    // Ambil data assignment_submit untuk assignment tersebut
    $assignment_submits = AssignmentSubmit::with('student.user')->where('assignment_id', $assignment_id)->get();

    return Inertia::render('Teacher/TeacherAssignmentShow', [
      'assignment' => $assignment,
      'assignment_submits' => $assignment_submits,
    ]);
  }

  public function destroy($assignment_id)
  {
    $assignment = Assignment::find($assignment_id);

    $path = "document/";

    // Hapus assignment submits terlebih dahulu
    $assignmentSubmits = $assignment->assignment_submit;
    if ($assignmentSubmits) {
      foreach ($assignmentSubmits as $submit) {
        if ($submit->file) {
          File::delete(public_path($path . $submit->file));
        }
        $submit->delete();
      }
    }

    // Hapus assignment
    if ($assignment->file) {
      File::delete(public_path($path . $assignment->file));
    }
    $assignment->delete();

    return redirect()->back()->with('message', 'Berhasil menghapus tugas');
  }
}
