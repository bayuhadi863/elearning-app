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
        'name' => 'Dio Hari Syahputra',
        'email' => 'dio@gmail.com',
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
      [
        'name' => 'Kevin Dio Athila',
        'email' => 'kevin@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Syahdiladarama Hidayatullah',
        'email' => 'syahdila@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Rio Andy',
        'email' => 'rio@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Pujo Satriya Ananta',
        'email' => 'pujo@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Khavid Saputra',
        'email' => 'khavid@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Naufal Fathan',
        'email' => 'nauval@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Baskara Adi',
        'email' => 'baskara@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Radja Danendra',
        'email' => 'radja@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Moch. Avin',
        'email' => 'avin@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Pauline Syaira',
        'email' => 'pauline@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Nisa Abiba',
        'email' => 'nisa@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Dienda Aulia',
        'email' => 'dienda@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Luluk Atus Zahro',
        'email' => 'luluk@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Wiwin Romadhani',
        'email' => 'wiwin@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Afri Aditya Achmad',
        'email' => 'afri@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Moch. Agusta Kaifa Hartono',
        'email' => 'ayek@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Riandita Lareka',
        'email' => 'riandita@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Nabila Nuryani',
        'email' => 'nabila@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Farhan Setiawan',
        'email' => 'farhan@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Fenty Nurviana',
        'email' => 'fenty@gmail.com',
        'password' => Hash::make('RHSmau123'),
        'role' => 'student',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
