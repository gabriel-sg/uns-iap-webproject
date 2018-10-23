<?php

use Illuminate\Database\Seeder;
use App\Department;

class DepartmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $depto = new Department();
        $depto->name = "OTROS";
        $depto->save();

        $depto = new Department();
        $depto->name = "AGRONOMÍA";
        $depto->save();

        $depto = new Department();
        $depto->name = "BIOLOGÍA, BIOQUÍMICA Y FARMACIA";
        $depto->save();

        $depto = new Department();
        $depto->name = "CIENCIAS DE LA ADMINISTRACIÓN";
        $depto->save();

        $depto = new Department();
        $depto->name = "CIENCIAS DE LA SALUD";
        $depto->save();

        $depto = new Department();
        $depto->name = "CIENCIAS E INGENIERÍA DE LA COMPUTACIÓN";
        $depto->save();

        $depto = new Department();
        $depto->name = "DERECHO";
        $depto->save();

        $depto = new Department();
        $depto->name = "ECONOMÍA";
        $depto->save();

        $depto = new Department();
        $depto->name = "FÍSICA";
        $depto->save();

        $depto = new Department();
        $depto->name = "GEOGRAFÍA Y TURISMO";
        $depto->save();

        $depto = new Department();
        $depto->name = "GEOLOGÍA";
        $depto->save();

        $depto = new Department();
        $depto->name = "HUMANIDADES";
        $depto->save();

        $depto = new Department();
        $depto->name = "INGENIERÍA";
        $depto->save();

        $depto = new Department();
        $depto->name = "INGENIERÍA ELÉCTRICA Y DE COMPUTADORAS";
        $depto->save();

        $depto = new Department();
        $depto->name = "INGENIERÍA QUÍMICA";
        $depto->save();

        $depto = new Department();
        $depto->name = "MATEMÁTICA";
        $depto->save();

        $depto = new Department();
        $depto->name = "QUÍMICA";
        $depto->save();
    }
}
