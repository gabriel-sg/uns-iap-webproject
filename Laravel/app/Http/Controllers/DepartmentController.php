<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departments = Department::get();
        echo json_encode($departments);
    }

    public function show($id)
    {
        $department = Department::where('id',$id)->get();
        echo json_encode($department);
    }

    public function store(Request $request){
      echo json_encode($request->input('email'));
      // echo json_encode($request->input('token'));
    }
}
