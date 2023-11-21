<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassTeacherSubjects extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'class_teacher_subjects';
  protected $fillable = ['teacher_id', 'subject_id', 'class_id', 'semester'];
  public function teacher()
  {
    return $this->belongsTo(Teacher::class, 'teacher_id');
  }
  public function subject()
  {
    return $this->belongsTo(Subject::class, 'subject_id');
  }
  public function class()
  {
    return $this->belongsTo(ClassModel::class, 'class_id');
  }
  public function teaching_material()
  {
    return $this->hasMany(TeachingMaterial::class, 'class_teacher_subject_id');
  }
}
