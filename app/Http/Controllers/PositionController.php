<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Positions/Index', [
            'positions' => Position::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Positions/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        Position::create($request->validate([
            'position_name' => 'required',
        ]));


        return to_route('positions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $position = Position::find($id);
        return Inertia::render('Positions/Edit/Index', ['position' => $position]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $position = Position::find($id);
        $position->position_name = $request->position_name;

        $position->save();

        return to_route('positions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $position = Position::find($id);

        $position->delete();
    }
}
