<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@g.com',
            'role' => 1, // Admin
            'password' => Hash::make('123456'),
        ]);

        User::create([
            'name' => 'Teacher',
            'email' => 'teacher@g.com',
            'role' => 2, // Teacher
            'password' => Hash::make('123456'),
        ]);

        User::create([
            'name' => 'Teacher2',
            'email' => 'teacher2@g.com',
            'role' => 2, // Teacher
            'password' => Hash::make('123456'),
        ]);

        User::create([
            'name' => 'Student',
            'email' => 'student@g.com',
            'role' => 3, // Student
            'password' => Hash::make('123456'),
        ]);
        User::create([
            'name' => 'Student3',
            'email' => 'student3@g.com',
            'role' => 3, // Student
            'password' => Hash::make('123456'),
        ]);
        User::create([
            'name' => 'Student2',
            'email' => 'student2@g.com',
            'role' => 3, // Student
            'password' => Hash::make('123456'),
        ]);
    }
}
