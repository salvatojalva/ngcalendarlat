<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Demandante extends Model
{
    protected $table = 'demandantes';

    protected $fillable = [
        'nombre',
        'apellido',
        'dpi',
        'sexo',
        'fecha_nacimiento',
        'lugar_id',
        'telefono'
    ];
}
