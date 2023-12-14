<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Season;

$activeSeason = Season::where('is_active', true)->first();

class Role
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, $role): Response
  {
    $activeSeason = Season::where('is_active', true)->first();

    if ($request->user()->role !== $role) {
      if ($request->user()->role === 'admin') {
        return redirect('/admin/dashboard');
      } else if ($request->user()->role === 'teacher') {
        return redirect("/teacher/dashboard/$activeSeason->id");
      } else if ($request->user()->role === 'student') {
        return redirect("/student/dashboard/$activeSeason->id");
      }
    }

    return $next($request);
  }
}
