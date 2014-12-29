'use strict';

var app = angular.module('app', ['ngRoute', 'angular-jwt', 'LocalStorageModule']);

app.config(['$routeProvider', 'jwtInterceptorProvider', '$httpProvider', function ($routeProvider, jwtInterceptorProvider, $httpProvider) {
	$routeProvider
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
		.otherwise({ redirectTo: '/' });

	jwtInterceptorProvider.tokenGetter = function(localStorageService) {
		return localStorageService.get('jwt');
	}

	$httpProvider.interceptors.push('jwtInterceptor');
}]);

app.run(function($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function(e, nextRoute) {
        if (nextRoute.$$route.originalPath !== "/login" && !localStorageService.get('jwt')) {
			e.preventDefault();
			$location.path('/login');
		}
	});
});

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

app.controller('LoginCtrl', ['$scope', 'localStorageService', '$http', '$location', function($scope, localStorageService, $http, $location) {
	$scope.login = function() {
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
	}
}]);

app.controller('RegisterCtrl', ['$scope', 'localStorageService', '$http', '$location', function($scope, localStorageService, $http, $location) {
	$scope.register = function() {
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
	}
}]);