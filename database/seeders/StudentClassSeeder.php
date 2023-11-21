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
        'student_id' => 16,
        'class_id' => 5,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'student_id' => 17,
        'class_id' => 5,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'student_id' => 18,
        'class_id' => 5,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ]
    ]);
  }
}
