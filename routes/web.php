<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminTeacherController;
use App\Http\Controllers\AdminStudentClassController;
use App\Http\Controllers\AdminSeasonController;
use App\Http\Controllers\AdminClassController;
use App\Http\Controllers\AdminStudentController;
use App\Http\Controllers\AdminSubjectController;
use App\Http\Controllers\AdminCtsController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\TeacherProfileController;
use App\Http\Controllers\TeacherCtsController;
use App\Http\Controllers\TeacherTeachingMaterialController;
use App\Http\Controllers\TeacherAssignmentController;
use App\Http\Controllers\TeacherAssignmentSubmitController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentCtsController;
use App\Http\Controllers\StudentTeachingMaterialController;
use App\Http\Controllers\StudentAssignmentController;
use App\Http\Controllers\StudentAssignmentSubmitController;
use App\Http\Controllers\StudentReportController;

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

  // CRUD Season
  Route::get('/admin/season', [AdminSeasonController::class, 'index'])->name('adminSeason.index');
  Route::get('/admin/season/create', [AdminSeasonController::class, 'create'])->name('adminSeason.create');
  Route::post('/admin/season', [AdminSeasonController::class, 'store'])->name('adminSeason.store');
  // Route::get('/admin/class/{id}', [AdminSeasonController::class, 'show'])->name('adminSeason.show');
  // Route::get('/admin/class/{id}/edit', [AdminSeasonController::class, 'edit'])->name('adminSeason.edit');
  // Route::patch('/admin/class/{id}', [AdminSeasonController::class, 'update'])->name('adminSeason.update');
  // Route::delete('/admin/class/{id}', [AdminSeasonController::class, 'destroy'])->name('adminSeason.destroy');

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

  // CRUD Cts
  Route::post('/admin/classTeacherSubject', [AdminCtsController::class, 'store'])->name('adminCts.store');
  Route::patch('/admin/studentClass/{id}', [AdminCtsController::class, 'update'])->name('adminCts.update');
}); // END GROUP ADMIN MIDDLEWARE

Route::middleware(['auth', 'role:teacher'])->group(function () {
  Route::get('/teacher/dashboard/{season_id}', [TeacherController::class, 'index'])->where('season_id', '[0-9]+')->name('teacher.dashboard');
  Route::get('/teacher/profile', [TeacherProfileController::class, 'index'])->name('teacherProfile.index');
  Route::get('/teacher/profile/edit', [TeacherProfileController::class, 'edit'])->name('teacherProfile.edit');
  Route::patch('/teacher/profile', [TeacherProfileController::class, 'update'])->name('teacherProfile.update');

  // Teacher Class
  Route::get('/teacher/{season_id}/class', [TeacherCtsController::class, 'index'])->where('season_id', '[0-9]+')->name('teacherCts.index');
  Route::get('/teacher/class/{cts_id}', [TeacherCtsController::class, 'show'])->where('cts_id', '[0-9]+')->name('teacherCts.show');

  // Teacher Materi
  Route::get('/teacher/{season_id}/materi', [TeacherTeachingMaterialController::class, 'index'])->where('season_id', '[0-9]+')->name('teacherTeachingMaterial.index');
  Route::get('/teacher/materi/class/{cts_id}', [TeacherTeachingMaterialController::class, 'classIndex'])->where('cts_id', '[0-9]+')->name('teacherTeachingMaterial.classIndex');
  Route::get('/teacher/materi/class/{cts_id}/create', [TeacherTeachingMaterialController::class, 'create'])->where('cts_id', '[0-9]+')->name('teacherTeachingMaterial.create');
  Route::post('/teacher/materi/class/{cts_id}', [TeacherTeachingMaterialController::class, 'store'])->where('cts_id', '[0-9]+')->name('teacherTeachingMaterial.store');
  Route::get('/teacher/materi/{materi_id}/download', [TeacherTeachingMaterialController::class, 'download'])->where('materi_id', '[0-9]+')->name('teacherTeachingMaterial.download');
  Route::get('/teacher/materi/{materi_id}', [TeacherTeachingMaterialController::class, 'show'])->where('materi_id', '[0-9]+')->name('teacherTeachingMaterial.show');
  Route::get('/teacher/materi/{materi_id}/edit', [TeacherTeachingMaterialController::class, 'edit'])->where('materi_id', '[0-9]+')->name('teacherTeachingMaterial.edit');
  Route::patch('/teacher/materi/{materi_id}', [TeacherTeachingMaterialController::class, 'update'])->where('materi_id', '[0-9]+')->name('teacherTeachingMaterial.update');
  Route::delete('/teacher/materi/{materi_id}', [TeacherTeachingMaterialController::class, 'destroy'])->where('materi_id', '[0-9]+')->name('teacherTeachingMaterial.destroy');

  // Teacher Assignment
  Route::get('/teacher/{season_id}/assignment', [TeacherAssignmentController::class, 'index'])->where('season_id', '[0-9]+')->name('teacherAssignment.index');
  Route::get('/teacher/assignment/class/{cts_id}', [TeacherAssignmentController::class, 'classIndex'])->where('cts_id', '[0-9]+')->name('teacherAssignment.classIndex');
  Route::get('/teacher/assignment/class/{cts_id}/create', [TeacherAssignmentController::class, 'create'])->where('cts_id', '[0-9]+')->name('teacherAssignment.create');
  Route::post('/teacher/assignment/class/{cts_id}', [TeacherAssignmentController::class, 'store'])->where('cts_id', '[0-9]+')->name('teacherAssignment.store');
  Route::get('/teacher/assignment/{assignment_id}/download', [TeacherAssignmentController::class, 'download'])->where('assignment_id', '[0-9]+')->name('teacherAssignment.download');
  Route::get('/teacher/assignment/{assignment_id}', [TeacherAssignmentController::class, 'show'])->where('assignment_id', '[0-9]+')->name('teacherAssignment.show');
  Route::delete('/teacher/assignment/{assignment_id}', [TeacherAssignmentController::class, 'destroy'])->where('assignment_id', '[0-9]+')->name('teacherAssignment.destroy');

  // Teacher Assignment Submit
  Route::get('/teacher/assignmentSubmit/{assignmentSubmit_id}/download', [TeacherAssignmentSubmitController::class, 'download'])->where('assignmentSubmit_id', '[0-9]+')->name('TeacherAssignmentSubmit.download');
  Route::get('/teacher/assignmentSubmit/{assignmentSubmit_id}', [TeacherAssignmentSubmitController::class, 'show'])->where('assignmentSubmit_id', '[0-9]+')->name('teacherAssignmentSubmit.show');
  Route::patch('/teacher/assignmentSubmit/{assignmentSubmit_id}', [TeacherAssignmentSubmitController::class, 'update'])->where('assignmentSubmit_id', '[0-9]+')->name('teacherAssignmentSubmit.update');

  // Teacher Quiz
  Route::get('/teacher/{season_id}/quiz', [QuizController::class, 'index'])->where('season_id', '[0-9]+')->name('teacherQuiz.index');
  Route::get('/teacher/quiz/class/{cts_id}', [QuizController::class, 'classIndex'])->where('cts_id', '[0-9]+')->name('teacherQuiz.classIndex');
  Route::get('/teacher/quiz/class/{cts_id}/create', [QuizController::class, 'create'])->where('cts_id', '[0-9]+')->name('teacherQuiz.create');
  Route::post('/teacher/quiz/class/{cts_id}', [QuizController::class, 'store'])->where('cts_id', '[0-9]+')->name('teacherQuiz.store');
  Route::patch('/teacher/quiz/{quiz_id}', [QuizController::class, 'start'])->where('quiz_id', '[0-9]+')->name('teacherQuiz.start');
  Route::delete('/teacher/quiz/{quiz_id}', [QuizController::class, 'destroy'])->where('quiz_id', '[0-9]+')->name('teacherQuiz.delete');

  // Teacher Question
  Route::get('/teacher/quiz/{quiz_id}/question/create', [QuestionController::class, 'create'])->where('quiz_id', '[0-9]+')->name('teacherQuizQuestion.create');
  Route::post('/teacher/quiz/{quiz_id}/question', [QuestionController::class, 'store'])->where('quiz_id', '[0-9]+')->name('teacherQuizQuestion.store');
}); // End group teacher middleware

Route::middleware(['auth', 'role:student'])->group(function () {
  Route::get('/student/dashboard/{season_id}', [StudentController::class, 'index'])->where('season_id', '[0-9]+')->name('student.dashboard');
  Route::get('/student/profile', [StudentProfileController::class, 'index'])->name('studentProfile.show');
  Route::get('/student/profile/edit', [StudentProfileController::class, 'edit'])->name('studentProfile.edit');
  Route::patch('/student/profile', [StudentProfileController::class, 'update'])->name('studentProfile.update');

  // Student Subjects
  Route::get('/student/{season_id}/subject', [StudentCtsController::class, 'index'])->where('season_id', '[0-9]+')->name('studentCts.index');
  Route::get('/student/subject/{cts_id}', [StudentCtsController::class, 'show'])->where('cts_id', '[0-9]+')->name('studentCts.show');

  // Student Materi
  Route::get('/student/{season_id}/materi', [StudentTeachingMaterialController::class, 'index'])->where('season_id', '[0-9]+')->name('studentTeachingMaterial.index');
  Route::get('/student/materi/subject/{cts_id}', [StudentTeachingMaterialController::class, 'ctsIndex'])->where('cts_id', '[0-9]+')->name('StudentTeachingMaterial.ctsIndex');
  Route::get('/student/materi/{materi_id}', [StudentTeachingMaterialController::class, 'show'])->where('materi_id', '[0-9]+')->name('StudentTeachingMaterial.show');
  Route::get('/student/materi/{materi_id}/download', [StudentTeachingMaterialController::class, 'download'])->where('materi_id', '[0-9]+')->name('StudentTeachingMaterial.download');

  // Student Assignment
  Route::get('/student/{season_id}/assignment', [StudentAssignmentController::class, 'index'])->where('season_id', '[0-9]+')->name('studentAssignment.index');
  Route::get('/student/assignment/subject/{cts_id}', [StudentAssignmentController::class, 'ctsIndex'])->where('cts_id', '[0-9]+')->name('StudentAssignment.ctsIndex');
  Route::get('/student/assignment/{assignment_id}', [StudentAssignmentController::class, 'show'])->where('assignment_id', '[0-9]+')->name('StudentAssignment.show');
  Route::get('/student/assignment/{assignment_id}/download', [StudentAssignmentController::class, 'download'])->where('assignment_id', '[0-9]+')->name('StudentAssignment.download');

  Route::get('/student/{season_id}/quiz', [QuizController::class, 'studentIndex'])->where('season_id', '[0-9]+')->name('studentQuiz.index');
  Route::get('/student/quiz/subject/{cts_id}', [QuizController::class, 'studentCtsIndex'])->where('cts_id', '[0-9]+')->name('StudentQuiz.ctsIndex');
  Route::get('/student/quiz/{quiz_id}/answer/create', [QuizController::class, 'answerCreate'])->where('quiz_id', '[0-9]+')->name('StudentQuiz.answerCreate');
  Route::post('/student/quiz/{quiz_id}/answer', [QuizController::class, 'answerStore'])->where('quiz_id', '[0-9]+')->name('StudentQuiz.answerStore');


  Route::get('/student/assignmentSubmit/{assignmentSubmit_id}/download', [StudentAssignmentSubmitController::class, 'download'])->where('assignmentSubmit_id', '[0-9]+')->name('StudentAssignmentSubmit.download');
  Route::patch('/student/assignmentSubmit/{assignmentSubmit_id}', [StudentAssignmentSubmitController::class, 'update'])->where('assignmentSubmit_id', '[0-9]+')->name('StudentAssignmentSubmit.create');

  Route::get('/student/{season_id}/report', [StudentReportController::class, 'index'])->where('season_id', '[0-9]+')->name('studentReport.index');
  Route::get('/student/report/subject/{cts_id}', [StudentReportController::class, 'ctsIndex'])->where('cts_id', '[0-9]+')->name('studentReport.ctsIndex');
}); // End group teacher middleware
