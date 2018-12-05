<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestModel;
use App\Publication;

class SearchController extends Controller
{
    public function searchRequests(Request $request,$search)
    {
        $requests = RequestModel::search($search)
            ->orderBy('created_at','desc')
            ->paginate(10);
        echo json_encode($requests);
    }

    public function  searchPublications(Request $request,$search)
    {
        $requests = Publication::search($search)
            ->orderBy('created_at','desc')
            ->paginate(10);
        echo json_encode($requests);
    }
}
