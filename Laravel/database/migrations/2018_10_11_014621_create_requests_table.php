<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            // Table options
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            // Creating Columns
            $table->increments('id'); //primary
            $table->string('title', 255); // default max = 255
            $table->text('description');
            $table->unsignedInteger('department_id');
            $table->foreign('department_id')->references('id')->on('departments')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->string('category',100);
            $table->string('user_id'); //Foreign
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
        Schema::dropIfExists('requests');
    }
}
