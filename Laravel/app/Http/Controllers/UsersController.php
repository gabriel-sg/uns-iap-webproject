<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get();
        echo json_encode($users);
    }

    public function show($id)
    {
        $user = User::where('id',$id)->get();
        echo json_encode($user);
    }
}
