angular.module('miral.beauti.top.controllers', [])

.controller('beautiTopCtrl', function($scope,$window, $state, $timeout, $ionicSideMenuDelegate) {

	console.log('Start TopCtrl');


	var win = angular.element($window);

	angular.element("#topMyNavi").css("top",win.height()-140).css("left",10);

	$scope.timestamp = new Date().getTime();

	$scope.$watch(function () {
	    return $ionicSideMenuDelegate.isOpenLeft();
	  },
	     function (isOpen) {
	    if (isOpen){
			$ionicSideMenuDelegate.canDragContent(true);
			angular.element("#topMyNavi").addClass("hideDom");
	    }else{
	    	$ionicSideMenuDelegate.canDragContent(false);
			angular.element("#topMyNavi").removeClass("hideDom");
	    }

	  });
	//domは都度とるのではなく、一度だけ(Android Naitiveでもおなじようなことを言っている）
	var searchTextBoxBase = angular.element("#topSearchTextBoxBase");
	var searchTextBox = angular.element("#topSearchTextBox");

	searchTextBox.css("top", searchTextBoxBase.position().top);
	searchTextBox.css("left", searchTextBoxBase.position().left);

	$scope.showMyNavi = function(){
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.scrollFnc = function(elemet){

		var pos = searchTextBoxBase.position();
		if(pos.top < 0){
			searchTextBox.addClass("fixed");
			searchTextBox.css("top", "");
			searchTextBox.css("left", "");
		}else{
			searchTextBox.css("top", searchTextBoxBase.position().top);
			searchTextBox.css("left", searchTextBoxBase.position().left);
			searchTextBox.removeClass("fixed");
		}
	};

	$scope.search = {
		word:""
	};

	$scope.search = function(){
		console.log($state.$current);

		var transition = $timeout(function(){
			$state.go('top.salon-search',null,'');
		});
	};

})
;
