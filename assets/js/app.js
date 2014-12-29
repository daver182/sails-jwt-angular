'use strict';

var app = angular.module('app', ['ui.router', 'satellizer']);

app.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function ($stateProvider, $urlRouterProvider, $authProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/templates/home.html',
			controller: 'HomeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/templates/login.html',
			controller: 'LoginCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: '/templates/register.html',
			controller: 'RegisterCtrl'
		})
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutCtrl'
        });

	$urlRouterProvider.otherwise('/');
    
    $authProvider.loginRedirect = '/';
    $authProvider.logoutRedirect = '/';
    $authProvider.signupRedirect = '/login';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/register';
    $authProvider.loginRoute = '/login';
    $authProvider.signupRoute = '/register';
}]);

app.run(function($rootScope, $state, $auth) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        if(toState.name === 'register') return;
        
        if (toState.name !== 'login'){
            if (!$auth.isAuthenticated()) {
                e.preventDefault();
                $state.go('login');
            }
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

app.controller('LoginCtrl', ['$scope', '$state', '$auth', function($scope, $state, $auth) {
	$scope.login = function() {
      $auth.login({ email: $scope.user.email, password: $scope.user.password }).then(function() {
          $state.go('home');
      });
    }
}]);

app.controller('RegisterCtrl', ['$scope', '$state', '$auth', function($scope, $state, $auth) {
	$scope.register = function() {
      $auth.signup({
        email: $scope.user.email,
        password: $scope.user.password,
        confirmPassword: $scope.user.confirmPassword 
      }).then(function() {
          $state.go('home');
      });
    };
}]);

app.controller('LogoutCtrl', ['$scope', '$state', '$auth', function($scope, $state, $auth) {
    $auth.logout().then(function() {
        console.log('logout');
    });
}]);