
const timeSheet      = require ('../components-punch/time-sheet/time-sheet')



const change = document.body.addEventListener('change',function(ev){
    
    ev.stopPropagation();

    const classes = ev.target.className
    const spliter = classes.split(" ") //Get elem all class
    
    if (spliter == ""){
         if (ev.target.tagName == 'TD'){
             p_dt('td', ev)
             return
         }
    }

    spliter.forEach((element)=>{//anlyce each class
      if(element.startsWith('Lch_')) { //Only Lc_ → are allowed
        let arr  = element.split('_')
        call(arr[1], arr[2], ev)
      }
    })

 }, true);


function call(module, func, ev){ console.log('module', module, 'func', func)  


    switch (module){
        case 'timeSheet':  timeSheet.p_timeSheet(func, ev);      break; 

    }
}





module.exports = {change:change}
