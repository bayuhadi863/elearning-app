<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'students';
  protected $fillable = ['user_id', 'nisn', 'nis'];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function student_class()
  {
    return $this->hasMany(StudentClass::class, 'student_id');
  }

  public function assignment_submit()
  {
    return $this->hasMany(AssignmentSubmit::class, 'student_id');
  }
}
