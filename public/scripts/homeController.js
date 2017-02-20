(function() {
	/*
		Proveedor
	*/
	'use strict';

	angular
		.module('authApp')
		.controller('HomeController', HomeController);
		
	function HomeController($scope, $state, $location, $http) {

		$scope.listar = function(){
			$http({
				'method': "GET",
				'url': 'api/reporte/0/0/0'
			}).success(function(response){
				$scope.casos = response;
				$scope.totales();
				$scope.graficasCasos();
			}).error(function(data){
			});

			$http({
				'method': "GET",
				'url': 'api/etnia'
			}).success(function(response){
				$scope.etnias = response;
			}).error(function(data){
			});

			$http({
				'method': "GET",
				'url': 'api/lugar'
			}).success(function(response){
				$scope.lugares = response;
			}).error(function(data){
			});

			$http({
				'method': "GET",
				'url': 'api/tipocaso'
			}).success(function(response){
				$scope.tipocasos = response;
				
			}).error(function(data){
			});

			$http({
				'method': "GET",
				'url': 'api/usuario'
			}).success(function(response){
				$scope.usuarios = response;
			}).error(function(data){
			});
		}

		$scope.historico = function(){
			$http({
				'method': "GET",
				'url': 'api/reporte/0/0/1'
			}).success(function(response){
				$scope.casos = response;
				$scope.totales();
				$scope.graficasCasos();
			}).error(function(data){
			});
		}

		$scope.estaSemana = function(){
			$http({
				'method': "GET",
				'url': 'api/reporte/0/0/0'
			}).success(function(response){
				$scope.casos = response;
				$scope.totales();
				$scope.graficasCasos();
			}).error(function(data){
			});
		}

		$scope.listar();

		$scope.totales = function(){
			$scope.Totales = {
				hombres_demandantes	: 0,
				hombres_demandados  : 0,
				mujeres_demandantes	: 0,
				mujeres_demandadas	: 0,
				casos_resueltos 	: 0,
				casos_no_resueltos	: 0,
				casos 				: 0
			};

			$scope.Totales.casos = $scope.casos.length;
			angular.forEach($scope.casos, function(caso, key){
				if (caso.demandante.sexo 	== 1) { $scope.Totales.hombres_demandantes++ 	}else{$scope.Totales.mujeres_demandantes++}
				if (caso.demandado.sexo 	== 1) { $scope.Totales.hombres_demandados++ 	}else{$scope.Totales.mujeres_demandadas++}
				if (caso.resuelto 			== 1) { $scope.Totales.casos_resueltos++ 		}else{$scope.Totales.casos_no_resueltos++}
			});


		}

		$scope.datePicker = [];
 		$scope.datePicker.date = {};
 		$scope.datePicker.date = {startDate: null, endDate: null};

		$scope.$watch('datePicker.date', function() {
			if(($scope.datePicker.date.startDate != null)&&($scope.datePicker.date.endDate != null)){
				console.log($scope.datePicker.date)
				$scope.applyDateRange();
			}
    	}, false);

		$scope.applyDateRange = function(){
			var startDate = new Date($scope.datePicker.date.startDate);
			var endDate = new Date($scope.datePicker.date.endDate);
			$scope.inicio =  moment.utc(startDate.getFullYear() + '-'+ (startDate.getMonth() + 1) + '-' + startDate.getDate()).unix();
			$scope.fin = moment.utc(endDate.getFullYear() + '-'+ (endDate.getMonth() + 1) + '-' + endDate.getDate()).unix();

			$http({
				'method': "GET",
				'url': 'api/reporte/'+$scope.inicio+'/' + $scope.fin + '/0'
			}).success(function(response){
				$scope.casos = response;
				$scope.totales();
				$scope.graficasCasos();
			}).error(function(data){
			});
		}

		/*Graficas*/
		$scope.graficasCasos = function(){

			/*Grafica de Tipos de casos*/
			$scope.labels_tipocasos = [];
			$scope.data_tipocasos = [];

			angular.forEach($scope.tipocasos, function(tipocaso, key){
				$scope.labels_tipocasos.push(tipocaso.nombre);
				$scope.data_tipocasos[key] = 0;
			});	

			angular.forEach($scope.tipocasos, function(tipocaso, key){
				
				angular.forEach($scope.casos, function(caso, key2){
					if(caso.tipocaso_id == tipocaso.id){

						$scope.data_tipocasos[key]++;
					}

				});
			});	

			/*Grafica de Los mas denunciados hombres o mujeres*/

			$scope.labels_denciados = ["Mujeres", "Hombres"];
			$scope.data_denunciados = [0,0];

		
			angular.forEach($scope.casos, function(caso, key2){
				if(caso.demandado.sexo == 0){
					$scope.data_denunciados[0]++;
				}else{
					$scope.data_denunciados[1]++;
				}

			});

			/*Grafica de Los mas Denunciantes hombres o mujeres*/

			$scope.labels_denciantes = ["Mujeres", "Hombres"];
			$scope.data_denunciantes = [0,0];

		
			angular.forEach($scope.casos, function(caso, key2){
				if(caso.demandante.sexo == 0){
					$scope.data_denunciantes[0]++;
				}else{
					$scope.data_denunciantes[1]++;
				}

			});

			/*Grafica de Los lugares con mas casos*/

			$scope.labels_lugares = [];
			$scope.data_lugares = [];

		
			angular.forEach($scope.lugares, function(lugar, key){
				$scope.labels_lugares.push(lugar.nombre);
				$scope.data_lugares[key] = 0;
			});	

			angular.forEach($scope.lugares, function(lugar, key){
				
				angular.forEach($scope.casos, function(caso, key2){
					if(caso.lugar_id == lugar.id){

						$scope.data_lugares[key]++;
					}

				});
			});	
		}

		

	}

})();