<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Season;
use App\Models\TeachingMaterial;
use App\Models\Assignment;
use App\Models\Quiz;
use App\Models\ClassTeacherSubjects;

class StudentController extends Controller
{
  public function index(Request $request, $season_id)
  {
    $user = $request->user();
    $thisSeason = Season::find($season_id);
    $seasons = Season::whereHas('class.student_class.student.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->get();

    $cts = ClassTeacherSubjects::with('subject')
      ->whereHas('class.student_class.student.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $teachingMaterials = TeachingMaterial::whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $assignments = Assignment::whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $quizzes = Quiz::whereHas('cts.class.student_class.student.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();


    return Inertia::render('Student/StudentDashboard', [
      'thisSeason' => $thisSeason,
      'seasons' => $seasons,
      'cts' => $cts,
      'teachingMaterials' => $teachingMaterials,
      'assignments' => $assignments,
      'quizzes' => $quizzes,
    ]);
  }
}
