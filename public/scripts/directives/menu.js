(function() {

	'use strict';

	angular
		.module('authApp')
		.directive('userMenu', userMenu);

	function userMenu () {
        return {
            restrict: 'E',
            templateUrl: '/views/elements/menu.html'
        }  
    }
	
})();