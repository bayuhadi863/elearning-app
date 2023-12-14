<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SeasonSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('seasons')->insert([
      [
        'start_year' => 2021,
        'end_year' => 2022,
        'semester' => 'ganjil',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'start_year' => 2021,
        'end_year' => 2022,
        'semester' => 'genap',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'start_year' => 2022,
        'end_year' => 2023,
        'semester' => 'ganjil',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'start_year' => 2022,
        'end_year' => 2023,
        'semester' => 'genap',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
