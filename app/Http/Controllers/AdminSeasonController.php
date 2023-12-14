<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Season;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminSeasonController extends Controller
{
  public function index()
  {
    $seasons = Season::all();
    return Inertia::render('Admin/AdminSeason', [
      'seasons' => $seasons,
    ]);
  }

  public function create()
  {
    return Inertia::render('Admin/AdminSeasonCreate');
  }

  public function store(Request $request)
  {
    Validator::make($request->all(), [
      'start_year' => 'required',
      'end_year' => 'required',
      'semester' => 'required',
    ])->validate();

    $allSeasons = Season::all();
    foreach ($allSeasons as $season) {
      $season->update(['is_active' => false]);
    }
    Season::create([
      'start_year' => $request->input('start_year'),
      'end_year' => $request->input('end_year'),
      'semester' => $request->input('semester'),
      'is_active' => true,
    ]);

    return redirect()->back()->with('message', 'Data berhasil dibuat');
  }
}
