<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Cita;

use Carbon\Carbon;

class CitaController extends Controller
{

     public function __construct()
    {
        // Aplica atenticación
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Cita::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {
        $temporal = $request->all();
        $Cita = new Cita();
        $Cita->fill($request->all());

        $Cita->fecha = new Carbon($Cita->fecha);
        $Cita->fecha->toDateString();

        $Cita->hora = new Carbon($Cita->hora);
        $Cita->hora->subHours(6);
        $Cita->hora->toDateString();
        $Cita->caso_id = $temporal['caso_id'];
        $Cita->save();
        return $Cita;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {

        return Cita::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $Cita = Cita::find($id);
        $Cita->fill( $request->all());
        $Cita->save();
        return $Cita;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return Cita::destroy($id);
    }
}