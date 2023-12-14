<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quiz extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'quizzes';
  protected $fillable = ['title', 'deadline', 'number_of_question', 'is_started'];

  public function cts()
  {
    return $this->belongsTo(ClassTeacherSubjects::class, 'class_teacher_subject_id');
  }
  public function question()
  {
    return $this->hasMany(Question::class, 'quiz_id');
  }
  public function student_answer()
  {
    return $this->hasMany(StudentAnswer::class, 'quiz_id');
  }
}
