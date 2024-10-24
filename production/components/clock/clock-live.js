

function start(id, isOnFullcont){ //console.log('start clock>>>>>>')

  const elem = document.getElementById(id)
  elem.classList.remove('stop')

  var clock = setInterval(()=>{ //console.log('clock timer> ')
    
      elem.innerHTML = update()
      //stop the clock when you add the class stop
      if(elem.classList.contains('stop')){ clearInterval(clock) }
 

  },500) /*clock*/


}/**/



function onFullcont(id){ // console.log('start clock>>>>>> on fullcont @@@@@@@')

  const elem = document.getElementById(id)
  const fullcontHtml = elem.closest('.fullcont')


  var clock = setInterval(()=>{ //console.log('clock timer> ')
    
      elem.innerHTML = update()
      
      //stop the clock when you hide the fullcont
      if(!fullcontHtml.classList.contains('fullcont-show')){ clearInterval(clock) }
 

  },500) /*clock*/


}/**/



// if( !fullCont.classList.contains('fullCont-show') ){ console.log('clock timer cancelled> ')
//     clearInterval(clock) 
// }


function update() {

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

 return h + ":" + m + ":" + s;

}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}




module.exports = {
  start:start,
  onFullcont:onFullcont,
}

