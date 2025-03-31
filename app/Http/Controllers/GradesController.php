<?php

namespace App\Http\Controllers;

use App\Models\grades;
use Illuminate\Http\Request;
use App\Models\my_class;
use Inertia\Inertia;
use App\Models\User;

class GradesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = my_class::orderBy('year')->get()->groupBy('year');
        return Inertia::render('grades/Classes', ["classes" => $classes]);
    }

    public function classIndex($class_code)
    {
        $class = my_class::where("code", $class_code)->with('students')->first();

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        dd($class->students);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(grades $grades)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(grades $grades)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, grades $grades)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(grades $grades)
    {
        //
    }
}
