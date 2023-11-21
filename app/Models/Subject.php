<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'subjects';
  protected $fillable = ['name'];

  public function cts()
  {
    return $this->hasMany(ClassTeacherSubjects::class, 'subject_id');
  }
}
