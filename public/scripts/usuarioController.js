(function() {
	/*
		Proveedor
	*/
	'use strict';

	angular
		.module('authApp')
		.controller('UsuarioController', UsuarioController)
		.controller('UsuarioListController', UsuarioListController)
		.controller('UsuarioCreateController', UsuarioCreateController)
		.controller('UsuarioEditController', UsuarioEditController);
		
	function UsuarioController($scope, $state, $location) {
		
		$scope.isActive = function (viewLocation1) {
		    var active = (viewLocation1 === $location.path());
		    return active;
		}
		
	}

	function UsuarioListController($scope, $http, $auth, $window) {
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/usuario'
			}).success(function(response){
				$scope.usuarios = response;
			}).error(function(data){
			});
		}

		$scope.listar();
		
	}

	function UsuarioCreateController($scope, $http, $auth, $window, $state, $rootScope) {
		$scope.agregar = function(){
			$http({
				'method': "POST",
				'url': 'api/usuario',
				'data': $scope.Usuario
			}).success(function(response){
				$scope.Usuario = {};
				$state.go("usuario.list");
			}).error(function(data){
			});	
		}


	}

	function UsuarioEditController($scope, $http, $auth, $window, $state) {
		$scope.usuarioID = $state.params.usuarioID;
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/usuario/'+ $scope.usuarioID
			}).success(function(data){
				$scope.Usuario = data;
			}).error(function(data){
			});
		}

		$scope.listar();

		$scope.agregar = function(){
			$http({
		    	method: "PUT",
		    	url: 'api/usuario/' + $scope.usuarioID,
		    	data: $scope.Usuario
			}).success(function(data) {
				$state.go('usuario.list');
			})
			.error(function(response){
				$scope.error = response;
			});
		}
	}
})();