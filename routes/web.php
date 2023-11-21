<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminTeacherController;
use App\Http\Controllers\AdminStudentClassController;
use App\Http\Controllers\AdminClassController;
use App\Http\Controllers\AdminStudentController;
use App\Http\Controllers\AdminSubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherProfileController;
use App\Http\Controllers\TeacherCtsController;
use App\Http\Controllers\TeacherTeachingMaterialController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return Inertia::render('LandingPage');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';

Route::middleware(['auth', 'role:admin'])->group(function () {
  Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

  // CRUD Profil
  Route::get('/admin/profile', [AdminController::class, 'show'])->name('adminProfile.show');
  Route::get('/admin/profile/edit', [AdminController::class, 'edit'])->name('adminProfile.edit');
  Route::patch('/admin/profile', [AdminController::class, 'update'])->name('adminProfile.update');

  // CRUD Teacher
  Route::get('/admin/teacher', [AdminTeacherController::class, 'index'])->name('adminTeacher.index');
  Route::get('/admin/teacher/create', [AdminTeacherController::class, 'create'])->name('adminTeacher.create');
  Route::post('/admin/teacher', [AdminTeacherController::class, 'store'])->name('adminTeacher.store');
  Route::get('/admin/teacher/{id}', [AdminTeacherController::class, 'show'])->name('adminTeacher.show');
  Route::get('/admin/teacher/{id}/edit', [AdminTeacherController::class, 'edit'])->name('adminTeacher.edit');
  Route::patch('/admin/teacher/{id}', [AdminTeacherController::class, 'update'])->name('adminTeacher.update');
  Route::delete('/admin/teacher/{id}', [AdminTeacherController::class, 'destroy'])->name('adminTeacher.destroy');

  // CRUD Class
  Route::get('/admin/class', [AdminClassController::class, 'index'])->name('adminClass.index');
  Route::get('/admin/class/create', [AdminClassController::class, 'create'])->name('adminClass.create');
  Route::post('/admin/class', [AdminClassController::class, 'store'])->name('adminClass.store');
  Route::get('/admin/class/{id}', [AdminClassController::class, 'show'])->name('adminClass.show');
  Route::get('/admin/class/{id}/edit', [AdminClassController::class, 'edit'])->name('adminClass.edit');
  Route::patch('/admin/class/{id}', [AdminClassController::class, 'update'])->name('adminClass.update');
  Route::delete('/admin/class/{id}', [AdminClassController::class, 'destroy'])->name('adminClass.destroy');

  // CRUD Student
  Route::get('/admin/student', [AdminStudentController::class, 'index'])->name('adminStudent.index');
  Route::get('/admin/student/create', [AdminStudentController::class, 'create'])->name('adminStudent.create');
  Route::post('/admin/student', [AdminStudentController::class, 'store'])->name('adminStudent.store');
  Route::get('/admin/student/{id}', [AdminStudentController::class, 'show'])->name('adminStudent.show');
  Route::get('/admin/student/{id}/edit', [AdminStudentController::class, 'edit'])->name('adminStudent.edit');
  Route::patch('/admin/student/{id}', [AdminStudentController::class, 'update'])->name('adminStudent.update');
  Route::delete('/admin/student/{id}', [AdminStudentController::class, 'destroy'])->name('adminStudent.destroy');

  // CRUD Subject
  Route::resource('/admin/subject', AdminSubjectController::class);

  // CRUD Student Class
  Route::post('/admin/studentClass', [AdminStudentClassController::class, 'store'])->name('adminStudentClass.store');
  Route::patch('/admin/studentClass/{id}', [AdminStudentClassController::class, 'update'])->name('adminStudentClass.update');
  Route::delete('/admin/studentClass/{id}', [AdminStudentClassController::class, 'destroy'])->name('adminStudentClass.destroy');
}); // End group admin middleware

Route::middleware(['auth', 'role:teacher'])->group(function () {
  Route::get('/teacher/dashboard', [TeacherController::class, 'index'])->name('teacher.dashboard');
  Route::get('/teacher/profile', [TeacherProfileController::class, 'index'])->name('teacherProfile.index');
  Route::get('/teacher/profile/edit', [TeacherProfileController::class, 'edit'])->name('teacherProfile.edit');
  Route::patch('/teacher/profile', [TeacherProfileController::class, 'update'])->name('teacherProfile.update');

  // Teacher Class
  Route::get('/teacher/class', [TeacherCtsController::class, 'index'])->name('teacherCts.index');
  Route::get('/teacher/class/{id}', [TeacherCtsController::class, 'show'])->name('teacherCts.show');

  // Teacher Materi
  Route::get('/teacher/class/{id}/materi', [TeacherTeachingMaterialController::class, 'classIndex'])->name('teacherTeachingMaterial.classIndex');
  Route::get('/teacher/class/{id}/materi/create', [TeacherTeachingMaterialController::class, 'create'])->name('teacherTeachingMaterial.create');
  Route::post('/teacher/class/{id}/materi', [TeacherTeachingMaterialController::class, 'store'])->name('teacherTeachingMaterial.store');
}); // End group teacher middleware

Route::middleware(['auth', 'role:student'])->group(function () {
  Route::get('/dashboard', [StudentController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
}); // End group teacher middleware
