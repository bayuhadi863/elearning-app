<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Subject;
use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class AdminSubjectController extends Controller
{
  public function index()
  {
    $subjects = Subject::all();
    return Inertia::render('Admin/AdminSubject', ['subjects' => $subjects]);
  }
  public function create()
  {
    return Inertia::render('Admin/AdminSubjectCreate');
  }
  public function store(Request $request)
  {
    Validator::make($request->all(), [
      'name' => 'required|string|max:255',
    ])->validate();

    Subject::create([
      'name' => $request->input('name'),
    ]);

    return redirect()->back()->with('message', 'Data berhasil dibuat');
  }
  public function show($id)
  {
    $subject = Subject::find($id);
    return Inertia::render('Admin/AdminSubjectShow', ['subject' => $subject]);
  }
}
