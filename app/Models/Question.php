<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'questions';
  protected $fillable = ['question', 'correct_answer', 'answer2', 'answer3', 'answer4', 'score'];

  public function quiz()
  {
    return $this->belongsTo(Quiz::class, 'quiz_id');
  }
  public function student_answer()
  {
    return $this->belongsTo(StudentAnswer::class, 'question_id');
  }
}
