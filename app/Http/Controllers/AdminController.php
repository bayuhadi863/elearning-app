<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Subject;
use App\Models\ClassModel;
use App\Models\Teacher;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
  public function index()
  {
    $teachers = Teacher::with('user')->get();
    $students = Student::with('user')->get();
    $subjects = Subject::all();
    $classes = ClassModel::all();

    return Inertia::render('Admin/AdminDashboard', [
      'teachers' => $teachers,
      'students' => $students,
      'subjects' => $subjects,
      'classes' => $classes,
    ]);
  }
  public function show()
  {
    return Inertia::render('Admin/AdminProfile');
  }
  public function edit()
  {
    return Inertia::render('Admin/AdminProfileEdit');
  }
  public function update(Request $request)
  {
    $user = $request->user();

    Validator::make($request->all(), [
      'name' => 'nullable|regex:/^[A-Za-z ,.]+$/|max:255',
      'email' => [
        'nullable',
        'email',
        Rule::unique('users', 'email')->ignore($user->id), // Pastikan email adalah unik, mengabaikan saat memeriksa data saat ini
      ],
      'phone' => 'nullable|regex:/^\d{1,13}$/',
      'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ])->validate();


    if ($request->file("profile_picture")) {
      $path = "profile_picture/";
      $oldProfilePicture = $user->profile_picture;
      if ($oldProfilePicture) {
        File::delete(public_path($path . $oldProfilePicture));
      }
      $imageName = time() . '.' . $request->file('profile_picture')->getClientOriginalExtension();
      $request->file('profile_picture')->move(public_path($path), $imageName);
      $user->profile_picture = $imageName;
    }
    if ($request->input('name') != '' && $request->input('name') != $user->name) {
      $user->name = $request->input('name');
    }
    if ($request->input('email') != '' && $request->input('email') != $user->email) {
      $user->email = $request->input('email');
    }
    if ($request->input('phone') != '' && $request->input('phone') != $user->phone) {
      $user->phone = $request->input('phone');
    }
    $user->save();

    return redirect()->back()->with('message', 'Profil berhasil diupdate');
  }
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
}
