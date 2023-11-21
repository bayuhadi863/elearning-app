<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class StudentSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('students')->insert([
      [
        'user_id' => 2,
        'nisn' => '0038132617',
        'nis' => 14390,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 26,
        'nisn' => '0038132618',
        'nis' => 14391,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 27,
        'nisn' => '0038132619',
        'nis' => 14392,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 28,
        'nisn' => '0038132620',
        'nis' => 14393,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 29,
        'nisn' => '0038132621',
        'nis' => 14394,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 30,
        'nisn' => '0038132622',
        'nis' => 14395,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 31,
        'nisn' => '0038132623',
        'nis' => 14396,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 32,
        'nisn' => '0038132624',
        'nis' => 14397,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 33,
        'nisn' => '0038132625',
        'nis' => 14398,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 34,
        'nisn' => '0038132626',
        'nis' => 14399,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 35,
        'nisn' => '0038132627',
        'nis' => 14380,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 36,
        'nisn' => '0038132628',
        'nis' => 14381,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 37,
        'nisn' => '0038132629',
        'nis' => 14382,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 38,
        'nisn' => '0038132630',
        'nis' => 14383,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 39,
        'nisn' => '0038132631',
        'nis' => 14384,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 40,
        'nisn' => '0038132632',
        'nis' => 14385,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 41,
        'nisn' => '0038132633',
        'nis' => 14386,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 42,
        'nisn' => '0038132634',
        'nis' => 14387,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 43,
        'nisn' => '0038132635',
        'nis' => 14388,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 44,
        'nisn' => '0038132636',
        'nis' => 14389,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 45,
        'nisn' => '0038132637',
        'nis' => 14370,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 46,
        'nisn' => '0038132638',
        'nis' => 14371,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 47,
        'nisn' => '0038132639',
        'nis' => 14372,
        'entry_year' => 2021,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
