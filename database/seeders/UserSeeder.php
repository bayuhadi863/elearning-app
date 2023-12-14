<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('users')->insert([
      [
        'name' => 'Bayu Hadi Leksana',
        'email' => 'bayuhadi863@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'admin',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'M. Ainur Ramadhan, S.Pd.',
        'email' => 'ainur@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'teacher',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Yudhistira Surya, M.Pd.',
        'email' => 'yudhis@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'teacher',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Argya Dwi Ferdinand',
        'email' => 'argya@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'teacher',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Irfan Maulana',
        'email' => 'irfan@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Kevin Dio Athilla',
        'email' => 'kevin@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Alhamdana Fariz',
        'email' => 'alham@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
