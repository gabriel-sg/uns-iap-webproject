<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class RequestModel extends Model
{
    use Searchable;
    // Mapping DB table name.
    protected $table = 'requests';

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();        
        return array('title' => $array['title'],'description' => $array['description']);
    }        

}
