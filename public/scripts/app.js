(function() {

	'use strict';

	angular
		.module('authApp', ['ui.router', 'satellizer', 'daterangepicker', 'chart.js'])
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

			$authProvider.loginUrl = 'muni/public/api/authenticate';

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
					});
		})
		.run(function($rootScope, $state) {

			// $stateChangeStart is fired whenever the state changes. We can use some parameters
			// such as toState to hook into details about the state as it is changing
			$rootScope.$on('$stateChangeStart', function(event, toState) {

				// Grab the user from local storage and parse it to an object
				var user = JSON.parse(localStorage.getItem('user'));			

				// If there is any user data in local storage then the user is quite
				// likely authenticated. If their token is expired, or if they are
				// otherwise not actually authenticated, they will be redirected to
				// the auth state because of the rejected request anyway
				if(user) {

					// The user's authenticated state gets flipped to
					// true so we can now show parts of the UI that rely
					// on the user being logged in
					$rootScope.authenticated = true;

					// Putting the user's data on $rootScope allows
					// us to access it anywhere across the app. Here
					// we are grabbing what is in local storage
					$rootScope.currentUser = user;

					// If the user is logged in and we hit the auth route we don't need
					// to stay there and can send the user to the main state
					if(toState.name === "auth") {

						// Preventing the default behavior allows us to use $state.go
						// to change states
						event.preventDefault();

						// go to the "main" state which in our case is users
						$state.go('home');
					}	
					//$rootScope.getdata();	
				}else{
					if(toState.name != "auth") {
						$state.go('auth');
					}
				}
			});
		});
})();