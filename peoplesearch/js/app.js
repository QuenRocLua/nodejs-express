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
	.when('/looking/unmatch',{
		templateUrl: 'lookingunmatch.html'
	})
	.when('/looking/match', {
		templateUrl: 'lookingmatch.html'
	})
	.when('/help', {
		templateUrl: 'help.html',
		controller: "HelpedInfoesCtrl"
	})
	.when('/help/next', {
		templateUrl: 'helpnext.html',
		controller: 'HelpInfoesCtrl'
	})
	.when('/help/confirm', {
		templateUrl: 'helpconfirm.html',
		controller: "HelpConfirmInfoesCtrl"
	})
	.when('/help/unmatch', {
		templateUrl: 'helpunmatch.html'
	})
	.when('/help/match', {
		templateUrl: 'helpmatch.html'
	})

	.when('/safetywall', {
		templateUrl: 'safetywall.html',
		controller: 'SafetyWallCtrl'
	})

	.when('/selfmessage/empty', {
		templateUrl: 'selfmessage_empty.html'
	})

	.when('/selfmessage/full', {
		templateUrl: 'selfmessage_full.html'
	})

	.when('/search', {
		templateUrl: 'search.html',
		controller: "SearchInfoesCtrl"
	})

	.when('/search/next', {
		templateUrl: 'searchnext.html',
		controller: "SearchOptionsCtrl"
	})

	.when('/search/unmatch', {
		templateUrl: 'searchunmatch.html'
	})

	.when('/search/match', {
		templateUrl: 'searchmatch.html'
	})

	.when('/safereport', {
		templateUrl: 'safereport.html',
		controller: "SafeReportInfoCtrl"
	})

	.when('/safereport/next', {
		templateUrl: 'safereportnext.html',
		controller: "SafeReportInfoCheckCtrl"
	})

	.when('/safereport/unmatch', {
		templateUrl: 'safereport_unmatch.html'
	})

	.when('/safereport/match', {
		templateUrl: 'safereport_match.html'
	})

	.otherwise({
		redirectTo: '/'
	})
});
