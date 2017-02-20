<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoCaso extends Model
{
    protected $table = 'tipocasos';

    protected $fillable = [
        'nombre',
    ];
}
