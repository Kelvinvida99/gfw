const file = require ('../components/file/file')
const dt   = require ('../components/dt/dt')
//const backControl  = require ('./backControl')


export const obj = {
   
        file:          { start: function(detail){ file.start(detail)          }},
        dt:            { start: function(detail){ dt.start(detail)            }}

}


///>
/*
obj[fullcont].start()
doubleClick > dest > fileServer > act > 

dest > file 
act  > f1

start > act > function

file
        f1
        f2
        f2

*/


