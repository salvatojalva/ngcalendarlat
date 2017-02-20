<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\TipoCaso;

class TipoCasoController extends Controller
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
        return TipoCaso::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {
        $TipoCaso = new TipoCaso();
        $TipoCaso->fill($request->all());
        $TipoCaso->save();
        return $TipoCaso;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {

        return TipoCaso::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $TipoCaso = TipoCaso::find($id);
        $TipoCaso->fill( $request->all());
        $TipoCaso->save();
        return $TipoCaso;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return TipoCaso::destroy($id);
    }
}