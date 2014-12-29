'use strict';

var app = angular.module( 'app', ['ngRoute', 'angular-jwt', 'LocalStorageModule']);

app.config(['$routeProvider', 'jwtInterceptorProvider', '$httpProvider', function ($routeProvider, jwtInterceptorProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/templates/home.html',
			controller: 'HomeCtrl'
		})
		.otherwise({ redirectTo: '/' });

	jwtInterceptorProvider.tokenGetter = function(localStorageService) {
		return localStorageService.get('jwt');
	}

	$httpProvider.interceptors.push('jwtInterceptor');
})

app.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.title = 'Home Controller';
}]);