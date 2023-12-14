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
        'user_id' => 5,
        'nisn' => '0038132617',
        'nis' => 14390,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 6,
        'nisn' => '0038132618',
        'nis' => 14391,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 7,
        'nisn' => '0038132619',
        'nis' => 14392,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
