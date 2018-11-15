<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestModel;

class SearchController extends Controller
{
    public function index(Request $request,$search)
    {
        //$requests = RequestModel::search()->orderBy('created_at')->paginate(15);   //Tiene que coincidir con el type de la form
        //$search = $request->get('searchRequests');//searchRequests

        $requests = RequestModel::search($search)
            ->orderBy('created_at','desc')//->get();
            ->paginate(15);
        echo json_encode($requests);

        /*
        $requests = RequestModel::where('title','like','%'.$search.'%')
            ->orWhere('description','like','%'.$search.'%')
            ->orderBy('created_at','desc')//->get();
            ->paginate(15);
        echo json_encode($requests);
        */

    }
}
