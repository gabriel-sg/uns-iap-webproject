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
        /*
        $this->validate($request, [
            'filename' => 'required',
            'filename.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);*/

        //$data=$request->filename;
        
        if($request->hasFile('filename'))
        {/*
            foreach($request->file('filename') as $image)
            {
                $name=$image->getClientOriginalName();
                $image->store('images','local');  
                $data[] = $name;
            }*/
            $file= $request->filename;
            $path= $file->store('images','public');
        }
        $photo = new Photo();
        $photo->filename=$path;//json_encode($data);
        $photo->publi_id=2;

        $photo->save();

        //return json_encode($photo);
        echo json_encode('intuni.test/'.(Storage::url($path)));
    }
}
