<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// Models
use App\RequestModel;
use App\Departamento;


class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('requests.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $departamentos = Departamento::all();
        return view('requests.create', compact('departamentos'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validacion de los datos
        $validateData = $request->validate([
            'titulo' => 'required|max:10', //de prueba
            'descripcion' => 'required',
            'departamento' => 'required',
            'categoria' => 'required'
        ]);


        $requestEntry = new RequestModel();

        $requestEntry->titulo = $request->input('titulo');
        $requestEntry->descripcion = $request->input('descripcion');
        $requestEntry->departamento = $request->get('departamento');
        $requestEntry->carrera = 'Ingeniería en Computación';
        $requestEntry->categoria = $request->get('categoria');
        $requestEntry->user_id = 1;

        $requestEntry->save();

        return response()->json($requestEntry,200,[],JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
