
//This document handle the time in relation to hours


//this extract the time from date time
//and only shows the time
export function formatAMPM(date) {

  var date = new Date(date)	
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm
 
  return strTime;

}

//converrt 24To 12 Format, just for display
export function convertTo12(time) {
	time = time.slice(0, -3)
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }

  var lastValue = time.join (''); // return adjusted time or original string

  console.log(`lastValue`, lastValue); 
  
  return lastValue;
}



export function getTimeDiff(date1, date2){ //console.log('getTimeDiff',date1, date2)
	
	var start
	var end  	
	var inFuture

	if (date2 === undefined){

		if( new Date() > date1 ){
			 start = new Date(date1)
			 end   = new Date()

		}else{
			 end   = new Date(date1)
			 start = new Date()
		}	

	} else {

		if( date1 > date2 ){
			 start = new Date(date1)
			 end   = new Date(date2)
		}else{
			 end   = new Date(date1)
			 start = new Date(date2)
		}	

	}/*else*/


	const diffMs = (  end - start ) // milliseconds 
	const hour = ((diffMs/60000)/60).toFixed(1)
	const min  = Math.abs(diffMs/ 60000).toFixed(1)
	const seg  = getTime(diffMs).seg


	//is the time comparation in the past?
	diffMs < 0 ? inFuture = false : inFuture = true
	
	return { hour: parseInt(hour), min: parseInt(min), seg: seg, days:parseInt(hour)/24, inFuture: inFuture}

}/*getTimeDiff*/


export function sameDateTimeDiff(time1, time2){ //console.log('getTimeDiff',date1, date2)
	
const now = new Date()
const nowDateTime = now.toISOString();
const nowDate = nowDateTime.split('T')[0]
const start   = new Date(nowDate + 'T' + time1);
const end     = new Date(nowDate + 'T' + time2);


	const diffMs = (  end - start ) // milliseconds 
	const hour = ((diffMs/60000)/60).toFixed(1)
	const min  = Math.abs(diffMs/ 60000).toFixed(1)
	const seg  = getTime(diffMs).seg


	return { hour: parseInt(hour), min: parseInt(min), seg: seg }

}/*getTimeDiff*/

//just works for one day after other day, mon>11pm>tuesday>3am = 4h
export function diferentDateTimeDiff(time1, time2){ //console.log('getTimeDiff',date1, date2)
	
    const now         = new Date()
    const nowDateTime = now.toISOString();
    const nowDate     = nowDateTime.split('T')[0]
    
    const endDay      = new Date(nowDate + 'T' + '23:59:59')
    const beginingDay = new Date(nowDate + 'T' + '00:00:00')

    const start_time  = new Date(nowDate + 'T' + time1)
    const end_time    = new Date(nowDate + 'T' + time2)


    const diffMs_start = (  endDay - start_time   ) // milliseconds 
    const hour = ((diffMs_start/60000)/60).toFixed(1)
    const min  = Math.abs(diffMs_start/ 60000).toFixed(1)

    const diffMs_end = (  end_time - beginingDay   ) // milliseconds 
    const hour2 = ((diffMs_end/60000)/60).toFixed(1)
    const min2  = Math.abs(diffMs_end/ 60000).toFixed(1)


    const totalHour = parseInt(hour) + parseInt(hour2)
    const totalMin  = parseInt(min)  + parseInt(min2)

    return { hour: totalHour,  min: totalMin }



}/*getTimeDiff*/



function getTime(dataTime){

	const time = new Date(dataTime)
	return{hour: minTwoDigits(time.getHours()), min: minTwoDigits(time.getMinutes()), seg: minTwoDigits(time.getSeconds())}

}



export function totalHour(start, end){

	var start = new Date(start)
	var end   = new Date(end)

	var diffHrs = (end - start)
	return ((diffHrs % 86400000) / 3600000).toFixed(1); // hours
}


export function convertHourMin(time) {

	//to indicate when the time is negative
	//when the user is over wokring
	var symbol =''
	if( time < 0) { symbol ='-' } 

	var hours = (Math.abs(time) / 60);
	var rhours = Math.floor(hours);
	var minutes = (hours - rhours) * 60;
	var rminutes = Math.round(minutes);
	
	return {symbol: symbol, hour: minTwoDigits(rhours), min:minTwoDigits(rminutes) }
}



export function minTwoDigits(n) {
  const num =  (n < 10 ? '0' : '') + n
  //console.log (num.slice(-2) )

  return (num.slice(-2) )

}


//use to generate the time indicador bar
export function covertDatePercent(date){

	var newDate   = new Date(date);	
	return  ( (newDate.getHours() * 100)/24 ).toFixed(0)

}


export function timePer(timeToWork, timeWorked){
	var per =  ((timeWorked*100)/timeToWork).toFixed(1)
	if (per > 100) {per =100}
	
	return per
}


export function actualDateTimeForDB(){
	return `${convertDateToDB()} ${convertDateToTime()}`
}


export function convertDateToDB(data){ //console.log('convertDateToInput>')

	var now 
	if(data === undefined){
		 now = new Date()
	}else{  now = new Date(data) }

	const day   = ("0" + now.getDate()).slice(-2)
	const month = ("0" + (now.getMonth() + 1)).slice(-2)
	const today = now.getFullYear()+"/"+(month)+"/"+(day) 


	return today

}

//this is use for set the a input value
export function convertDateToTime(data){
	var time 
	if(data === undefined){ time = new Date() }
	else                  { time = new Date(data) }
	return `${minTwoDigits(time.getHours())}:${minTwoDigits(time.getMinutes())}:${minTwoDigits(time.getSeconds())}`
}

export function convertDateToInput(data){ //console.log('convertDateToInput>')

	var now 
	if(data === undefined){
		 now = new Date()
	}else{  now = new Date(data) }

	const day   = ("0" + now.getDate()).slice(-2)
	const month = ("0" + (now.getMonth() + 1)).slice(-2)
	const today = now.getFullYear()+"-"+(month)+"-"+(day) 


	return today

}


export function getTimeToInput(data){

	var time 

	if(data === undefined){
		 time = new Date()
	}else{  time = new Date(data) }


	return `${minTwoDigits(time.getHours())}:${minTwoDigits(time.getMinutes())}`

}