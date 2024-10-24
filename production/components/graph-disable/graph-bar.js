

/*
barObject > objeto con todas las variables
id        > id de la bar en el hmtl
spliters  > en cuandot quieres dividir el graphico, lineas horiontales
money     > solo estos datos dinero true or false
*/
//drawbar(barObject, 'barChart-55', 5, false ) ;

export function start(detail){ //console.log('drawbar >', detail)
  
    switch (detail.act){
          case 'showValue':     showValue(detail) ;      break;
          case 'showValueAll':  showValueAll(detail) ;   break;
    }
}




export function drawbar(barObject, id, spliters, money){ //console.log('xxxxxxx',barObject, id, spliters, money)
 
    const cont      =  document.getElementById(id)
    const barLegend =  cont.querySelector('.barLegend')
    const barBody   =  cont.querySelector('.barBody')

    barLegend.innerHTML = ''
    barBody.innerHTML   = ''

      //Setlines
     var largestNumber = setLines( barObject, barBody, spliters, money );

      //Setbars //explore the values of the  object
      setBars( barObject, id, largestNumber, money);

      //If there isn't header on the first object just hide it 
      if( barObject[0].header.length === 0){ 
          barLegend.classList.add( "dn" )

      }else {  barLegend.classList.remove( "dn" ) }

    //generate the legend, we just take the first object to do this
    for (var i = 0; i < barObject[0].header.length; i++) {
            barLegend.innerHTML += `
                 <div class="cont" data-bar_num="${i}" 
                      style="width: ${100/barObject[0].header.length}%;"
                      data-detail='{ "click": [ {"dest":"ripple" }, {"dest":"graphBar", "act":"showValueAll"}] } '

                      >
                    <label style="  border: 4px solid  ${  hexToRgbA(colors[i])  }">
                     ${barObject[0].header[i]}</label>
                 </div>  
            `
    }/*for*/


}/*Drawbar*/

//background-color: ${ hexToRgbA(colors[i]) };

function setLines( barObject, barBody, spliters, money ){

     if (money){money = "$"} else{ money = ""; }

      //1. Find the largest number, for lines calculation
      var largestNumber=0;
      for (var i = 0; i < barObject.length; i++) {
          for (var j = 0; j < barObject[i].value.length; j++) {
                if( barObject[i].value[j] > largestNumber ) { largestNumber = barObject[i].value[j]; }
          }/*for*/
      }/*for*/

      //2. Add all the lines
      var j = 1;
      for (var i = spliters; i > 0; i--) { // console.log( Math.round(largestNumber/i) );
        barBody.innerHTML += `
               <div class="line" style="bottom: ${(100/spliters)*j}%;" >
                    <label >${money}${abbreviateNumber(Math.round( (largestNumber/spliters)*j )) }</label>
                </div> `;
        j=j+1;
      }/*for*/

      return largestNumber;
}/*Drawbar_setlines*/


//add each bar to the body of the graphic
//unitDescription, el objeto para cada unidad
  var colors = ['#2DCCFF', '#48DC6B', '#6565DD',  '#D52855', '#FFD200', '#FFA500']
function setBars( barObject, id, largestNumber, money ){ //console.log( id )
   
    var units      = ""
    var value      = ""
    var cont       =  document.getElementById(id)
    var barBody    =  cont.querySelector('.barBody')
    var rightColor = ""
    var showValue  = ""
    var dataDetail = ""


    for (var i = 0; i < barObject.length; i++) { 
        for (var j = 0; j < barObject[i].value.length; j++) {
          
          //Show the labels?
           showValue = ''
           if(barObject[i].showValue === true){ showValue = 'rectangle--selected' }

          //we have colors?
           rightColor = colors[j]
           if(barObject[i].color[j] != undefined) {
             rightColor = barObject[i].color[j]
           }

           //is money?
           if (money) { value = formatter.format(barObject[i].value[j]); } else { value = barObject[i].value[j]; }

            //we have dataDetail
            dataDetail = ''
           if(barObject[i].dataDetail[j] != undefined) {
             dataDetail = barObject[i].dataDetail[j]
           }            

               units = units.concat(`
                <div class="rectangle rectangle-${j} ${showValue}"  id="${id}-rectangle-${i}-${j}"
                       style="height: 0%; 
                       background-color: ${ hexToRgbA(rightColor)};
                       border-top:   4px solid ${rightColor};
                       border-left:  4px solid ${rightColor};
                       border-right: 4px solid ${rightColor};" 

                       data-detail='{ "click": [  ${dataDetail}  ] } '
                       
                       >
                       <div class="value">${value}</div>
                </div>`);
          }/*for*/

        //each unit has a one or multiples bars on it
        barBody.innerHTML += `
            <div class="unit" style="width:${100/barObject.length}%; " >
               ${units}
               <div class="legend" style="font-size:12px">${barObject[i].footer}</div> 
            </div>
          `;
         units="";

    }/*for*/


    setTimeout(function() { 
        for (var i = 0; i < barObject.length; i++) { 
            for (var j = 0; j < barObject[i].value.length; j++) {

                 document.getElementById(`${id}-rectangle-${i}-${j}`).style.height = (`${ ((barObject[i].value[j]*100) / largestNumber)}%`)

            }/*for*/
        }/*for*/    
    }, 700);



}/*setBars*/



export function updateBar( barObject, barCont, money ){

      var largestNumber=0

      for (var i = 0; i < barObject.length; i++) {
          for (var j = 0; j < barObject[i].value.length; j++) {
                if( barObject[i].value[j] > largestNumber ) { largestNumber = barObject[i].value[j]; }
          }
      }

      for (var i = 0; i < barObject.length; i++) {
          for (var j = 0; j < barObject[i].value.length; j++) {
              
              let elem = document.getElementById(`${barCont}-rectangle-${i}-${j}`)
              let value      =  barObject[i].value[j];
              let valueText  =  elem.querySelector('.value')

              elem.style.height = (`${ (barObject[i].value[j]*100) / largestNumber}%`)
              valueText.innerHTML = `${value}`

          }
      }/*for*/

}/*updateBar*/




export function showValue(detail){ console.log('showValue>')

    const elem   = detail.ev.target
    
    console.log('elem id>', elem.id)


    if(!elem.classList.contains('rectangle--selected') ){
        elem.classList.add('rectangle--selected')
        return
    }
    
    elem.classList.remove('rectangle--selected')
}




export function showValueAll(detail){ console.log('showValueAll>123')

    const elem        = detail.ev.target
    const barParent   = elem.closest('.bar')
    const barNum      = elem.getAttribute('data-bar_num')
    const allUnit     = barParent.querySelectorAll(`.unit .rectangle-${barNum}`)


    if(!elem.classList.contains('cont--selected') ){

        elem.classList.add('cont--selected')
        allUnit.forEach((unit)=>{
            unit.classList.add('rectangle--selected')
        })        
        return
    
    }/*if*/

        elem.classList.remove('cont--selected')
        allUnit.forEach((unit)=>{
            unit.classList.remove('rectangle--selected')
        })   

}/*showValueAll*/







function hexToRgbA(hex){

//console.log(hex);
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.67)';
    }
    throw new Error('Bad Hex');


}



function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}