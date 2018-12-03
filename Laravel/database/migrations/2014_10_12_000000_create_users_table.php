<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            // Table options
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci'; //unicode case-insensitive

            // Creating Columns
            $table->string('id',128)->primary();
            $table->string('fullname', 255);
            $table->string('given_name', 100); // Primer nombre
            $table->string('family_name', 100); // Apellido
            $table->string('urlImage', 255);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('phone',100)->default('Sin teléfono'); //veeeeeeeeeer
            $table->string('career', 150)->default('Sin asignar');
            $table->string('department', 100)->default('Sin asignar');
            // flags
            $table->boolean('isFirstLogIn')->default(TRUE);
            $table->boolean('isLogged')->default(FALSE);
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
        Schema::dropIfExists('users');
    }
}
