<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function()
{
	Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
	Route::post('authenticate', 'AuthenticateController@authenticate');
	Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
	Route::get('is_logged', 'AuthenticateController@is_logged');

	Route::resource('lugar', 'LugarController');
	Route::resource('etnia', 'EtniaController');
	Route::resource('tipocaso', 'TipoCasoController');
	Route::resource('usuario', 'UserController');
	Route::resource('casos', 'CasoController');
	Route::resource('cita', 'CitaController');

	Route::post('denuncia', 'CasoController@crear');
	Route::get('reporte/{fecha_inicio}/{fecha_final}/{todos}', 'CasoController@buscarCasos');
	
	Route::get('miscasos/{user_id}', 'CasoController@miscasos');

});
