


export const form   =  { all:[] }
export function getForm(){ return form }

const string = require('../../js-handler/string')


//here we fill from array with all thml
export function HTMLselect(data) {  //console.log('HTMLselect data>'')



   data.forEach((company) => {    
    // 25/10/2023 marco molina
    company.name=string.removeSpecialCharacters(company.name);
    
   	   form[`monitor-${company.name}`] = {html: document.getElementById(`monitor-${company.name}`) }	

         company.user.forEach((line) => {   	    
       		
            form[`monitor-${company.name}-${line.id}`] = { html: document.getElementById(`monitor-${company.name}-${line.id}`) }	
        
        })/**/
    })/**/

}/*HTMLselect*/ 


