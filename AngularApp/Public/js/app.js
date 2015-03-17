var app = angular.module('Yatter', 
	['ngRoute', 'appControllers', 'firebase']);

var appControllers = angular.module('appControllers', ['firebase']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl:'views/yatterIndex.html',
		controller: 'RegistrationController'
	})
	.when('/register', {
		templateUrl:'views/yatterRegister.html',
		controller: 'RegistrationController'
	})
	.when('/login', {
		templateUrl:'views/yatterLogin.html',
		controller: 'RegistrationController'
	})
	.when('/postsFeed', {
		templateUrl:'views/yatterPostsFeed.html',
		controller: 'PostsController'
	})
	.when('/userProfile', {
		templateUrl:'views/yatterUserProfile.html',
		controller: 'usersController'
	})
	.otherwise({
		redirectTo: '/login'

	});
}]);

