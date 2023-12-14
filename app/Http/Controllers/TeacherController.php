<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Season;
use App\Models\ClassTeacherSubjects;
use App\Models\TeachingMaterial;
use App\Models\Assignment;
use App\Models\Quiz;

class TeacherController extends Controller
{
  public function index(Request $request, $season_id)
  {
    $user = $request->user();
    $thisSeason = Season::find($season_id);
    $seasons = Season::whereHas('class.cts.teacher.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->get();

    $cts = ClassTeacherSubjects::with('class')
      ->whereHas('teacher.user', function ($query) use ($user) {
        $query->where('id', $user->id);
      })
      ->whereHas('class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $teachingMaterials = TeachingMaterial::whereHas('cts.teacher.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $assignments = Assignment::whereHas('cts.teacher.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();

    $quizzes = Quiz::whereHas('cts.teacher.user', function ($query) use ($user) {
      $query->where('id', $user->id);
    })
      ->whereHas('cts.class.season', function ($query) use ($season_id) {
        $query->where('id', $season_id);
      })
      ->get();


    return Inertia::render('Teacher/TeacherDashboard', [
      'thisSeason' => $thisSeason,
      'seasons' => $seasons,
      'cts' => $cts,
      'teachingMaterials' => $teachingMaterials,
      'assignments' => $assignments,
      'quizzes' => $quizzes,
    ]);
  }
}
