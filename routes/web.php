<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MyClassController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\GradesController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //classes
    Route::get('dashboard/classes', [MyClassController::class, 'index'])->name('dashboard.classes');
    Route::post('dashboard/classes', [MyClassController::class, 'store'])->name('classes.store');
    Route::delete('dashboard/classes/{my_class}', [MyClassController::class, 'destroy'])->name('classes.destroy');

    //students
    Route::get('dashboard/students', [UsersController::class, 'StudentsIndex'])->name('dashboard.students');
    Route::post('dashboard/students/{student}/update-classes', [MyClassController::class, 'updateStudentClasses'])->name('student.update.classes');

    //grades
    Route::get('dashboard/grades', [GradesController::class, 'index'])->name('dashboard.grades');
    Route::get('dashboard/grades/{class_code}', [GradesController::class, 'classIndex'])->name('dashboard.grades.class');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
