<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\StudentClass;
use App\Models\Season;
use App\Models\ClassModel;
use App\Models\ClassTeacherSubjects;
use App\Models\Subject;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Student;
use App\Http\Requests\AdminTeacherRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class AdminClassController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $kelas = ClassModel::with('teacher.user', 'season')->get();
    return Inertia::render('Admin/AdminClass', [
      'kelas' => $kelas,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $teachers = Teacher::with('user')->whereDoesntHave('class', function ($query) {
      $query->whereHas('season', function ($seasonQuery) {
        $seasonQuery->where('is_active', true);
      });
    })
      ->get();
    $seasons = Season::all();

    return Inertia::render('Admin/AdminClassCreate', [
      'teachers' => $teachers,
      'seasons' => $seasons,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    Validator::make($request->all(), [
      'name' => 'required',
      'grade' => 'required',
      'season_id' => 'required',
      'class_teacher_id' => 'required',
    ])->validate();

    ClassModel::create([
      'name' => $request->input('name'),
      'grade' => $request->input('grade'),
      'season_id' => $request->input('season_id'),
      'class_teacher_id' => $request->input('class_teacher_id'),
    ]);

    return redirect()->back()->with('message', 'Data berhasil dibuat');
  }

  /**
   * Display the specified resource.
   */
  public function show($id)
  {
    $kelas = ClassModel::with('teacher.user', 'season')->find($id);
    $students = StudentClass::with('student.user')->where('class_id', $id)->get();
    $cts = ClassTeacherSubjects::where('class_id', $id)->with('subject', 'teacher.user')->get();

    return Inertia::render('Admin/AdminClassShow', [
      'kelas' => $kelas,
      'students' => $students,
      'cts' => $cts
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($id)
  {
    $kelas = ClassModel::with('teacher.user', 'season')->find($id);
    $thisClass = ClassModel::find($id);

    $teachers = Teacher::with('user')->whereDoesntHave('class', function ($query) use ($thisClass) {
      $query->where('season_id', $thisClass->season_id);
    })
      ->get();

    $students = Student::with('user')
      ->whereDoesntHave('student_class', function ($query) use ($thisClass) {
        $query->whereHas('class', function ($seasonQuery) use ($thisClass) {
          $seasonQuery->where('season_id', $thisClass->season_id);
        });
      })
      ->get();
    $seasons = Season::all();
    $allTeachers = Teacher::with('user')->whereDoesntHave('cts', function ($query) use ($id) {
      $query->where('class_id', $id);
    })
      ->get();

    $allSubjects = Subject::whereDoesntHave('cts', function ($query) use ($id) {
      $query->where('class_id', $id);
    })
      ->get();;

    return Inertia::render('Admin/AdminClassEdit', [
      'kelas' => $kelas,
      'teachers' => $teachers,
      'students' => $students,
      'allTeachers' => $allTeachers,
      'allSubjects' => $allSubjects,
      'seasons' => $seasons
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, $id)
  {

    $kelas = ClassModel::find($id);

    Validator::make($request->all(), [
      'name' => 'nullable',
      'grade' => 'nullable',
      'student_entry_year' => 'nullable',
      'class_teacher_id' => 'nullable',
    ])->validate();
    // Memeriksa apakah ada perubahan dalam input
    if ($request->input('name')) {
      $kelas->name = $request->input('name');
    }
    if ($request->input('grade')) {
      $kelas->grade = $request->input('grade');
    }
    if ($request->input('season_id')) {
      $kelas->season_id = $request->input('season_id');
    }
    if ($request->input('class_teacher_id')) {
      $kelas->class_teacher_id = $request->input('class_teacher_id');
    }
    // Hanya menyimpan jika ada perubahan
    $kelas->save();

    return redirect()->back()->with('message', 'Data berhasil diupdate');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id): RedirectResponse
  {
    $kelas = ClassModel::find($id);
    $cts = ClassTeacherSubjects::where('class_id', $id);
    $studentClass = StudentClass::where('class_id', $id);

    if ($cts) {
      $cts->delete();
    }

    if ($studentClass) {
      $studentClass->delete();
    }

    $kelas->delete();
    return Redirect::to('/admin/class');
  }
}
