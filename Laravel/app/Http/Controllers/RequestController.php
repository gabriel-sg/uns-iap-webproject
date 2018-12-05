<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestModel;
use App\Department;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $requestEntries = RequestModel::orderBy('created_at','desc')->get();
        echo json_encode($requestEntries);
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
          'department_id' => 'required',
          'category' => 'required'
      ]);

      $requestEntry = new RequestModel();

      $requestEntry->title = $request->input('title');
      $requestEntry->description = $request->input('description');
      // $department = Department::where('name',$request->input('department'))->first();
      // $requestEntry->department_id = $department->id;
      $requestEntry->department_id = $request->input('department_id');
      $requestEntry->category = $request->input('category');
      $requestEntry->user_id = $request->input('user_id');
      // $requestEntry->user_id = 1;   //Placeholder

      $requestEntry->save();
      echo json_encode($requestEntry);

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
            'department_id' => 'required',
            'category' => 'required'
        ]);

        $requestEntry = RequestModel::find($id);

        $requestEntry->title = $request->input('title');
        $requestEntry->description = $request->input('description');
        // $department = Department::where('name',$request->input('department'))->first();
        // $requestEntry->department_id = $department->id;
        $requestEntry->department_id = $request->input('department_id');
        $requestEntry->category = $request->input('category');
        $requestEntry->user_id = $request->input('user_id');
        // $requestEntry->user_id = 1;   //Placeholder

        $requestEntry->save();
        echo json_encode($requestEntry);
    }

    public function show($id)
    {
        $requestEntry = RequestModel::where('id',$id)->get();
        echo json_encode($requestEntry);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $requestEntry = RequestModel::find($id);
        $requestEntry->delete();
    }
}
