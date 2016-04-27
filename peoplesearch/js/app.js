angular.module('peoplesearch', ['ngRoute'], function($routeProvider) {
	console.log($routeProvider);
	$routeProvider
	.when('/',{
		templateUrl: 'portal.html'
	})
	.when('/looking',{
		templateUrl:'looking.html'
		// controller: null
	})
});
