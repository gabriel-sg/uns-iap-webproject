<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestModel;

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
        $RequestEntries = RequestModel::get();
        echo json_encode($RequestEntries);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        
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
          //'department_id' => 'required',
          'category' => 'required'
      ]);

      $requestEntry = new RequestModel();

      $requestEntry->title = $request->input('title');
      $requestEntry->description = $request->input('description');
      //$requestEntry->department_id = $request->input('department_id');
      $requestEntry->department_id = 1;  //Placeholder
      $requestEntry->category = $request->input('category');
      //$requestEntry->user_id = $request->input('user_id');
      $requestEntry->user_id = 1;   //Placeholder

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
        //
        return 'Hola desde el PUT de solicitudes';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return 'Hola desde el DELETE de solicitudes';
    }
}
