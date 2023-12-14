<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class StudentClassSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('student_class')->insert([
      [
        'class_id' => 1,
        'student_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 1,
        'student_id' => 2,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 1,
        'student_id' => 3,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 4,
        'student_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 4,
        'student_id' => 2,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 4,
        'student_id' => 3,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 8,
        'student_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 8,
        'student_id' => 2,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 8,
        'student_id' => 3,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 11,
        'student_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 11,
        'student_id' => 2,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'class_id' => 11,
        'student_id' => 3,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
