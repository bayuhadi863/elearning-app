<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentAnswer extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'student_answers';
  protected $fillable = ['answer', 'score', 'question_id', 'quiz_id'];

  public function question()
  {
    return $this->belongsTo(Question::class, 'question_id');
  }
  public function quiz()
  {
    return $this->belongsTo(Quiz::class, 'quiz_id');
  }
}
