<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Publication;
use App\Department;
use App\Photo;
use Illuminate\Support\Facades\Storage;

class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $publications = Publication::orderBy('created_at','desc')->paginate(10);
        echo json_encode($publications);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Dejo la validacion momentaneamente porque no se si se valida tanto en el
        // front como en el back end
        $validateData = $request->validate([
            'title' => 'required|max:140',
            'description' => 'required',
            'department_id' => 'required',
            'category' => 'required',
            // 'visible' => 'required' // Se puede dejar siempre en true cuando se crea
        ]);

        $publication = new Publication();

        $publication->title = $request->input('title');
        $publication->description = $request->input('description');
        // $department = Department::where('name',$request->input('department'))->first();
        // $publication->department_id = $department->id;
        $publication->department_id = $request->input('department_id');
        $publication->category = $request->input('category');
        $publication->visible = true; // A criterio si dejarlo asi o que venga del front
        $publication->user_id = $request->input('user_id');
        // $publication->user_id = 1;   //Placeholder

        $publication->save();
        echo json_encode($publication);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Dejo la validacion momentaneamente porque no se si se valida tanto en el
        // front como en el back end
        $validateData = $request->validate([
            'title' => 'required|max:140',
            'description' => 'required',
            'department_id' => 'required',
            'category' => 'required',
            'user_id' => 'required',
            'visible' => 'required'
        ]);

        $publication = Publication::find($id);

        if($publication){
          $publication->title = $request->input('title');
          $publication->description = $request->input('description');
          // $department = Department::where('name',$request->input('department'))->first();
          // $publication->department_id = $department->id;
          $publication->department_id = $request->input('department_id');
          $publication->category = $request->input('category');
          $publication->user_id = $request->input('user_id');
          $publication->visible= $request->input('visible');

          $publication->save();
        }
        // echo json_encode($publication);
        return $publication;
    }

    public function show($id)
    {
        $publication = Publication::where('id',$id)->get();
        echo json_encode($publication);
    }

    public function getPhotos($id)
    {
        $photos = Photo::where('publi_id',$id)->get();
        foreach($photos as $photo){
            $photoURLs[]='http://intuni.test'.Storage::url($photo->filename);
        }
        echo json_encode($photoURLs);
    }

    public function libros()
    {
        $libros = Publication::where('category','Libro')
        ->orderBy('updated_at','desc')
        ->paginate(10);
        echo json_encode($libros);
    }

    public function apuntes()
    {
        $apuntes = Publication::where('category','Apunte')
        ->orderBy('updated_at','desc')
        ->paginate(10);
        echo json_encode($apuntes);
    }

    public function materiales()
    {
        $materiales = Publication::where('category','Material')
        ->orderBy('updated_at','desc')
        ->paginate(10);
        echo json_encode($materiales);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $publication = Publication::find($id);
        $photos = Photo::where('publi_id',$id)->get();
        foreach ($photos as $photo){
            if(Storage::disk('public')->exists($photo->filename)){
                Storage::disk('public')->delete($photo->filename);
            }
            $photo->delete();
        }
        $publication->delete();
    }

    public function removeAllPhotos($id){
      $photos = Photo::where('publi_id',$id)->get();
        foreach ($photos as $photo){
            if(Storage::disk('public')->exists($photo->filename)){
                Storage::disk('public')->delete($photo->filename);
            }
            $photo->delete();
        }
    }
}
