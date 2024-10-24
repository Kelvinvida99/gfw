




export function getFulldate(date){

	if(date === '0000-00-00'){return '0000-00-00'}
		
	var  date = new Date(date)
	const fullDate = ` ${getDayWeek(date, 'short')}  ${getDayNum(date)},  ${getMonthName(date)}  ${date.getFullYear(date) }`
	
	return  fullDate 

}

export function getFulldateObj(date){

	if(date === '0000-00-00'){return '0000-00-00'}
		
	var  date = new Date(date)
	const fullDate = ` ${getDayWeek(date, 'short')}  ${getDayNum(date)},  ${getMonthName(date)}  ${date.getFullYear(date) }`
	
	return  {day: getDayWeek(date, 'short'), dayNum: getDayNum(date), month:getMonthName(date), year:date.getFullYear(date)  }

}

export function getDOB(date){

	if(date === '0000-00-00'){return '0000-00-00'}
		
	var  date = new Date(date)
	
	const fullDate = ` ${getDayNum(date)},  ${getMonthName(date)}  ${date.getFullYear() }`
	
	return  fullDate  

}

export function getAge(dateString) {// console.log('dateString', dateString)
	
	try{
    var diff_ms = Date.now() - new Date(dateString);
    var age_dt = new Date(diff_ms); 
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);
    return age

	}catch(error){ console.log('error calculing age', age) }

  
     
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

export function getDayNum(date) {
   var date = new Date(date);	
   return date.getDate();

}

export function getMonthName(date) {
   var date = new Date(date);	
   const month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
   return month[date.getMonth()];
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

export function convertTimeToInput(time) {
    var now;
    if (time === undefined) {
        now = new Date();
    } else {
        now = new Date();
        const [hours, minutes, seconds] = time.split(':').map(Number);
        now.setHours(hours, minutes, seconds || 0);
    }

    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);

    const formattedTime = `${hours}:${minutes}`; 

    return formattedTime;
}


export function isWeekDay(data){
  	if (date === undefined) {  var date = new Date() }
  	else { var date       =  new Date( date )  }

  	const dayNum = date.getDay()
  	if(dayNum === 0 || dayNum===6 ){ return false}
  	else						   { return true}
}





//giveme the date of the week of today
export function getDayWeekList( type) { //console.log('getDayWeek>>>>>>>> 8 ',   )
	 
  
	const days 		=  [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ]
	const daysShort = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
	const long 		=  [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

	//by default we return the long
	if( type === undefined ){  return long      }
  	if( type === 'long' )   {  return long      }
 	if( type === 'short' )  {  return daysShort } 

}

//day1 is before day2, 
//one is empty or the same, will return true 
export function daysAreContinue( day1, day2, daysWeekList) { console.log(day1, day2, daysWeekList)
	 
	//return true if are the same
   if( day1 === day2              ){ return true }
   if( day1 === '' || day2 === '' ){ return true }


   for(  let i=0; i<7; i++ ){//7 days of the week
            
         //control the round of the week
         let index2 = i+1 ;    if(i===6){ index2 = 0 }

         let one = day1 === daysWeekList[i]
         let two = day2 != daysWeekList[index2]
         

         if( one && two ){  return false   } 
   }

	return true

}





export function getAge_OLD_toDeleteDec22(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


//convert to Friday, January 5, 2024 from 01/05/2024
export function friendlyDate(dateString, includeDay) {
 
	const date = new Date(dateString);
  
	if (isNaN(date.getTime())) {
	  return 'No Day';
	}
  
	const daysOfWeek   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months       = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const dayOfWeek    = daysOfWeek[date.getDay()];
	const dayOfMonth   = date.getDate();
	const month        = months[date.getMonth()];
	const year         = date.getFullYear();
  
	if(includeDay === true){
		 return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`
	}
  
	return `${month} ${dayOfMonth}, ${year}`
  
  
	return friendlyDate
}

// convert time on dt
// andry bracho 26/04/2024
export function friendlyTime(timeString) {
    const timeComponents = timeString.split(':');
    const hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
  
    let formattedTime = '';
  
    // Convertir horas a formato de 12 horas (AM / PM)
    if (hours === 0) {
        formattedTime += '12';
    } else if (hours <= 12) {
        formattedTime += hours;
    } else {
        formattedTime += hours - 12;
    }
  
    // Agregar los minutos
    formattedTime += ':' + (minutes < 10 ? '0' : '') + minutes;
  
    // Determinar si es AM o PM
    formattedTime += hours < 12 ? ' AM' : ' PM';
  
    return formattedTime;
}

// compare 2 date
// andry bracho 09/04/2024
export function compareDates(dateCompare) {
 
	// Calcular la diferencia de días
   const currentDate = new Date();
   const dueDate = new Date(dateCompare);
   const differenceInTime = dueDate.getTime() - currentDate.getTime();
   const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

   return differenceInDays
}

export function extractDate(dateTimeString) {
	const dateString = dateTimeString.split(' ')[0]; // Extrae solo la parte de la fecha
	const date = new Date(dateString);
  
	if (isNaN(date.getTime())) {
		return 'No Day';
	}
  
	const daysOfWeek   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months       = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const dayOfWeek    = daysOfWeek[date.getDay()];
	const dayOfMonth   = date.getDate();
	const month        = months[date.getMonth()];
	const year         = date.getFullYear();
  
	return `${month} ${dayOfMonth}, ${year}`;
}

export function extractAndFormatTime(dateTimeString) {
    // Extraer la parte de la hora de la cadena datetime
    const timeString = dateTimeString.split(' ')[1];
  
    // Usar la función friendlyTime para formatear la hora
    return friendlyTime(timeString);
}