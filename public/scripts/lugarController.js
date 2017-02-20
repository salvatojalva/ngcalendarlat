(function() {
	/*
		Lugares
	*/
	'use strict';

	angular
		.module('authApp')
		.controller('LugarController', LugarController)
		.controller('LugarListController', LugarListController)
		.controller('LugarCreateController', LugarCreateController)
		.controller('LugarEditController', LugarEditController);
		
	function LugarController($scope, $state, $location) {
		
		$scope.isActive = function (viewLocation1) {
		    var active = (viewLocation1 === $location.path());
		    return active;
		}
		
	}

	function LugarListController($scope, $http, $auth, $window) {
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/lugar'
			}).success(function(response){
				$scope.lugares = response;
			}).error(function(data){
			});
		}
		
		$scope.listar();
	}

	function LugarCreateController($scope, $http, $auth, $window, $state, $rootScope) {
		$scope.usuario = $rootScope.currentUser;

		$scope.agregar = function(){
			$http({
				'method': "POST",
				'url': 'api/lugar',
				'data': $scope.Lugar
			}).success(function(response){
				$scope.Lugar = {};
				$state.go("lugar.list");
			}).error(function(data){
			});	
		}


	}

	function LugarEditController($scope, $http, $auth, $window, $state) {
		$scope.lugarID = $state.params.lugarID;
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/lugar/' + $scope.lugarID
			}).success(function(response){
				$scope.Lugar = response;
			}).error(function(data){
			});
		}

		$scope.listar();

		$scope.agregar = function(){
			$http({
				'method': "PUT",
				'url': 'api/lugar/' + $scope.lugarID,
				'data': $scope.Lugar
			}).success(function(response){
				$scope.Lugar = {};
				$state.go("lugar.list");
			}).error(function(data){
			});	
		}
	}
})();