<?php

namespace App\Http\Controllers;

use App\Models\my_class;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class MyClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = User::where('role', 2)->get();
        return Inertia::render('classes/Classes', ["teachers" => $teachers]);
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:my_classes,code',
            'year' => 'required|integer',
            'spec' => 'required|string|max:255',
            'teacherId' => 'required|exists:users,id',
        ]);

        $my_class = my_class::create([
            'name' => $validated['name'],
            'code' => $validated['code'],
            'year' => $validated['year'],
            'spec' => $validated['spec'],
            'teacher_id' => $validated['teacherId'],
        ]);

        return redirect()->back()->with('success', 'Class added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(my_class $my_class)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(my_class $my_class)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, my_class $my_class)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(my_class $my_class)
    {
        //
    }
}
