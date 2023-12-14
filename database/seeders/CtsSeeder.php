<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CtsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('class_teacher_subjects')->insert([
      [
        'teacher_id' => 1,
        'subject_id' => 1,
        'class_id' => 12,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'teacher_id' => 2,
        'subject_id' => 2,
        'class_id' => 12,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'teacher_id' => 3,
        'subject_id' => 3,
        'class_id' => 12,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      // [
      //   'teacher_id' => 3,
      //   'subject_id' => 3,
      //   'class_id' => 2,
      //   'created_at' => Carbon::now(),
      //   'updated_at' => Carbon::now(),
      // ],
      // [
      //   'teacher_id' => 4,
      //   'subject_id' => 4,
      //   'class_id' => 2,
      //   'created_at' => Carbon::now(),
      //   'updated_at' => Carbon::now(),
      // ],
      // [
      //   'teacher_id' => 5,
      //   'subject_id' => 5,
      //   'class_id' => 2,
      //   'created_at' => Carbon::now(),
      //   'updated_at' => Carbon::now(),
      // ],
    ]);
  }
}
