<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ClassSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('class')->insert([
      [
        'name' => 'A',
        'grade' => 'X',
        'student_entry_year' => 2023,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'B',
        'grade' => 'X',
        'student_entry_year' => 2023,
        'class_teacher_id' => 2,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'C',
        'grade' => 'X',
        'student_entry_year' => 2023,
        'class_teacher_id' => 3,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'D',
        'grade' => 'X',
        'student_entry_year' => 2023,
        'class_teacher_id' => 4,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'E',
        'grade' => 'X',
        'student_entry_year' => 2023,
        'class_teacher_id' => 5,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XI',
        'student_entry_year' => 2022,
        'class_teacher_id' => 6,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'B',
        'grade' => 'XI',
        'student_entry_year' => 2022,
        'class_teacher_id' => 7,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'C',
        'grade' => 'XI',
        'student_entry_year' => 2022,
        'class_teacher_id' => 8,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'D',
        'grade' => 'XI',
        'student_entry_year' => 2022,
        'class_teacher_id' => 10,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'E',
        'grade' => 'XI',
        'student_entry_year' => 2022,
        'class_teacher_id' => 11,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XII',
        'student_entry_year' => 2021,
        'class_teacher_id' => 12,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'B',
        'grade' => 'XII',
        'student_entry_year' => 2021,
        'class_teacher_id' => 13,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'C',
        'grade' => 'XII',
        'student_entry_year' => 2021,
        'class_teacher_id' => 14,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'D',
        'grade' => 'XII',
        'student_entry_year' => 2021,
        'class_teacher_id' => 15,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'E',
        'grade' => 'XII',
        'student_entry_year' => 2021,
        'class_teacher_id' => 16,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
