<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\my_class;
use Inertia\Inertia;


class UsersController extends Controller
{
    public function StudentsIndex()
    {
        $students = User::where('role', 3)->with('classes')->get(); // eager load the 'classes' relationship
        $classes = my_class::all();

        return Inertia::render('students/Students', [
            "students" => $students,
            "classes" => $classes
        ]);
    }
}
