<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@gmail.com'], 
            [
                'name' => 'Main Admin',
                'phone' => '+919876543210',
                'password' => Hash::make('Admin@123'),
                'role' => 'admin',
            ]
        );
    }
}
