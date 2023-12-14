<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssignmentSubmit extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'assignment_submits';
  protected $fillable = ['student_id', 'assignment_id', 'student_note', 'file', 'link', 'score', 'teacher_note'];

  public function student()
  {
    return $this->belongsTo(Student::class, 'student_id');
  }

  public function assignment()
  {
    return $this->belongsTo(Assignment::class, 'assignment_id');
  }
}
