



/*we use this variable for access to the last event

example, when we show the menu from BackControl, the event
was lost, we use this variable for find it 

used on menu.js
*/
var event = ''



function setEv(ev){
  event = ev

}


function getEv(){
  return event
}




module.exports = { 
  setEv: setEv,
  getEv: getEv

}


