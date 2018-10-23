<?php

use Illuminate\Database\Seeder;
use App\Departamento;

class DepartamentoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $depto = new Departamento();
        $depto->nombre = "AGRONOMÍA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "BIOLOGÍA, BIOQUÍMICA Y FARMACIA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "CIENCIAS DE LA ADMINISTRACIÓN";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "CIENCIAS DE LA SALUD";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "CIENCIAS E INGENIERÍA DE LA COMPUTACIÓN";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "DERECHO";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "ECONOMÍA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "FÍSICA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "GEOGRAFÍA Y TURISMO";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "GEOLOGÍA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "HUMANIDADES";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "INGENIERÍA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "INGENIERÍA ELÉCTRICA Y DE COMPUTADORAS";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "INGENIERÍA QUÍMICA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "MATEMÁTICA";
        $depto->save();

        $depto = new Departamento();
        $depto->nombre = "QUÍMICA";
        $depto->save();
    }
}
