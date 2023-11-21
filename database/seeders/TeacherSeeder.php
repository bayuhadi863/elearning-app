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
        'user_id' => 3,
        'nip' => '1992051420230520011',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 4,
        'nip' => '1992051420230520012',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 5,
        'nip' => '199205142023052013',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 6,
        'nip' => '1992051420230520014',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 7,
        'nip' => '199205142023052015',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 8,
        'nip' => '199205142023052016',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 9,
        'nip' => '199205142023052017',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 10,
        'nip' => '199205142023052018',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 11,
        'nip' => '199205142023052019',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 12,
        'nip' => '199205142023052020',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 13,
        'nip' => '199205142023052021',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 14,
        'nip' => '199205142023052022',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 15,
        'nip' => '199205142023052023',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 16,
        'nip' => '199205142023052024',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 17,
        'nip' => '199205142023052025',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 18,
        'nip' => '199205142023052026',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 19,
        'nip' => '199205142023052027',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 20,
        'nip' => '199205142023052028',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 21,
        'nip' => '199205142023052029',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'user_id' => 22,
        'nip' => '199205142023052022',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
