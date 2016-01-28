angular.module('miral.salon.search.result.controllers', ['miral.salon.search.result.services'])

.controller('salonSearchResultControllers-init', function($scope, $stateParams, salonSearchResultServices) {


	console.log('Start salonSearchResultControllers-init');

	$scope.salons = salonSearchResultServices.getResult();


})

;
