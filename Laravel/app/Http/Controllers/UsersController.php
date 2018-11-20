<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\RequestModel;
use App\Publication;

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

    public function getPublications($id)
    {
        $publications = Publication::where('user_id',$id)->get();
        echo json_encode($publications);
    }

    public function getRequests($id)
    {
        $requests = RequestModel::where('user_id',$id)->get();
        echo json_encode($requests);
    }
}
