<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assignment extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'assignments';
  protected $fillable = ['title', 'description', 'class_teacher_subject_id', 'file', 'deadline'];

  public function cts()
  {
    return $this->belongsTo(ClassTeacherSubjects::class, 'class_teacher_subject_id');
  }

  public function assignment_submit()
  {
    return $this->hasMany(AssignmentSubmit::class, 'assignment_id');
  }
}
