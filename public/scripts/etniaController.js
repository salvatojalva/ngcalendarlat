(function() {
	/*
		Etnias
	*/
	'use strict';

	angular
		.module('authApp')
		.controller('EtniaController', EtniaController)
		.controller('EtniaListController', EtniaListController)
		.controller('EtniaCreateController', EtniaCreateController)
		.controller('EtniaEditController', EtniaEditController);
		
	function EtniaController($scope, $state, $location) {
		
		$scope.isActive = function (viewLocation1) {
		    var active = (viewLocation1 === $location.path());
		    return active;
		}
		
	}

	function EtniaListController($scope, $http, $auth, $window) {
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/etnia'
			}).success(function(response){
				$scope.etnias = response;
			}).error(function(data){
			});
		}
		
		$scope.listar();
	}

	function EtniaCreateController($scope, $http, $auth, $window, $state, $rootScope) {
		$scope.usuario = $rootScope.currentUser;

		$scope.agregar = function(){
			$http({
				'method': "POST",
				'url': 'api/etnia',
				'data': $scope.Etnia
			}).success(function(response){
				$scope.Etnia = {};
				$state.go("etnia.list");
			}).error(function(data){
			});	
		}


	}

	function EtniaEditController($scope, $http, $auth, $window, $state) {
		$scope.etniaID = $state.params.etniaID;
		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/etnia/' + $scope.etniaID
			}).success(function(response){
				$scope.Etnia = response;
			}).error(function(data){
			});
		}

		$scope.listar();

		$scope.agregar = function(){
			$http({
				'method': "PUT",
				'url': 'api/etnia/' + $scope.etniaID,
				'data': $scope.Etnia
			}).success(function(response){
				$scope.Etnia = {};
				$state.go("etnia.list");
			}).error(function(data){
			});	
		}
	}
})();