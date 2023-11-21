<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentClass extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'student_class';
  protected $fillable = ['student_id', 'class_id'];
  public function student()
  {
    return $this->belongsTo(Student::class, 'student_id');
  }
  public function class()
  {
    return $this->belongsTo(ClassModel::class, 'class_id');
  }
}
