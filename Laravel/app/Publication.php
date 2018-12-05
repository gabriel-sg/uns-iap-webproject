<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use App\Department;

class Publication extends Model
{
    //
    use Searchable;

     /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();  
        $depto= Department::find($array['department_id']);      
        return array('title' => $array['title'],'description' => $array['description'],'category' => $array['category'], 'department' => $depto->name);
    } 
}
