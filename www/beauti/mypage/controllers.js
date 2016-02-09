angular.module('miral.beauti.mypage.controllers', [])

.controller('beautiMypageControllers', function($scope, $state) {

	//rpopmodify
	//初期ビュー
	$scope.viewNo = "1";

	$scope.RpopmodifyNextBtn=function(){
		$scope.viewNo="2";
	}

	$scope.RpopmodifyBackBtn=function(){
		$scope.viewNo="1";
	}


	$scope.RpopmodifyNextBtn2=function(){
		$scope.viewNo="3";
	}



})

;
