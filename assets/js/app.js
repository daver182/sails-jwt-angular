'use strict';

var app = angular.module('app', ['ui.router', 'angular-jwt', 'satellizer']);

app.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function ($stateProvider, $urlRouterProvider, $authProvider) {
	/*$routeProvider
		.when('/', {
			templateUrl: '/templates/home.html',
			controller: 'HomeCtrl'
		})
		.when('/login', {
			templateUrl: '/templates/login.html',
			controller: 'LoginCtrl'
		})
		.when('/register', {
			templateUrl: '/templates/register.html',
			controller: 'RegisterCtrl'
		})
		.otherwise({ redirectTo: '/' });*/

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/templates/home.html',
			controller: 'HomeCtrl'
			resolve: {
				authenticated: function($q, $state, $auth) {
					var deferred = $q.defer();

					if (!$auth.isAuthenticated()) {
						$state.go('login');
					} else {
						deferred.resolve();
					}

					return deferred.promise;
				}
			}
		})
		.state('login', {
			url: '/login',
			templateUrl: '/templates/login.html',
			controller: 'LoginCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '/templates/signup.html',
			controller: 'RegisterCtrl'
		});

	$urlRouterProvider.otherwise('/');

	/*jwtInterceptorProvider.tokenGetter = function(localStorageService) {
		return localStorageService.get('jwt');
	}

	$httpProvider.interceptors.push('jwtInterceptor');*/
}]);

/*app.run(function($rootScope, $location, localStorageService, jwtHelper) {
	$rootScope.$on('$routeChangeStart', function(e, nextRoute) {
        if (nextRoute.$$route.originalPath !== '/login'){
            if(localStorageService.get('jwt')){
                if(jwtHelper.isTokenExpired(localStorageService.get('jwt'))){
                    e.preventDefault();
        		    $location.path('/login');
                }
    		}else{
                e.preventDefault();
                $location.path('/login');
            }
        }
	});
});*/

app.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.title = 'Home Controller';
	$http({
		url: '/test/restricted',
		method: 'GET'
	}).then(function(response) {
		$scope.datos = response.data;
	}, function(error) {
		console.log(error.data);
	});
}]);

app.controller('LoginCtrl', ['$scope', 'localStorageService', '$http', '$location', function($scope, $state) {
	/*$scope.login = function() {
		$http({
			url: '/auth/authenticate',
			method: 'POST',
			data: $scope.user
		}).then(function(response) {
			localStorageService.set('jwt', response.data.token);
			$location.path('/');
		}, function(error) {
			console.log(error.data);
		});
	}*/
}]);

app.controller('RegisterCtrl', ['$scope', 'localStorageService', '$http', '$location', function($scope, $state) {
	/*$scope.register = function() {
		$http({
			url: '/auth/register',
			method: 'POST',
			data: $scope.user
		}).then(function(response) {
			localStorageService.set('jwt', response.data.token);
			$location.path('/');
		}, function(error) {
			console.log(error.data);
		});
	}*/
}]);