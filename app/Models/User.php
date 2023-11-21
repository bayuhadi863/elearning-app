<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;
  protected $table = 'users';
  protected $fillable = [
    'name',
    'email',
    'password',
    'role',
    'phone',
    'profile_picture',
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
  ];

  public function teacher()
  {
    return $this->hasOne(Teacher::class, 'user_id');
  }

  public function student()
  {
    return $this->hasOne(Student::class, 'user_id');
  }
}
