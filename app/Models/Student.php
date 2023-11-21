<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'students';
  protected $fillable = ['user_id', 'nisn', 'nis', 'entry_year'];
  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
  public function studentClass()
  {
    return $this->hasMany(SubjectClass::class, 'student_id');
  }
}
