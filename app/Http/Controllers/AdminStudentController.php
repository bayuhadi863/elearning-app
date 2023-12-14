<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class AdminStudentController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $students = User::where('role', 'student')->with('student')->get();
    return Inertia::render('Admin/AdminStudent', ['students' => $students]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Admin/AdminStudentCreate');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    Validator::make($request->all(), [
      'name' => 'required|regex:/^[A-Za-z ]+$/|max:255',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:8|string',
      'phone' => 'nullable|regex:/^\d{1,15}$/',
      'nisn' => [
        'required',
        'regex:/^\d{10}$/',
        Rule::unique('students', 'nisn'),
      ],
      'nis' => [
        'required',
        'numeric',
        Rule::unique('students', 'nis'),
      ]
    ])->validate();
    // Simpan data pengguna
    $user = User::create([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
      'phone' => $request->input('phone'),
    ]);
    // Dapatkan ID pengguna yang baru saja dibuat
    $userId = $user->id;
    // Simpan data ke dalam tabel student
    Student::create([
      'user_id' => $userId,
      'nisn' => $request->input('nisn'),
      'nis' => $request->input('nis'),
    ]);

    return redirect()->back()->with('message', 'Data berhasil dibuat');
  }

  /**
   * Display the specified resource.
   */
  public function show($id)
  {
    $user = User::with('student')->find($id);

    return Inertia::render('Admin/AdminStudentShow', [
      'user' => $user,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($id)
  {
    $user = User::with('student')->find($id);
    $student = $user->student;

    return Inertia::render('Admin/AdminStudentEdit', [
      'user' => $user,
      'student' => $student
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, $id)
  {

    $user = User::find($id);
    $student = $user->student;

    Validator::make($request->all(), [
      'name' => 'nullable|regex:/^[A-Za-z ,.]+$/|max:255',
      'email' =>  [
        'nullable',
        'email',
        Rule::unique('users', 'email')->ignore($user->id), // Pastikan email adalah unik, mengabaikan saat memeriksa data saat ini
      ],
      // 'password' => 'nullable|min:8|string',
      'phone' => 'nullable|regex:/^\d{1,15}$/',
      'nisn' => [
        'nullable',
        'regex:/^\d{10}$/',
        Rule::unique('students', 'nisn')->ignore($student->id),
      ],
      'nis' => [
        'nullable',
        'numeric',
        Rule::unique('students', 'nis')->ignore($student->id),
      ],
    ])->validate();
    // Memeriksa apakah ada perubahan dalam input
    if ($request->input('name') != '' && $request->input('name') != $user->name) {
      $user->name = $request->input('name');
    }
    if ($request->input('email') != '' && $request->input('email') != $user->email) {
      $user->email = $request->input('email');
    }
    if ($request->input('phone') != '' && $request->input('phone') != $user->phone) {
      $user->phone = $request->input('phone');
    }
    if ($request->input('nisn') != '' && $request->input('nisn') != $student->nisn) {
      $student->nisn = $request->input('nisn');
    }
    if ($request->input('nis') != '' && $request->input('nis') != $student->nis) {
      $student->nis = $request->input('nis');
    }

    // Hanya menyimpan jika ada perubahan
    $user->save();
    $student->save();

    return redirect()->back()->with('message', 'Data berhasil diupdate');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id): RedirectResponse
  {
    $user = User::find($id);
    $student = $user->student;
    $realStudent = Student::find($student->id);
    $realStudent->delete();
    $user->delete();

    return Redirect::to('/admin/student');
  }
}
