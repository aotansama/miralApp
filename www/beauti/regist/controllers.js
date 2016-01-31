angular.module('miral.beauti.regist.controllers', [])

/**
 * 初期表示コントローラー
 */
.controller('beautiRegisControllers', function($scope) {

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

})

;
