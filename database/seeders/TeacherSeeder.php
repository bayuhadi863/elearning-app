<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TeacherSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('teachers')->insert([
      [
        'user_id' => 2,
        'nip' => '199205142023052011',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 3,
        'nip' => '199205142023052012',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 4,
        'nip' => '199205142023052013',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
