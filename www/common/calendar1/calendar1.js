

angular.module('miral.common.calendar1', ['miral.common.calendar1.services'])

.constant('config',{
    calendarMode: 'month',
	disableNotshow:false,
	monthViewCfg :{
       viewMode:'viewer', //viewer,chooser,selecter
	   monthCount:'3'
    },
	dayViewCfg: {
        viewMode:'viewer', //viewer,chooser,selecter
		startTime:0000,
		endTime:2400,
		step:30 //15,30,60
	}

})



.controller('miral.common.calendar1Ctrl', function($scope,$attrs,$log,$ionicSlideBoxDelegate,calendar1Service,config) {

'use strict';

	console.log('miral.common.calendar1Ctrl');


	var self = this;

	var ngModelCtrl = angular.noop;

	self.selectedDay = null;






	///////////////////////////////////////////////////
	//
	self.init=function(ngModelCtrl_){

		$scope.calendarMode = $scope.calendarMode || config['calendarMode'];
		$scope.dayviewCfg = $scope.dayviewCfg || config['dayViewCfg'];
		$scope.monthviewCfg = $scope.monthviewCfg || config['monthViewCfg'];

        if (ngModelCtrl_) {
        	ngModelCtrl = ngModelCtrl_;

        	ngModelCtrl.$render = function() {
				self.render();
			};
		}


	};

	self.render=function(){
		if(ngModelCtrl.$modelValue){
			$scope.selectedDay =ngModelCtrl.$modelValue;
			$scope.selectedDay.selected = true;
		}

		self.refreshView();
	};


	self.refreshView=function(){
	};


	self.setSelectedDay=function(dayInfo){

		if(self.selectedDay){
			self.selectedDay.selected = false;
			self._setDayStyle(self.selectedDay);

		}

		self.selectedDay = dayInfo;

		if(self.selectedDay){
			self.selectedDay.selected = true;
			self._setDayStyle(self.selectedDay);
		}

		if(ngModelCtrl.$setViewValue){
			ngModelCtrl.$setViewValue(self.selectedDay);
		}


	};

	self.selectChanged=function(dayInfo){


		if($scope.monthviewCfg.daySelectedFnc){
			$scope.monthviewCfg.daySelectedFnc(dayInfo);
		}

		if(dayInfo!=null){
			if($scope.dayviewCfg.dayScheduleLoadFnc){
				$scope.dayScheduleData = $scope.dayviewCfg.dayScheduleLoadFnc(dayInfo);
			}

		}


	};

	self.backPrevView=function(){

		self.setSelectedDay(null);
		self.selectChanged(null);


		$scope.calendarMode=self.prevView;
	};

	self.gotoDayView=function(){
		self.prevView = $scope.calendarMode;

		if($scope.monthviewCfg.viewMode=='selecter'){
			$scope.calendarMode='day';
		}

	};

	$scope.onSlideChange=function($index){


		if(!$scope.monthList[$index].eventLoaded){

			calendar1Service.setDayInfo($scope.monthList);
			//self._onSlideChange($scope.monthList[$index].month,calendar1DayInfoHander);
			//$scope.monthList[$index].eventLoaded = true;
		}

	};



})

/////////////////////////////////////////////////////////////////////////////
//
//
//
.directive('calendar1', function () {
    'use strict';
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'common/calendar1/templates/calendar1.html',
        scope: {
            calendarMode: '=',
            dayviewCfg: '=',
            monthviewCfg: '=',
        },
        require: ['calendar1', '?^ngModel'],
        controller: 'miral.common.calendar1Ctrl',
        link: function (scope, element, attrs, ctrls) {
            var calendarCtrl = ctrls[0], ngModelCtrl = ctrls[1];

            calendarCtrl.init(ngModelCtrl);

            /*
            scope.$on('eventSourceChanged', function (event, value) {
                calendarCtrl.onEventSourceChanged(value);
            });
			*/

        }
    };
})

/////////////////////////////////////////////////////////////////
//
.directive('monthview', function ($ionicSlideBoxDelegate,calendar1Service) {
'use strict';

        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'common/calendar1/templates/month.html',
            scope: {
            },
            require: ['^calendar1', '?^ngModel'],
            link: function (scope, element, attrs, ctrls) {
                var calendarCtrl = ctrls[0];

                scope.viewMode=scope.$parent.monthviewCfg.viewMode;
                scope.monthCount = new Array();
                for(var m=0; m<scope.$parent.monthviewCfg.monthCount; m++){
                	scope.monthCount.push(m);
                }


                ////////////////////////////////////////////////////////
                //
                function createViewData(idx_){

                	var today = Date.today().toString("yyyyMMdd");
            		var firstDay  = Date.today().moveToFirstDayOfMonth();

            		if(idx_ > 0){
            			firstDay.addMonths(idx_);
            		}

            		var lastDay = firstDay.clone().moveToLastDayOfMonth().toString("yyyyMMdd");

        			var monthInfo = new Object;

        			monthInfo.title =  firstDay.toString('yyyy年 MM月');
        			monthInfo.month =  firstDay.toString('yyyyMM');
        			monthInfo.eventLoaded = false;

        			monthInfo.weeks = [];


        			if(firstDay.getDay()!=0){
        				firstDay.addDays(-1*firstDay.getDay());
        			}

        			var weekInfo = null;

        			for(var d=0; d< 42; d++){

        				var dayInfo = new Object();

    					dayInfo.date =  firstDay.toString('yyyyMMdd');
    					dayInfo.day = firstDay.toString('d');
    					dayInfo.weekNum = firstDay.getDay();
    					dayInfo.disabled = false;
    					dayInfo.selected = false;
    					dayInfo.state = calendarCtrl._setDaySate(dayInfo, calendar1Service.constVal.dayState.NONE);

        				if(monthInfo.month != dayInfo.date.substring(0,6) || lastDay < dayInfo.date){
        					dayInfo.disabled = true;
        				}

        				calendarCtrl._setDayStyle(dayInfo);

        				if(d==0 || dayInfo.weekNum == 0){
        					weekInfo = new Object();
        					weekInfo.days = new Array();
        					monthInfo.weeks.push(weekInfo);
        				}

        				weekInfo.days.push(dayInfo);



        				firstDay.addDays(1);
        			}





        			return monthInfo;

            	};



            	scope.test=function(i){
            		console.log('★test'+i);

            	};

				scope.onSlideChange=function(idx_){


					if(!scope.monthList[idx_]){
						scope.monthList.push(createViewData(idx_));
					}

					if(scope.monthEventLoad){
						//scope.monthEventLoad({month:monthVal,'calendar1DayInfoHander':calendar1DayInfoHander});
					}
				};



				///////////////////////////////////////////////////
				//

				scope._onSelectedChange=function(dayInfo){

					if(scope.viewMode=='viewer' || (scope.viewMode=='chooser' && dayInfo.state==calendar1Service.constVal.dayState.NG) || dayInfo.disabled){
						return;
					}

					calendarCtrl.setSelectedDay(dayInfo);

					calendarCtrl.selectChanged(dayInfo);

					calendarCtrl.gotoDayView();


				};

				scope._prevSlide = function(){
					$ionicSlideBoxDelegate.previous();
				};

				scope._nextSlide = function(){
					$ionicSlideBoxDelegate.next();
				};



				////////////////////////////////////
				//当月分だけ作成
				scope.monthList = new Array();
				scope.monthList.push(createViewData(0));

			}
        };


})

/////////////////////////////////////////////////////////////////
//
.directive('dayview', function (calendar1Service) {
'use strict';

	return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'common/calendar1/templates/day30.html',
            scope: {
            },
            require: ['^calendar1', '?^ngModel'],
            link: function (scope, element, attrs, ctrls) {

            	scope.viewMode=scope.$parent.dayviewCfg.viewMode;

            	var calendarCtrl = ctrls[0];

                function createViewData(){

                	var timeTable = calendar1Service.createTimeTable(scope.$parent.dayviewCfg.startTime,scope.$parent.dayviewCfg.endTime
                													,scope.$parent.dayviewCfg.step);




    				calendar1Service.attachSchedule2Timetable(timeTable, scope.$parent.dayScheduleData
    							, scope.$parent.dayviewCfg.step, false);


                	//set Style
                	for(h in timeTable.hourMap){
                		setHourBoxStyle(timeTable.hourMap[h]);
                		setHourChooerStyle(timeTable.hourMap[h]);
                		setIsShowHourChooer(timeTable.hourMap[h]);
                	}

                	for(var m=0; m<timeTable.times.length; m++){
                		setIsShowMinuteChooer(timeTable.times[m]);
                		setMinuteBoxStyle(timeTable.times[m]);
                		setMinuteChooerStyle(timeTable.times[m]);
                		setScheduleBoxStyle(timeTable.times[m]);
                	}

    				return {
    						times:timeTable.times,
    						hourMap:timeTable.hourMap,
    						selectedMinuts:0
    				};


                }

                scope.viewMode=scope.$parent.dayviewCfg.viewMode;

                scope.title = calendarCtrl.selectedDay.date.substr(0, 4)+"年 "
                				+calendarCtrl.selectedDay.date.substr(4, 2)+"月 "
								+calendarCtrl.selectedDay.date.substr(6,2)+"日";


                scope._backPrevView=function(){
                	calendarCtrl.backPrevView();
                };

				scope._onSelectedChange=function(dayInfo){


				};

				function setIsShowHourChooer(hour){

					hour.isShowHourChooer = true;

					if(hour.disabled || !scope.viewMode=='chooser' || !hour.blank){
						hour.isShowHourChooer = false;
					}
				};


				function setHourBoxStyle(hour){

					hour.hourBoxStyle ='calendar1-day-hour-box';

					if(hour.selected){
						hour.hourBoxStyle += ' calendar1-day-time-selected';
					}
				};

				function setHourChooerStyle(hour){

					hour.hourChooerStyle="";

					if(hour.disabled || !scope.viewMode=='chooser'){
						return;
					}

					hour.hourChooerStyle = 'calendar1-day-hour-chooser button-icon icon';

					if(hour.selected){
						hour.hourChooerStyle += ' ion-android-remove-circle calendar1-day-chooser-remove';
					}else{
						hour.hourChooerStyle += ' ion-android-add-circle calendar1-day-chooser-add';
					}
				};


				function setIsShowMinuteChooer(time){

					time.isShowMinuteChooer = true;

					if(time.disabled || !scope.viewMode=='chooser' || !time.blank){
						time.isShowMinuteChooer = false;
					}

				};

				function setMinuteBoxStyle(time){


					time.minuteBoxStyle='calendar1-day-minute-box';

					if(time.selected){
						time.minuteBoxStyle+=' calendar1-day-time-selected';
					}
				};

				function setMinuteChooerStyle(time){

					time.minuteChooerStyle="";

					if(time.disabled || !scope.viewMode=='chooser'){
						return;
					}

					time.minuteChooerStyle = 'calendar1-day-minute-chooser button-icon icon';

					if(time.selected){
						time.minuteChooerStyle += ' ion-android-remove-circle calendar1-day-chooser-remove';
					}else{
						time.minuteChooerStyle += ' ion-android-add-circle calendar1-day-chooser-add';
					}

				};

				function setScheduleBoxStyle(time){


					time.scheduleBoxStyle="";

					if(time.selected){
						time.scheduleBoxStyle +='calendar1-day-time-selected';
					}

					if(time.scheduleInfo==null){
						time.scheduleBoxStyle+=' calendar1-day-schedule-height-30-30';
						return;
					}

					time.scheduleBoxStyle +=' calendar1-day-schedule-height-30-'+time.scheduleInfo.minutes;


					switch(time.scheduleInfo.colorNo){
						case -1:time.scheduleBoxStyle +=' calendar1-day-schedule-color-glay';break;
						case 1:time.scheduleBoxStyle  +=' calendar1-day-schedule-color-1';break;
						case 2:time.scheduleBoxStyle  +=' calendar1-day-schedule-color-2';break;
						case 3:time.scheduleBoxStyle  +=' calendar1-day-schedule-color-3';break;
						case 4:time.scheduleBoxStyle  +=' calendar1-day-schedule-color-4';break;
					}

				};


				//////////////////////////////////////////////////////
				//

				scope._onMinuteChoose = function(time){



					//選択時連続性チェック
					if(scope.timeInfo.selectedMinuts!=0 && !time.selected){
						//一つ前後が選択されていなければ選択不可
						var t_i = calendar1Service.indexOfTimeTableByTime(scope.timeInfo.times,time.time);
						if((t_i-1>=0 && scope.timeInfo.times[t_i-1].selected)
								|| (t_i+1 < scope.timeInfo.times.length && scope.timeInfo.times[t_i+1].selected)){
							//OK
						}else{
							if(!scope.timeInfo.times[t_i-1].selected){
								console.log('★連続性エラー');
								return;
							}
						}
					}

					time.selected = !time.selected;

					//選択済みの累計時間（分）
					if(time.selected){
						scope.timeInfo.selectedMinuts = math.add(scope.timeInfo.selectedMinuts
															,scope.$parent.dayviewCfg.step);
					}else{
						scope.timeInfo.selectedMinuts = math.subtract(scope.timeInfo.selectedMinuts
								,scope.$parent.dayviewCfg.step);

					}

					var selected = true;
					var hour = scope.timeInfo.hourMap[time.hour];

					for(var i=0; i<hour.minutes.length; i++){
						if(!hour.minutes[i].selected){
							selected = false;
							break;
						}
					}

					hour.selected = selected;

					//set Style
            		setHourBoxStyle(hour);
            		setHourChooerStyle(hour);
            		setIsShowHourChooer(hour);
            		setIsShowMinuteChooer(time);
            		setMinuteBoxStyle(time);
            		setMinuteChooerStyle(time);
            		setScheduleBoxStyle(time);


					if(scope.$parent.dayviewCfg.timeSelectedFnc){
						scope.$parent.dayviewCfg.timeSelectedFnc(scope.timeInfo);
					}


				};

				//////////////////////////////////////////////////////
				//
				scope.timeInfo=createViewData();

			}
        };


})

;
