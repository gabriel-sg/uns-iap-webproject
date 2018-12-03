<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Photo;

class TestController extends Controller
{
    //
    public function image(Request $request)
    {
        for($i=0; ;$i++)
        {
                if($request->hasFile('file'.$i))
                {
                    $file= $request->file('file'.$i);
                    $path[]='intuni.test'.Storage::url($file->store('images','public'));
                    //$path[]=$file->store('images','public');
                }
                else break;
        }
        /*$this->validate($request, [
            'publi_id' => 'required',
            'filename' => 'required',
            'filename.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);*/

        //$data=$request->filename;
        
        //if($request->hasFile('file0'))
        //{
            /*
            foreach($request->file('filename') as $image)
            {
                $name=$image->getClientOriginalName();
                $image->store('images','local');  
                $data[] = $name;
            }*/
            
            //$file= $request->input('file0');
            //$path= $file->store('images','public');
        //}
        /*
        $photo = new Photo();
        $photo->filename=$path;//json_encode($data);
        $photo->publi_id=$request->publi_id;

        $photo->save();
        */

        //return json_encode($photo);
        //echo json_encode('intuni.test'.(Storage::url($path)));
        echo json_encode($path);
    }

    public function getPhotos($id)
    {
        $photo = Photo::where('id',$id)->get();
        echo json_encode($photo);
    }

    public function show($id)
    {
        $photo = Photo::where('id',$id)->get();
        echo json_encode($photo);
    }

}
