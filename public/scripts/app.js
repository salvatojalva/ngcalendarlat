(function() {

	'use strict';

	angular
		.module('authApp', ['ui.router', 'satellizer', 'daterangepicker', 'chart.js', 'ui.calendar'])
		
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