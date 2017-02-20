<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Inicial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lugares', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('etnias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('tipocasos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('casos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tipocaso_id');
            $table->date('fecha');
            $table->integer('lugar_id'); 
            $table->integer('user_id'); 
            $table->integer('atendio_id'); 
            $table->longText('descripcion');
            $table->boolean('resuelto')->default(false); 
            $table->timestamps();
        });

        Schema::create('demandantes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('caso_id'); 
            $table->string('nombre');
            $table->string('apellido');
            $table->integer('dpi'); 
            $table->integer('sexo'); 
            $table->date('fecha_nacimiento');
            $table->integer('lugar_id');
            $table->integer('telefono'); 
            $table->timestamps();
        });

        Schema::create('demandados', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('caso_id'); 
            $table->string('nombre');
            $table->string('apellido');
            $table->integer('dpi'); 
            $table->integer('sexo'); 
            $table->date('fecha_nacimiento');
            $table->integer('lugar_id');
            $table->integer('telefono'); 
            $table->timestamps();
        });

        Schema::create('citas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('caso_id'); 
            $table->integer('user_id'); 
            $table->date('fecha');
            $table->time('hora');
            $table->longText('nota')->nullable();
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
        Schema::drop('lugares');
        Schema::drop('etnias');
        Schema::drop('tipocasos');
        Schema::drop('casos');
        Schema::drop('demandantes');
        Schema::drop('demandados');
        Schema::drop('citas');
        
    }
}
