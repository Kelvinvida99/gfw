export function getTimeDiff(date1, date2){ console.log('getTimeDiff',date1, date2)
	
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

	//is the time comparation in the past?
	diffMs < 0 ? inFuture = false : inFuture = true
	
	return { hour: parseInt(hour), min: parseInt(min), inFuture: inFuture}

}/*getTimeDiff*/


export function getTime(dataTime){

	const time = new Date(dataTime)
	return `${minTwoDigits(time.getHours())}:${minTwoDigits(time.getMinutes())}:${minTwoDigits(time.getSeconds())}`

}



//compare two dates, no time
export function areDateSame(date1, date2){
	
	if (date2 === undefined){
		var a   = new Date();
		var b   = new Date(date1);		
	} else {
		var a   = new Date(date1);
		var b   = new Date(date2);	
	}

	if( 
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() 	=== b.getMonth()    &&
		a.getDay() 		=== b.getDay()           ) 

		{return true}
	else{ return false }
	

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


//console.log('actualDateTimeForDB>>>>>>>>>>>>>>', actualDateTimeForDB())

export function actualDateTimeForDB(){
	return `${convertDateToDB()} ${convertDateToTime()}`
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

export function taksPer(tasksCompleted, task){
	return ((tasksCompleted*100)/task).toFixed(0)
}



/**/
////////////export function for card info
////////////export function for card info
////////////export function for card info
////////////export function for card info
////////////export function for card info


export function getFulldate(date){

	var  date = new Date(date)
	const fullDate = ` ${getDayWeek(date, 'short')}  ${getDayNum(date)},  ${getMonthName(date)}  ${date.getFullYear() }`
	
	return  fullDate 

}

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

//this only works with time
export function from24to12(time) {//console.log('from24to12###########')

  time = time.split(':')	
  var hours   = parseInt(time[0])
  var minutes = parseInt(time[1])
  console.log('hours', hours, 'minutes', minutes)

  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm
 
  return strTime;

}

/********************************/
/********************************/





/********************************/
/********************************/



export function getMonthName(date) {
   var date = new Date(date);	
   const month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
   return month[date.getMonth()];
}


export function getDayNum(date) {
   var date = new Date(date);	
   return date.getDate();

}

export function totalHour(start, end){

	var start = new Date(start)
	var end   = new Date(end)

	var diffHrs = (end - start)
	return ((diffHrs % 86400000) / 3600000).toFixed(1); // hours
}



export function isWeekDay(data){
  	if (date === undefined) {  var date = new Date() }
  	else { var date       =  new Date( date )  }

  	const dayNum = date.getDay()
  	if(dayNum === 0 || dayNum===6 ){ return false}
  	else						   { return true}
}



//giveme the date of the week of today

export function getDayWeek(date, type) { //console.log('getDayWeek>>>>>>>> 8 ',   )
	 
var date 
	//don't get a date, select the today day
  	if (date === undefined) {   date = new Date() }
  	else                    {   date       =  new Date( date )  }
  
	const days 		= [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ]
	const daysShort = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
	const long 		= [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

	//console.log('date', date,)

	if( type === undefined ){  return days[date.getDay()] }
 	if( type === 'short' )  {  return daysShort[date.getDay()] }
  	if( type === 'long' )   {  return long[date.getDay()] }
 

}

//giveme the date of the week of today
//we did thiss export function, to don't overRight getDayWeek, becasue that one is use
//for many other export function, IOS don't allows undefined
export function getDayWeekIOSDELETETHIS(date, type) { //console.log('getDayWeekIOS>', date  )
	 
	var date

	//don't get a date, select the today day
  	if (date === false) {   date = new Date() }
  	else {                  date = new Date( date.replace(' ', 'T') )  }
  
	const days 		= [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ]
	const daysShort = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
	const long 		= [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

	const dayNum =  date.getDay()
	///console.log('datex', date, dayNum, days[dayNum] )

	if( type === false )    {  return days[dayNum] }
 	if( type === 'short' )  {  return daysShort[dayNum] }
  	if( type === 'long' )   {  return long[dayNum] }
 

}


//////////Animate the live clock

//////////Animate the live clock
