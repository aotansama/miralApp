// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('miral', ['ionic','ngAnimate', 'ionicLazyLoad', 'ionic.rating'
                         ,'miral.beauti.top.controllers'
                         ,'miral.salon.search.result.controllers'
                         ,'miral.salon.detail.controllers'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  ///////////////////////////////////////////////////////
  //カテゴリ：美容師

  //TOP画面
  .state('beauti-top', {
	    url: '/beauti/top',
	    templateUrl: 'beauti/top/top.html',
	    controller: 'beautiTopCtrl-init'
	  })

  //登録画面
  .state('beauti-regist', {
	    url: '/beauti/regist',
	    templateUrl: 'beauti/regist/main.html',
	    controller: 'beautiTopCtrl-init'
	  })

  ///////////////////////////////////////////////////////
  //カテゴリ：サロン

  //サロン検索結果
  .state('salon-search-result', {
	    url: '/salon/search/result',
	    templateUrl: 'salon/search/result/search-result.html',
	    controller: 'salonSearchResultControllers-init'
  })

  //サロン詳細情報
  .state('salon-detail', {
	    url: '/salon/detail/:slId',
	    templateUrl: 'salon/detail/detail.html',
	    controller: 'salonDetailControllers-init'
  })

  ;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/beauti/top');

})
.directive("scrollView", function($window){
	return	{
		link:function(scope,elemet, attrs){

		var scrollEvent;


		scope.$watch(attrs.scrollEvent, function(value) {
			scrollEvent = value;
			 console.log('set scrollEvent');
		});


		angular.element(elemet).bind("scroll ", function(){
			scrollEvent(elemet);
		});
		}
	};
})
;

