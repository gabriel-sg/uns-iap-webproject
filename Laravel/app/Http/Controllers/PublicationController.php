<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Publication;
use App\Department;

class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $publications = Publication::get();
        echo json_encode($publications);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Dejo la validacion momentaneamente porque no se si se valida tanto en el
        // front como en el back end
        $validateData = $request->validate([
            'title' => 'required|max:140',
            'description' => 'required',
            'department' => 'required',
            'category' => 'required',
            // 'visible' => 'required' // Se puede dejar siempre en true cuando se crea
        ]);

        $publication = new Publication();

        $publication->title = $request->input('title');
        $publication->description = $request->input('description');
        $department = Department::where('name',$request->input('department'))->first();
        $publication->department_id = $department->id;
        $publication->category = $request->input('category');
        $publication->visible = true; // A criterio si dejarlo asi o que venga del front
        $publication->user_id = $request->input('user_id');
        // $publication->user_id = 1;   //Placeholder

        $publication->save();
        echo json_encode($publication);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Dejo la validacion momentaneamente porque no se si se valida tanto en el
        // front como en el back end
        $validateData = $request->validate([
            'title' => 'required|max:140',
            'description' => 'required',
            'department' => 'required',
            'category' => 'required',
            'visible' => 'required'
        ]);

        $publication = Publication::find($id);

        $publication->title = $request->input('title');
        $publication->description = $request->input('description');
        $department = Department::where('name',$request->input('department'))->first();
        $publication->department_id = $department->id;
        $publication->category = $request->input('category');
        $requestEntry->user_id = $request->input('user_id');
        // $publication->user_id = 1;   //Placeholder
        $publication->visible= $request->input('visible');

        $publication->save();
        echo json_encode($publication);
    }

    public function show($id)
    {
        $publication = Publication::where('id',$id)->get();
        echo json_encode($publication);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $publication = Publication::find($id);
        $publication->delete();
    }
}
