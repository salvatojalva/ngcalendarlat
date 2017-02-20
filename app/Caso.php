<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Caso extends Model
{
    protected $table = 'casos';

    protected $fillable = [
        'tipocaso_id',
        'fecha',
        'lugar_id',
        'user_id',
        'atendio_id',
        'descripcion',
    ];

    public function demandante()
    {
        return $this->hasOne('App\Demandante');
    }

    public function demandado()
    {
        return $this->hasOne('App\Demandado');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function citas()
    {
        return $this->hasMany('App\Cita');
    }

    public function tipocaso()
    {
        return $this->belongsTo('App\TipoCaso');
    }

    public function lugar()
    {
        return $this->belongsTo('App\Lugar');
    }
}
