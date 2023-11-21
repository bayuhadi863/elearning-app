<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'teachers';
  protected $fillable = ['nip', 'user_id'];
  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
  public function kelas()
  {
    return $this->hasMany(ClassModel::class, 'class_teacher_id');
  }
  public function cts()
  {
    return $this->hasMany(ClassTeacherSubjects::class, 'teacher_id');
  }
}
