angular.module('peoplesearch.controllers', ["ngCookies"])

.controller('PersonInfosCtrl', function($scope, $cookies){
	$scope.person = angular.fromJson($cookies.get('personinfo')) || {
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
			errortip('请输入被寻者姓名');
			return false;
		}

		if(!person.sex){
			errortip('请选择被寻者性别');
			return false;
		}

		if(!person.age){
			errortip('请输入被寻者年龄');
			return false;
		}
		$cookies.putObject('personinfo',person);
		location.href = "#/looking/next";
	}
})

.controller('PersonLookingCtrl', function($scope, $cookies){
	$scope.personlooking = angular.fromJson($cookies.get("personlooking")) || {
		name: '',
		phone: '',
		errortip: ''
	}
	$scope.infoConfirm = function(){
		var info = $scope.personlooking;
		var reg = /(^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/;
		var phonecheck = reg.test(info.phone);
		if(!info.name){
			errortip("请输入寻人者姓名");
			return false;
		}
		if(!info.phone){
			errortip("请输入寻人者电话");
			return false;
		}
		if(!phonecheck){
			errortip("请输入正确手机号");
			return false;
		}

		$cookies.putObject('personlooking', info);
		location.href = "#/looking/confirm"
	}
})

.controller('ConfirmInfoesCtrl', function( $scope, $cookies ){
	var personinfo = $cookies.get('personinfo');
	var personlooking = $cookies.get('personlooking');

	$scope.confirm = {
		person: angular.fromJson(personinfo),
		personlooking: angular.fromJson(personlooking)
	}

	
})

function errortip(html){
	$("#errortip").html(html);		
	$("#errortip").fadeIn();
	$("#errortip").fadeOut(3000);
}