(function() {
	/*
		tipocasos
	*/
	'use strict';

	angular
		.module('authApp')
		.controller('TipoCasoController', TipoCasoController)
		.controller('TipoCasoListController', TipoCasoListController)
		.controller('TipoCasoCreateController', TipoCasoCreateController)
		.controller('TipoCasoEditController', TipoCasoEditController);
		
	function TipoCasoController($scope, $state, $location) {
		
		$scope.isActive = function (viewLocation1) {
		    var active = (viewLocation1 === $location.path());
		    return active;
		}
		
	}

	function TipoCasoListController($scope, $http, $auth, $window) {
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/tipocaso'
			}).success(function(response){
				$scope.tipocasos = response;
			}).error(function(data){
			});
		}
		
		$scope.listar();
	}

	function TipoCasoCreateController($scope, $http, $auth, $window, $state, $rootScope) {

		$scope.agregar = function(){
			$http({
				'method': "POST",
				'url': 'api/tipocaso',
				'data': $scope.TipoCaso
			}).success(function(response){
				$scope.TipoCaso = {};
				$state.go("tipocaso.list");
			}).error(function(data){
			});	
		}


	}

	function TipoCasoEditController($scope, $http, $auth, $window, $state) {
		$scope.tipocasoID = $state.params.tipocasoID;
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/tipocaso/' + $scope.tipocasoID
			}).success(function(response){
				$scope.TipoCaso = response;
			}).error(function(data){
			});
		}

		$scope.listar();

		$scope.agregar = function(){
			$http({
				'method': "PUT",
				'url': 'api/tipocaso/' + $scope.tipocasoID,
				'data': $scope.TipoCaso
			}).success(function(response){
				$scope.TipoCaso = {};
				$state.go("tipocaso.list");
			}).error(function(data){
			});	
		}
	}
})();