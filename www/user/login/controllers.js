angular.module('miral.user.login.controllers', [])

.controller('userLoginControllers', function($scope, $state) {

	$scope.isShowPassword = false;

	//入力項目は必ず配列にすること、でないと値が取得できない
	$scope.login={};
	$scope.login.userid = "";
	$scope.login.password = "";

	$scope.onChangePasswordShow=function(){
		$scope.isShowPassword = !$scope.isShowPassword;
	}

	$scope.onLogin=function() {

		if($scope.login.userid && $scope.login.password){
			//state名を指定してTOP画面に遷移（今は、美容師用TOPページ固定遷移）
			$state.go('beauti-top',null,'');
		}

	}
})

;
