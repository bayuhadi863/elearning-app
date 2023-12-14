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
        'season_id' => 1,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XI',
        'season_id' => 1,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XII',
        'season_id' => 1,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'X',
        'season_id' => 2,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XI',
        'season_id' => 2,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XII',
        'season_id' => 2,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'X',
        'season_id' => 3,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XI',
        'season_id' => 3,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XII',
        'season_id' => 3,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'X',
        'season_id' => 4,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XI',
        'season_id' => 4,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'A',
        'grade' => 'XII',
        'season_id' => 4,
        'class_teacher_id' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
