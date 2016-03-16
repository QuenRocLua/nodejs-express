angular.module('chatroomApp').controller('MessageCreatorCtrl',function($scope,socket){
	$scope.newmessage = '';

	$scope.createMessage = function(){
		if($scope.newMessage == ''){
			return
		}
		socket.emit('createMessage',$scope.newMessage);
		$scope.newmessage = '';
	}
});
