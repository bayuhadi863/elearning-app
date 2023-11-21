<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassModel extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'class';
  protected $fillable = ['name', 'grade', 'student_entry_year', 'class_teacher_id'];
  public function teacher()
  {
    return $this->belongsTo(Teacher::class, 'class_teacher_id');
  }
  public function studentClass()
  {
    return $this->hasMany(StudentClass::class, 'class_id');
  }
  public function cts()
  {
    return $this->hasMany(ClassTeacherSubjects::class, 'class_id');
  }
}
