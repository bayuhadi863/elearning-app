<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


class TeacherProfileController extends Controller
{
  public function index(Request $request): Response
  {
    $user = $request->user();
    $teacher = $user->teacher;

    return Inertia::render('Teacher/TeacherProfile', [
      'nip' => $teacher->nip,
    ]);
  }
  public function edit()
  {
    return Inertia::render('Teacher/TeacherProfileEdit');
  }

  public function update(Request $request)
  {
    $user = $request->user();

    Validator::make($request->all(), [
      'phone' => 'nullable|regex:/^\d{1,15}$/',
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

    if ($request->input('phone') != '') {
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
