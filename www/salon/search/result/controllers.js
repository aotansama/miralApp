angular.module('miral.salon.search.result.controllers', ['miral.salon.search.result.services'])

.controller('salonSearchResultControllers', function($scope, $stateParams, salonSearchResultServices) {


	console.log('Start salonSearchResultControllers');

	$scope.salons = salonSearchResultServices.getResult();


})

;
