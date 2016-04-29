angular.module('peoplesearch.controllers', ["ngCookies"])

.controller('PersonInfosCtrl', function($scope, $cookies){
	$scope.person = {
		name: '',
		sex: '男',
		age: '',
		character: {
			height: '',
			weight: '',
			posture: ''
		},
		images: []
	}

	$scope.goNext = function(){
		var person = $scope.person;
		if(!person.name){
			functions.errortip('请输入被寻者姓名');
			return false;
		}

		if(!person.sex){
			functions.errortip('请选择被寻者性别');
			return false;
		}

		if(!person.age){
			functions.errortip('请输入被寻者年龄');
			return false;
		}
		$cookies.putObject('personinfo',person);
		location.href = "#/looking/next";
	}
})

.controller('PersonLookingCtrl', function($scope, $cookies){
	$scope.personlooking = {
		name: '',
		phone: '',
		errortip: ''
	}
	$scope.infoConfirm = function(){
		var info = $scope.personlooking;
		
		if(!info.name){
			functions.errortip("请输入寻人者姓名");
			return false;
		}
		if(!info.phone){
			functions.errortip("请输入寻人者电话");
			return false;
		}
		if(!functions.phonecheck(info.phone)){
			functions.errortip("请输入正确手机号");
			return false;
		}

		$cookies.putObject('personlooking', info);
		location.href = "#/looking/confirm"
	}
})

.controller('ConfirmInfoesCtrl', function( $scope, $cookies, $http){
	var personinfo = $cookies.get('personinfo');
	var personlooking = $cookies.get('personlooking');

	$scope.confirm = {
		person: angular.fromJson(personinfo),
		personlooking: angular.fromJson(personlooking)
	}

	$scope.confirmInfoes = function(){
		//提交信息，根据返回提供不同页面
		var randomindex = 1;
		console.log(randomindex);
		if(randomindex === 0){
			//跳转为找到匹配项页面
			location.href = "#/looking/unmatch"
		}else{
			//跳转到匹配页面
			location.href = "#/looking/match"
		}
	}
})

.controller('HelpedInfoesCtrl', function($scope, $cookies){
	$scope.helped = {
		name: '',
		sex: '男',
		age: '',
		address: '',
		character: {
			height: '',
			weight: '',
			posture: ''
		},
		images: []
	}

	$scope.goNext = function(){
		var person = $scope.helped;
		if(!person.name){
			functions.errortip('请输入被助者姓名');
			return false;
		}

		if(!person.sex){
			functions.errortip('请选择被助者性别');
			return false;
		}

		if(!person.age){
			functions.errortip('请输入被助者年龄');
			return false;
		}

		if(!person.address){
			functions.errortip('请输入被助者所在地址');
			return false;
		}
		$cookies.putObject('helpedinfo',person);
		location.href = "#/help/next";
	}
})

.controller('HelpInfoesCtrl', function($scope, $cookies){
	$scope.helpinfoes = {
		name: '',
		phone: '',
		id: ''
	}

	$scope.confirmInfoes = function(){
		var info = $scope.helpinfoes;

		if(!info.name){
			functions.errortip("请输入帮助者姓名");
			return false;
		}

		if(!info.phone){
			functions.errortip("请输入帮助者电话");
			return false;
		}

		if(!functions.phonecheck(info.phone)){
			functions.errortip("请输入正确电话");
			return false;
		}

		$cookies.putObject('helpinfoes', info);
		location.href = "#/help/confirm"
	}
})

.controller('HelpConfirmInfoesCtrl', function($scope, $cookies, $http){
	var helpedinfo = $cookies.get('helpedinfo');
	var helpinfoes = $cookies.get('helpinfoes');
	console.log(helpedinfo);
	console.log(helpinfoes);

	$scope.helpconfirm = {
		helped: angular.fromJson(helpedinfo),
		helpinfo: angular.fromJson(helpinfoes)
	}

	$scope.submit = function(){
		var randomindex = 0;
		console.log(randomindex);
		if(randomindex === 0){
			//跳转为找到匹配项页面
			location.href = "#/help/unmatch"
		}else{
			//跳转到匹配页面
			location.href = "#/help/match"
		}
	}

})

.controller('SafetyWallCtrl', function($scope, $http){
	$scope.selfMessage = function(){
		var index = 1;
		if(index === 0){
			location.href = "#/selfmessage/empty"
		}else{
			location.href = "#/selfmessage/full"
		}
	}
})

.controller('SearchInfoesCtrl', function($scope){
	$scope.searchinfo = {
		name: '',
		phone: ''
	}

	$scope.goNext = function(){
		var searchinfo = $scope.searchinfo;

		if(!searchinfo.name){
			functions.errortip("请输入寻人者姓名");
			return false;
		}

		if(!searchinfo.phone){
			functions.errortip("请输入寻人者电话");
			return false
		}

		location.href = "#/search/next"
	}
})

.controller('SearchOptionsCtrl', function($scope, $http){
	$scope.searchedinfo = {
		name: '',
		sex: '男',
		age: {
			from: '',
			to: ''
		},
		character: {
			height: '',
			weight: '',
			posture: ''
		}
	}

	$scope.startSearch = function(){
		var index = 1;
		if(index === 0){
			location.href = '#/search/unmatch'
		}else{
			location.href = '#/search/match'
		}
	}
})

.controller('SafeReportInfoCtrl', function($scope, $cookies){
	$scope.reportinfo = {
		name: '',
		sex: '男',
		age: '',
		phone: '',
		address: '',
		images: [],
		remark: ''
	}

	$scope.confirmInfoes = function(){
		var info = $scope.reportinfo;
		if(!info.name){
			functions.errortip("请输入您的姓名");
			return false;
		}
		if(!info.age){
			functions.errortip("请输入您的年龄");
			return false;
		}
		if(!info.phone){
			functions.errortip("请输入您的电话");
			return false;
		}
		if(!info.address){
			functions.errortip("请输入您的地址");
			return false;
		}
		$cookies.putObject('safereportinfo', info);
		location.href = "#/safereport/next"
	}
})

.controller('SafeReportInfoCheckCtrl', function($scope, $cookies, $http){
	var checkinfo = angular.fromJson($cookies.get('safereportinfo'));
	console.log(checkinfo);
	$scope.checkinfo = checkinfo;
	$scope.submit = function(){
		var index = 1;
		if(index === 0){
			location.href = "#/safereport/unmatch"
		}else{
			location.href = "#/safereport/match"
		}
	}
})
