<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Demandado extends Model
{
    protected $table = 'demandados';

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
