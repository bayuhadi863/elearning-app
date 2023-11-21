<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeachingMaterial extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'teaching_materials';
  protected $fillable = ['title', 'class_teacher_subject_id', 'type', 'document_file', 'video_link'];
  public function cts()
  {
    return $this->belongsTo(ClassTeacherSubjects::class, 'class_teacher_subject_id');
  }
}
