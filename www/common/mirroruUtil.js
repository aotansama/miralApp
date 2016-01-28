function utilIsDataType(type, obj){
	var clas = Object.prototype.toString.call(obj).slice(8, -1);
	return obj !== undefined && obj !== null && clas === type;
}

function timeCutter(time){

	if(!utilIsDataType('String', time)){
		time = new String(time);
	}

	if(time.length<2){
		h="0";
		m=time;
    }else{
    	if(time.length==3){
    		h = time.substring(0,1);
    	}else{
    		h = time.substring(0,2);
    	}
    	m= time.substring(3);

    }

	return {h:Number(h), m:Number(m)};

}