<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassModel extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'class';
  protected $fillable = ['name', 'grade', 'season_id', 'class_teacher_id'];
  public function teacher()
  {
    return $this->belongsTo(Teacher::class, 'class_teacher_id');
  }
  public function season()
  {
    return $this->belongsTo(Season::class, 'season_id');
  }
  public function cts()
  {
    return $this->hasMany(ClassTeacherSubjects::class, 'class_id');
  }
  public function student_class()
  {
    return $this->hasMany(StudentClass::class, 'class_id');
  }
}
