<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Photo;
use App\Publication;


class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $photos = Photo::get();
        echo json_encode($photos);
    }

    public function getPhotos($id_user)
    {
        $photo = Photo::where('id_user',$id_user)->get();
        echo json_encode($photo);
    }

    public function getPhotoByUser($id_user,$id )
    {
        $photo = Photo::where
        ('publi_id',$id)
        ->andWhere('id', $id)
        ->get();
        echo json_encode($photo);


    }

    public function getPhotoByUser2($id_user,$id )
    {
        $photo = DB::table('dfsdfsf')->
        join('usuario', 'publications.id', '=', 'photos.publi_id')
        ->select('publications.id', 'publications.user_id', 'photos.filename')
        ->get();

    }





}
