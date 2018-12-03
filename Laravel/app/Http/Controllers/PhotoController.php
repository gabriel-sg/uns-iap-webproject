<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Photo;
use App\Publication;
use Illuminate\Support\Facades\Storage;


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

    public function image(Request $request)
    {
        /*$this->validate($request, [
            'publi_id' => 'required',
            'filename' => 'required',
            'filename.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);*/

        //$data=$request->filename;
        
        for($i=0; ;$i++)
        {
                if($request->hasFile('file'.$i))
                {
                    $file= $request->file('file'.$i);
                    $path=$file->store('images','public');
                    $photo = new Photo();
                    $photo->filename=$path;
                    $photo->publi_id=$request->publi_id;
                    $photo->save();
                    $urls[]='intuni.test'.Storage::url($path);
                }
                else break;
        }

        echo json_encode($urls);
    }

    public function getPhotos($id_user)
    {
        $photo = Photo::where('id_user',$id_user)->get();
        echo json_encode($photo);
    }

    public function removePhoto($id)
    {
        $photo = Photo::find($id);
        if(Storage::disk('public')->exists($photo->filename))
            Storage::disk('public')->delete($photo->filename);
        $photo->delete();
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
