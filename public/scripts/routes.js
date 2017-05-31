(function() {
	/*
		Proveedor
	*/
	'use strict';

	angular
		.module('authApp')
		.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {
			
			function redirectWhenLoggedOut($q, $injector) {

				return {

					responseError: function(rejection) {

						// Need to use $injector.get to bring in $state or else we get
						// a circular dependency error
						var $state = $injector.get('$state');

						// Instead of checking for a status code of 400 which might be used
						// for other reasons in Laravel, we check for the specific rejection
						// reasons to tell us if we need to redirect to the login state
						var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

						// Loop through each rejection reason and redirect to the login
						// state if one is encountered
						angular.forEach(rejectionReasons, function(value, key) {

							if(rejection.data.error === value) {
								
								// If we get a rejection corresponding to one of the reasons
								// in our array, we know we need to authenticate the user so 
								// we can remove the current user from local storage
								localStorage.removeItem('user');

								// Send the user to the auth state so they can login
								$state.go('auth');
							}
						});

						return $q.reject(rejection);
					}
				}
			}

			// Setup for the $httpInterceptor
			$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

			// Push the new factory onto the $http interceptor array
			$httpProvider.interceptors.push('redirectWhenLoggedOut');

			$authProvider.loginUrl = '/api/authenticate';

			$urlRouterProvider.otherwise('/auth');
			
			$stateProvider
				.state('login',{ /* Template Login*/
					abstract: true,
					templateUrl: '../views/mslogin.html'
				})
					.state('auth', {
						url: '/auth',
						templateUrl: '../views/authView.html',
						controller: 'AuthController as auth',
						'parent': 'login'
					})

				.state('main',{ /* Template Login*/
					abstract: true,
					templateUrl: '../views/mstemplate.html'
				})
					/*Denuncia*/
					.state('denuncia', { 
						url: '/denuncia',
						templateUrl: '../views/denuncia/tablero.html',
						controller: 'DenunciaController as user',
						parent: 'main',
					})
						.state('denuncia.list', {
							url: '/list',
							templateUrl: '../views/denuncia/listado.html',
							controller: 'DenunciaListController as user'
						})
						.state('denuncia.create', {
							url: '/create',
							templateUrl: '../views/denuncia/crear.html',
							controller: 'DenunciaCreateController as user'
						})
                        .state('denuncia.edit', {
                            url: '/edit/:casoID',
                            templateUrl: '../views/denuncia/crear.html',
                            controller: 'DenunciaEditController as user'
                        })
						.state('denuncia.ver', {
							url: '/ver/:casoID',
							templateUrl: '../views/denuncia/ver.html',
							controller: 'DenunciaVerController as user'
						})
					/*Lugares*/
					.state('lugar', { 
						url: '/lugar',
						templateUrl: '../views/lugar/tablero.html',
						controller: 'LugarController as user',
						parent: 'main',
					})
						.state('lugar.list', {
							url: '/list',
							templateUrl: '../views/lugar/listado.html',
							controller: 'LugarListController as user'
						})
						.state('lugar.create', {
							url: '/create',
							templateUrl: '../views/lugar/crear.html',
							controller: 'LugarCreateController as user'
						})
						.state('lugar.edit', {
							url: '/edit/:lugarID',
							templateUrl: '../views/lugar/editar.html',
							controller: 'LugarEditController as user'
						})
					/*Etnias*/
					.state('etnia', { 
						url: '/etnia',
						templateUrl: '../views/etnia/tablero.html',
						controller: 'EtniaController as user',
						parent: 'main',
					})
						.state('etnia.list', {
							url: '/list',
							templateUrl: '../views/etnia/listado.html',
							controller: 'EtniaListController as user'
						})
						.state('etnia.create', {
							url: '/create',
							templateUrl: '../views/etnia/crear.html',
							controller: 'EtniaCreateController as user'
						})
						.state('etnia.edit', {
							url: '/edit/:etniaID',
							templateUrl: '../views/etnia/editar.html',
							controller: 'EtniaEditController as user'
						})
					/*Tipo de caso*/
					.state('tipocaso', { 
						url: '/tipocaso',
						templateUrl: '../views/tipocaso/tablero.html',
						controller: 'TipoCasoController as user',
						parent: 'main',
					})
						.state('tipocaso.list', {
							url: '/list',
							templateUrl: '../views/tipocaso/listado.html',
							controller: 'TipoCasoListController as user'
						})
						.state('tipocaso.create', {
							url: '/create',
							templateUrl: '../views/tipocaso/crear.html',
							controller: 'TipoCasoCreateController as user'
						})
						.state('tipocaso.edit', {
							url: '/edit/:tipocasoID',
							templateUrl: '../views/tipocaso/editar.html',
							controller: 'TipoCasoEditController as user'
						})	
						/*Usuarios*/
					.state('usuario', { 
						url: '/usuario',
						templateUrl: '../views/usuario/tablero.html',
						controller: 'UsuarioController as user',
						parent: 'main',
					})
						.state('usuario.list', {
							url: '/list',
							templateUrl: '../views/usuario/listado.html',
							controller: 'UsuarioListController as user'
						})
						.state('usuario.create', {
							url: '/create',
							templateUrl: '../views/usuario/crear.html',
							controller: 'UsuarioCreateController as user'
						})
						.state('usuario.edit', {
							url: '/edit/:usuarioID',
							templateUrl: '../views/usuario/editar.html',
							controller: 'UsuarioEditController as user'
						})	
					.state('home', {
						url: '/inicio',
						templateUrl: '../views/home/home.html',
						controller: 'HomeController as user',
						parent: 'main'
					})
					.state('miscasos', {
						url: '/mis_casos',
						templateUrl: '../views/denuncia/listado.html',
						controller: 'DenunciaMcController as user',
						parent: 'main'
					})
					/*Usuarios*/
				.state('teacher', { 
					url: '/teacher',
					templateUrl: '../views/teacher/tablero.html',
					controller: 'TeacherController as teachercontroller',
					parent: 'main',
				})
					.state('teacher.calendar', {
						url: '/calendar',
						templateUrl: '../views/teacher/calendar.html',
						controller: 'TeacherCalendarController as teacgercalendar'
					});
		})
})();