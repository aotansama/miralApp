angular.module('miral.common.calendar1.services', [])

.constant('calendar1DayInfoHanderConstVal',{
	dayState:{NONE:0,NG:1,WARNING:2,OK:3},
	dayScheduleBoxHeight:40
})


.factory('calendar1Service', function(calendar1DayInfoHanderConstVal) {
'use strict';
	return {

		dayInfoList:null,

		constVal:calendar1DayInfoHanderConstVal,


	    //////////////////////////////////////////////////////////////////////////////////
	    ///
		setDayStyle:function(dayInfo){


			//ng-classは使わないこと、遅い！！！！！！！！！！

			dayInfo.dayStyle='';

			if(dayInfo.disabled){
				dayInfo.dayStyle="calendar1-month-disabled";
			}else{

				if(dayInfo.selected){
					dayInfo.dayStyle="calendar1-month-selected";

				}else{

					if(dayInfo.weekNum==0){
						dayInfo.dayStyle="calendar1-month-holiday";
					}else if(dayInfo.weekNum==6){
						dayInfo.dayStyle="calendar1-month-saturday";
					}

				}
			}

			switch(dayInfo.state){
			case calendar1Service.constVal.dayState.NG:
				dayInfo.dayStyle+=' calendar1-month-day-ng';
				break;
			case calendar1Service.constVal.dayState.WARNING:
				dayInfo.dayStyle+=' calendar1-month-day-warning';
				break;
			case calendar1Service.constVal.dayState.OK:
				dayInfo.dayStyle+=' calendar1-month-day-ok';
				break;
			}


		},

		setDaySate:function(dayInfo, state){
			dayInfo.state = state;

			switch(dayInfo.state){
			case calendar1Service.constVal.dayState.NONE:
				dayInfo.stateStyle = "daymark";
				break;
			case calendar1Service.constVal.dayState.NG:
				dayInfo.stateStyle = "daymark ion-close-round";
				break;
			case calendar1Service.constVal.dayState.WARNING:
				dayInfo.stateStyle = "daymark material-icons material-icons_change_history";
				break;
			case calendar1Service.constVal.dayState.OK:
				dayInfo.stateStyle = "daymark ion-android-radio-button-off";
		    	break;
		    default:
		    	dayInfo.stateStyle = "";
			}


	    },



		createDayInfo:function(date_){

			var dayInfo = new Object();

			dayInfo.date =  date_.toString('yyyyMMdd');
			dayInfo.day = date_.toString('d');
			dayInfo.weekNum = date_.getDay();
			dayInfo.disabled = false;
			dayInfo.selected = false;
			this.setDaySate(dayInfo, this.constVal.dayState.NONE);


			return dayInfo;
		},

        createTimeTable:function(sTime_, eTime_, step_){
        	var times = new Array();
        	var hourMap = {};

        	var hm= timeCutter(sTime_);
            h = hm.h;
            m = hm.m;


        	while((h*100)+m < eTime_){


        		var time = this.createTimeInfo(h,m);
        		times.push(time);

        		if(m==0){
        			if(!angular.isDefined(hourMap[time.hour])){


        				var hour = this.createHourMap();

        				hourMap[time.hour] = hour;
        			}
        		}
        		hourMap[time.hour].minutes.push(time);


        		m+=step_;

        		if(m>=60){
        			h++;
        			m=0;
        		}

        	}

        	return {hourMap:hourMap,times:times};
        },


		createHourMap:function(){
			var hour = Object();
			hour.minutes = new Array();
			hour.disabled=false;
			hour.selected=false;
			hour.blank=true;

			return hour;

		},

	    createTimeInfo:function(h,m){
	    	var time = Object();

	    	time.hour = h;
	    	time.minute = m;
	    	time.time = math.chain(h).multiply(100).add(m).done();
	    	time.disabled=false;
	    	time.selected=false;
	    	time.blank=true;
	    	time.scheduleInfo = null;

	    	return time;

	    },

	    indexOfTimeTableByTime:function(timeTable_, time_){

	    	var s=0;
	    	var e=timeTable_.length;
	    	while(1){
		    	var p= s + math.round((e-s) / 2);

		    	if(time_ == timeTable_[p].time){
		    		return p;
		    	}else if(time_ < timeTable_[p].time){
		    		e = p-1;
		    	}else{
		    		s=p+1;
		    	}

		    	if(p<0 || p>timeTable_[p].length){
		    		return -1;
		    	}
	    	};

	    },

	    getTimeTableByTime:function(timeTable_, time_){
	    	var i = indexOfTimeTableByTime(timeTable_, time_);

	    	if(i==-1){
	    		return  null;

	    	}

	    	return timeTable_[i];
	    },


		attachSchedule2Timetable:function(timeInfo_, schedule_, timeStep_, eachColor_){

			eachColor_ = eachColor_ || false;

			for(var i=0; i<schedule_.length; i++){
				var sch = schedule_[i];

				var t_i = this.indexOfTimeTableByTime(timeInfo_.times, sch.sTime);
				var time  = timeInfo_.times[t_i];

				time.scheduleInfo = sch;


				//開始から時間分のタイムテーブルを有
				//例) 10:00～11:30の場合、10:00,10:30,11:00を有にする
				var schMinuteCnt = math.round(sch.minutes/timeStep_);

				for(var j=schMinuteCnt; j>=1; j--){

					if(timeInfo_.times.length <= t_i){
						break;
					}

					timeInfo_.times[t_i].blank = false;

					var hm = timeCutter(sch.sTime);
					timeInfo_.hourMap[hm.h].blank = false;

					t_i++;
				}

			}


		}
	};
})

;


