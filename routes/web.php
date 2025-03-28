<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MyClassController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('dashboard/classes', [MyClassController::class, 'index'])->name('dashboard.classes');
    Route::post('dashboard/classes', [MyClassController::class, 'store'])->name('classes.store');
    Route::delete('dashboard/classes/{my_class}', [MyClassController::class, 'destroy'])->name('classes.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
