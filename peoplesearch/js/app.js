angular.module('peoplesearch', ['ngRoute', "peoplesearch.controllers"], function($routeProvider) {
	console.log($routeProvider);
	$routeProvider
	.when('/',{
		templateUrl: 'portal.html'
	})
	.when('/looking',{
		templateUrl:'looking.html',
		controller: "PersonInfosCtrl"
		// controller: null
	})
	.when('/looking/next',{
		templateUrl:'lookingnext.html',
		controller: "PersonLookingCtrl"
	})
	.when('/looking/confirm',{
		templateUrl: 'lookingconfirm.html',
		controller: "ConfirmInfoesCtrl"
	})
});
