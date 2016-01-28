angular.module('miral.salon.search.result.services', [])

.factory('salonSearchResultServices', function() {

	  // Some fake testing data
	  var SalonSearchResultList = [{
		    slId: '1',
		    slNm: 'BABEL　- バベル -',
		    trNm:'恵比寿駅 10分',
		    rfHT:'5,000',
		    rf1D:'12,000',
		    rf2D:'10,000',
		    rating:2,
		    slImg: 'img/salon/1/top.jpg'
	  }
	  ,{
		    slId: '2',
		    slNm: 'BABEL　- バベル -',
		    trNm:'恵比寿駅 10分',
		    rfHT:'5,000',
		    rf1D:'12,000',
		    rf2D:'10,000',
		    rating:3,
		    slImg: 'img/salon/1/top.jpg'
	  }
	  ,{
		    slId: '3',
		    slNm: 'BABEL　- バベル -',
		    trNm:'恵比寿駅 10分',
		    rfHT:'5,000',
		    rf1D:'12,000',
		    rf2D:'10,000',
		    rating:3,
		    slImg: 'img/salon/1/top.jpg'
	  }
	  ,{
		    slId: '4',
		    slNm: 'BABEL　- バベル -',
		    trNm:'恵比寿駅 10分',
		    rfHT:'5,000',
		    rf1D:'12,000',
		    rf2D:'10,000',
		    rating:3,
		    slImg: 'img/salon/1/top.jpg'
	  }
	  ];


	  return {
	    getResult: function() {
	      return SalonSearchResultList;
	    }
	  };
})

;


