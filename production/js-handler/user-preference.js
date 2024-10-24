export function start(detail){ //console.log('CLOCK PUNCH IN', detail)


    switch (detail.act){
        case 'setDevice':  setDevice(detail);          break; 

        // 25/10/2023 marco molina
        case 'setDevice_no_reload':  setDevice(detail,true);          break; 

    }

}/**/




function setSch( data ){  //console.log('setDatax',  JSON.parse( JSON.stringify(data) ) )

 
    
    JSON.parse( localStorage.getItem('userPreference') )


    localStorage.setItem('userPreference', JSON.stringify(sch))

}/**/




// 25/10/2023 marco molina aguegue el parametro reload
function setDevice(detail,reload = false){ 

    var storeData = JSON.parse( localStorage.getItem('userPreference') )

    if(storeData === null){
        storeData = {}
        storeData.deviceType = detail.deviceType

    }

    storeData.deviceType = detail.deviceType

    localStorage.setItem('userPreference', JSON.stringify(storeData))
    
    // 25/10/2023 marco molina para que no recargue la pagina si el parametro es verdadero
    if (reload ==false) {
        location.reload()
    }



}/*goTV*/


export function checkLocal(data){ //console.log('checkLocalllllllllllll')

    var storeData = JSON.parse( localStorage.getItem('userPreference') )

    //check the device type
    if(storeData != null){
        if(storeData.deviceType != null){
            data.device.deviceType = storeData.deviceType
        } 
    }

   // 

}