<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePublicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publications', function (Blueprint $table) {
            // Table options
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            // Creating Columns
            $table->increments('id'); //primary
            $table->string('titulo', 255);
            $table->text('descripcion');
            //$table->integer('telefono');
            $table->boolean('visible');
            $table->string('departamento',100);
            $table->string('carrera',150);
            $table->string('categoria',100);
            //$table->string('url_foto',255);
            $table->unsignedInteger('user_id'); //Foreign
            $table->foreign('user_id')->references('id')->on('users')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('publications');
    }
}
