angular.module('miral.beauti.mypage.controllers', [])

.controller('beautiMypageControllers', function($scope, $state) {

	//rpopmodify
	//初期ビュー
	$scope.viewNo = "1";

	$scope.prop = {};
	$scope.prop.headerColor = "calm";

	$scope.getHeaderClass = function(){
		var cl =  ["bar-subheader"];
		cl.push("bar-"+$scope.prop.headerColor);
		return cl;
	}

	$scope.onBasicNextBtn=function(){
		$scope.viewNo="2";
	}

	$scope.onBasicNextBtn2=function(){
		$scope.viewNo="3";
	}



})

;
