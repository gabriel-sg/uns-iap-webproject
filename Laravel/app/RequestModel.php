<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestModel extends Model
{
    // Mapping DB table name.
    protected $table = 'requests';
/*
    public function scopeSearch($query)
    {
        return empty(request()->search) ? $query : $query->where('title','like','%'.request()->search.'%');
    }
*/
}
