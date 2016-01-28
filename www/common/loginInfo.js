angular.module('mirroru.loginInfo', [])

.constant('userInfoConstVal',{
	type:{SALON:1, BEAUTI:2}
})

.factory('loginInfo', function(userInfoConstVal) {

	//test
	var loginInfo = null;

	return {
		setSession:function(userId_, userType_){
			loginInfo = {
				userId:userId_,
				userType:userType_
			};

		},

		get:function(){

			loginInfo = {
					userId:1,
					userType:userInfoConstVal.type.BEAUTI
			};

			return loginInfo;
		}
	};
})
;


