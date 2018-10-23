<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $usuario = new User();
        $usuario->name = "pepe";
        $usuario->email = "sapopepe@ejemplo.com";
        $usuario->password = bcrypt('sapopepe');
        $usuario->phone = "299 5919191";
        $usuario->career = "ABOGACIA";
        $usuario->department = "DERECHO";
        $usuario->save();

    }
}
