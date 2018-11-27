<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Photo;

class TestController extends Controller
{
    //
    public function image(Request $request)
    {
        $this->validate($request, [
            'filename' => 'required',
            'filename.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        
        if($request->hasFile('filename'))
        {
            foreach($request->file('filename') as $image)
            {
                $name=$image->getClientOriginalName();
                $image->store('images','local');  
                $data[] = $name;
            }
        }
        $photo = new Photo();
        $photo->filename=json_encode($data);
        $photo->publi_id=1;

        $photo->save();

        return json_encode($photo);

    }
}
