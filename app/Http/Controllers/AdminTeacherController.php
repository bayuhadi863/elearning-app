<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Http\Requests\AdminTeacherRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class AdminTeacherController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $teachers = User::where('role', 'teacher')->with('teacher')->get();
    return Inertia::render('Admin/AdminTeacher', ['teachers' => $teachers]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Admin/AdminTeacherCreate');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(AdminTeacherRequest $request)
  {
    $validated = $request->validated();
    // Simpan data pengguna
    $user = User::create([
      'name' => $validated['name'],
      'email' => $validated['email'],
      'password' => Hash::make($validated['password']),
      'role' => 'teacher',
      'phone' => $validated['phone'],
    ]);
    // Dapatkan ID pengguna yang baru saja dibuat
    $userId = $user->id;
    // Simpan data ke dalam tabel teachers
    Teacher::create([
      'nip' => $validated['nip'],
      'user_id' => $userId,
    ]);

    return redirect()->back()->with('message', 'Data berhasil dibuat');
  }

  /**
   * Display the specified resource.
   */
  public function show($id)
  {
    $user = User::find($id);
    $nip = $user->teacher->nip;

    return Inertia::render('Admin/AdminTeacherShow', [
      'user' => $user,
      'nip' => $nip
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($id)
  {
    $user = User::find($id);
    $nip = $user->teacher->nip;

    return Inertia::render('Admin/AdminTeacherEdit', [
      'user' => $user,
      'nip' => $nip
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, $id)
  {

    $user = User::find($id);
    $teacher = $user->teacher;

    Validator::make($request->all(), [
      'name' => 'nullable|regex:/^[A-Za-z ,.]+$/|max:255',
      'email' => [
        'nullable',
        'email',
        Rule::unique('users', 'email')->ignore($user->id), // Pastikan email adalah unik, mengabaikan saat memeriksa data saat ini
      ],
      'password' => 'nullable|min:8|string',
      'phone' => 'nullable|regex:/^\d{1,15}$/',
      'nip' => [
        'nullable',
        'regex:/^\d{18}$/',
        Rule::unique('teachers', 'nip')->ignore($teacher->id),
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
    if ($request->input('nip') != '' && $request->input('nip') != $teacher->nip) {
      $teacher->nip = $request->input('nip');
    }
    // Hanya menyimpan jika ada perubahan
    $user->save();
    $teacher->save();

    return redirect()->back()->with('message', 'Data berhasil diupdate');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id): RedirectResponse
  {
    $user = User::find($id);
    $teacher = $user->teacher;
    $realTeacher = Teacher::find($teacher->id);
    $realTeacher->delete();
    $user->delete();

    return Redirect::to('/admin/teacher');
  }
}
