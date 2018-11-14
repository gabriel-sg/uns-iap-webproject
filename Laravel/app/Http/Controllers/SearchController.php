<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestModel;

class SearchController extends Controller
{
    public function index($search)
    {
        //$requests = RequestModel::search()->orderBy('created_at')->paginate(15);   //Tiene que coincidir con el type de la form
        $requests = RequestModel::where('title','like','%'.$search.'%')->get();
            //->orderBy('created_at')->get();
            //->paginate(15);
        json_encode($requests);
    }
}
