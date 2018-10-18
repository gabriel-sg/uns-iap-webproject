
@extends('layouts.app')

@section('title', 'Crear solicitud')

@section('content')
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="row">
        <div class="col-6">
            <form class="form-group" method="POST" action="/request" >
                @csrf
                <div class="form-group">
                    <label for="titulo">Título</label>
                    <input type="text" name="titulo" class="form-control">

                    <label for="descripcion">Descripción</label>
                    <textarea class="form-control" name="descripcion" rows="3"></textarea>

                    <div class="form-row">
                        <div class="col-6">
                            <label for="departamento">Departamento</label>
                            <select class="form-control" name="departamento">
                                @foreach ($departamentos as $depto)
                                    <option value="{{$depto->nombre}}">{{$depto->nombre}}</option>
                                @endforeach
                            </select>

                            <label for="categoria">Categoría</label>
                            <select class="form-control" name="categoria">
                                <option value="Libro">Libro</option>
                                <option value="Apunte">Apunte</option>
                                <option value="Material">Material</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Publicar</button>
            </form>
        </div>
    </div>

    {{-- <div class="row">
        <form class="col s6">
              <div class="row">
                <div class="input-field col s12">
                  <input id="last_name" type="text" class="validate">
                  <label for="last_name">Last Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea"></textarea>
                    <label for="textarea1">Textarea</label>
                </div>
            </div>


        </form>
    </div> --}}
@endsection


