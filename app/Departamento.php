<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    // Setting primary key. Because is not an auto incrementing integer, named 'id'.
    public $incrementing = false;
    protected $keyType = 'string';
    protected $primaryKey = 'nombre';
    // Mapping DB table name.
    protected $table = 'departamentos';
}
