export function getstatusStyle(elem){ // console.log('getStatusStyle', elem )

    
     if(elem.status == "Active" )  return {title: elem.status,   color:'td-green-icon',   svg:'check-round', des:elem.lastLogon};
                 
     return {title:elem.status, color:'td-red-icon', svg:'cancel', des: elem.lastLogon};           
   
}