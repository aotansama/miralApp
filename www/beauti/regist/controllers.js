angular.module('mirroru.beauti.regist.controllers', [])


.controller('beautiRegisControllers-init', function($scope) {

	$scope.timestamp = new Date().getTime();

	$scope.timestamp = new Date().getTime();
	$scope.isShowAccess = false;
	$scope.isShowMap = false;
	$scope.map = null;

	$scope.salon = salonDetailServices.get($stateParams.slId);

	$ionicSlideBoxDelegate.update();


	$scope.showAccess = function(){
		$scope.isShowAccess = !$scope.isShowAccess;
	};



	$scope.showMap = function(lat, lng){
		$scope.isShowMap = !$scope.isShowMap;

		if($scope.isShowMap && $scope.map==null){

			// google map
		      var myLatlng = new google.maps.LatLng(lat, lng);

		      var mapOptions = {
		    		  	center: myLatlng,
		    		  	zoom: 16,
		    		  	mapTypeId: google.maps.MapTypeId.ROADMAP,
					    mapTypeControl: false,
					    scaleControl: false,
					    streetViewControl: false,
					    rotateControl: false
		      };

		      $scope.map = new google.maps.Map(document.getElementById("slonDetailMap"), mapOptions);

		      var myLocation = new google.maps.Marker({
		    	  	position:myLatlng,
		    	  	map: $scope.map

		      });



		}

	};




})

;
