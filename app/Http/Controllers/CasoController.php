<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Caso;
use App\Demandante;
use App\Demandado;
use App\Cita;

use Carbon\Carbon;

class CasoController extends Controller
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $casos = Caso::where('resuelto', '<>', 1)->get();

        foreach ($casos as $key => $caso) {
            $casos[$key]->demandante;
            $casos[$key]->demandado;
            $casos[$key]->citas;
            $casos[$key]->cita = $casos[$key]->citas[count($casos[$key]->citas) - 1];
            $casos[$key]->user;
            $casos[$key]->tipocaso;
        }

        
        return $casos;
    }

    
    public function crear(Request $request)
    {
        $datos = $request->all();

        if (isset($datos['caso']['id'])) {
            $caso = Caso::find($datos['caso']['id']);
        } else {
            $caso = new Caso();
        }

        $caso->fill($datos['caso']);
        $caso->fecha = new Carbon($caso->fecha);
        $caso->fecha->toDateString();
        $caso->save();

        if($caso->id){
            if (isset($datos['Demandante']['id'])) {
                $demandante = Demandante::find($datos['Demandante']['id']);
            } else {
                $demandante = new Demandante();
            }

            $demandante->fill($datos['Demandante']);
            $demandante->caso_id = $caso->id;
            $demandante->fecha_nacimiento = new Carbon($demandante->fecha_nacimiento);
            $demandante->fecha_nacimiento->toDateString();
            $demandante->save();

            if (isset($datos['Demandado']['id'])) {
                $demandado = Demandado::find($datos['Demandado']['id']);
            } else {
                $demandado = new Demandado();
            }

            $demandado->fill($datos['Demandado']);
            $demandado->caso_id = $caso->id;
            $demandado->fecha_nacimiento = new Carbon($demandado->fecha_nacimiento);
            $demandado->fecha_nacimiento->toDateString();
            $demandado->save();

            if (isset($datos['Cita']['id'])) {
                $cita = Cita::find($datos['Cita']['id']);
            } else {
                $cita = new Cita();
            }

            $cita->fill($datos['Cita']);
            $cita->caso_id = $caso->id;
            $cita->user_id = $caso->user_id;
            $cita->fecha = new Carbon($cita->fecha);
            $cita->fecha->toDateString();

            $cita->hora = new Carbon($cita->hora);
            $cita->hora->subHours(6);
            $cita->hora->toDateString();
            $cita->save();            

        }


        return $caso;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $caso = Caso::find($id);
        $caso->demandante;
        $caso->demandado;
        $caso->citas;
        $caso->user;
        $caso->tipocaso;
        $caso->lugar;
        return $caso;
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $temporal = $request->all();
        $caso = Caso::find($id);
        $caso->fill( $request->all());
        if ($temporal['resuelto'] == 1) {
            $caso->resuelto = true;
        }
        $caso->save();
        return $caso;
    }

    public function buscarCasos($fecha_inicio, $fecha_fin, $todos) 
    {

        if($todos != 1){
            if($fecha_inicio != 0){
                $fecha_inicio = Carbon::createFromTimestamp($fecha_inicio);
                $fecha_fin = Carbon::createFromTimestamp($fecha_fin);
            }else{
                $fecha_fin = Carbon::now();
                $fecha_inicio = Carbon::now();
                $fecha_inicio->subWeek();
            }
            $casos = Caso::whereBetween('fecha',[$fecha_inicio, $fecha_fin])->get();

            
        }else{
            $casos = Caso::all();
        }
        
        foreach ($casos as $key => $caso) {
            $casos[$key]->demandante;
            $casos[$key]->demandado;
            $casos[$key]->citas;
            $casos[$key]->cita = $casos[$key]->citas[count($casos[$key]->citas) - 1];
            $casos[$key]->user;
            $casos[$key]->lugar;
            $casos[$key]->tipocaso;
        }
       
        return $casos;
    }

    public function miscasos($user_id)
    {
        $casos = Caso::where('user_id', '=', $user_id)->where('resuelto', '<>', 1)->get();

        foreach ($casos as $key => $caso) {
            $casos[$key]->demandante;
            $casos[$key]->demandado;
            $casos[$key]->citas;
            $casos[$key]->cita = $casos[$key]->citas[count($casos[$key]->citas) - 1];
            $casos[$key]->user;
            $casos[$key]->tipocaso;
        }

        
        return $casos;
    }
    
}
