(function() {
  'use strict';

  angular
    .module('authApp')
    .controller('MenuController', MenuController)
    .controller('BodyController', BodyController)
    .service('LogoutService', LogoutService);
    
    function MenuController($scope, $location, $auth, LogoutService, $http) {

      $scope.isLogged = function(){
        $http({
          'method': "GET",
          'url': 'api/is_logged'
        }).success(function(response){
        }).error(function(data){
        });
      }

      $scope.isLogged();

      $scope.salir = function(){
        LogoutService.logout();
      }
    }

    function  BodyController($scope, $location){
      $scope.isActive = function (viewLocation1) {
        var active = (viewLocation1 === $location.path());
        return active;
      }
    }

    function LogoutService($http, $auth, $rootScope) {
      this.logout = function() {
        $auth.logout().then(function() {
          // Remove the authenticated user from local storage
          localStorage.removeItem('user');
          // Flip authenticated to false so that we no longer
          // show UI elements dependant on the user being logged in
          $rootScope.authenticated = false;

          // Remove the current user info from rootscope
          $rootScope.currentUser = null;
        });
      }
    }  
})();