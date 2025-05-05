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


        return Inertia::render('grades/Class', ["students" => $class->students, "classCode" => $class_code]);
    }

    public function studentIndex($class_code, $studentId)
    {
        // Find the class
        $class = my_class::where('code', $class_code)->firstOrFail();

        // Find the student
        $student = User::where('id', $studentId)
            ->where('role', 3) // Role 3 is for students
            ->firstOrFail();

        // You might want to load grades data for this student
        // For example:
        $grades = grades::with(['by', 'class'])
            ->where('student_id', $studentId)
            ->where('my_class_id', $class->id)
            ->get();


        return Inertia::render('grades/Student', [
            'student' => $student,
            'myclass' => $class,
            'grades' => $grades,
        ]);
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
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'my_class_id' => 'required|exists:my_classes,id',
            'termGrade' => 'nullable|integer|min:0|max:20',
            'examGrade' => 'nullable|integer|min:0|max:20',
        ]);

        $byId = auth()->id();

        //dd($request->student_id);
        // Save term grade if not empty
        if (!is_null($request->termGrade)) {
            grades::create([
                'grade' => $request->termGrade,
                'type' => 'td',
                'student_id' => $request->student_id,
                'by_id' => $byId,
                'my_class_id' => $request->my_class_id,
            ]);
        }

        // Save exam grade if not empty
        if (!is_null($request->examGrade)) {
            grades::create([
                'grade' => $request->examGrade,
                'type' => 'exam',
                'student_id' => $request->student_id,
                'by_id' => $byId,
                'my_class_id' => $request->my_class_id,
            ]);
        }

        return back()->with('success', 'Grades saved successfully.');
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
