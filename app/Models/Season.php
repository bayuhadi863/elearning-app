<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Season extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'seasons';
  protected $fillable = ['start_year', 'end_year', 'semester', 'is_active'];
  public function class()
  {
    return $this->hasMany(ClassModel::class, 'season_id');
  }
}
