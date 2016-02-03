angular.module('miral.beauti.mypage.controllers', [])

.controller('beautiMypageControllers', function($scope, $state) {


	  $scope.myGoBack = function() {
		    $ionicHistory.goBack();
		  };

})

;
