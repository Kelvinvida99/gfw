
const settings  = require('../../js-handler/settings')
const timeTime  = require('../../js-handler/time-time')
const websocket = require('../../js-network/web-socket')
const string    = require('../../js-handler/string')



/*if the new user is an admin
wait until the wescoket is full connedted
and sedn the joinAdmin, to the server send back all the users connect */
function joinAdmin_probablyToDleteExistesOnMonitorHandler(){ ///red red red 

    const data = settings.getDataWs()

    if( data.right === 'admin' || data.right === 'adminGosive' ){  //console.log(`YESSSSSSSS ADMIN`, ); 
          //websocket.send({  act: "joinAdmin", data: settings.getDataWs()  })

        var timer = setInterval(()=>{    
           
            if (websocket.ws != undefined) {
                if (websocket.ws.connected == true) {

                    websocket.send({ act: "joinAdmin", data: data })
                    clearInterval(timer)
                }/*if*/
            }/*if*/

       }, 1000)/*mapTimer*/

    }/*if*/
}/**/


//after we join the server send all the activate users
//depend If admin or adminGosive
export function joinAdminReplay(detail){  console.log('joinAdminReplayxxxx>', detail)
    
    lineCleanAll() 
    
    detail.user.forEach((user) => {
         lineUpdate(user)    
    })/*companies*/ 

}/*updateUser*/


//clean the up time for all the elments 
export function lineCleanAll(){ //console.log( 'lineCleanAll>' )

    //turn down all the avatars
    const allAvatar = document.querySelectorAll('.line-avatar-up')

    allAvatar.forEach((avatar)=>{ //console.log('compannYYY>', company)
        avatar.classList.remove('line-avatar-up') 
    })

    const allLastUpdateDetail = document.querySelectorAll('.lastUpdateDetail')

    allLastUpdateDetail.forEach((lastUpdateDetail)=>{ //console.log('compannYYY>', company)
        lastUpdateDetail.setAttribute('data-time', '')
        lastUpdateDetail.innerHTML = `--:--` 
    })

}/**/


//after update user, just remove all the contact of the user, 
//and add the newOne
//userDetailsUpdate
export function lineUpdate(user){  console.log('userDetailsUpdatex>', user.typeApp)


    //nurses are ignore on monitor, this is only for staff
     if( user.typeApp === 'nurse'){ return }

     user.company=string.removeSpecialCharacters(user.company);


    const html =  document.getElementById(`monitor-${user.company}-${user.id}`)

    html.classList.add('line-avatar-up')  
    html.querySelector('.device').innerHTML = 

                        ` 
                            <div class="icon"> 
                                <svg><use xlink:href="./css/svg.svg#${user.device.deviceType}"></use></svg>  
                            </div>
                            <label>${user.device.deviceOs}<br>
                                   ${user.device.deviceType}<br>
                                   ${user.device.deviceVersion}</label>
                         `

    html.querySelector('.browser').innerHTML = 

                        `  
                            <div class="icon"> 
                                <svg><use xlink:href="./css/svg.svg#web"></use></svg>  
                            </div>
                            <label>${user.device.navegatorType}<br>
                                   ${user.device.navegatorName}<br>
                                   ${user.device.navegatorVersion}</label>
                        `

    const lasTimeActive = timeTime.getTimeDiff(user.time)
    const ago = `${  lasTimeActive.hour } : 
                 ${  lasTimeActive.min  } :
                 ${  lasTimeActive.seg  } `

    const lastUpdate = html.querySelector('.lastUpdate')
    
    lastUpdate.innerHTML = `<div class="icon"> 
                               <svg><use xlink:href="./css/svg.svg#time-history"></use></svg>  
                            </div>
                            <label class="lastUpdateDetail" data-time ='${user.time}'>${ago}</label> `


    //show the light indicator
    lastUpdate.classList.add('unit-active')
    setTimeout(()=>{ lastUpdate.classList.remove('unit-active');  }, 800)


    //update the company label
    companyRefreshTime(user.company)


}/*device update*/



//when user left, remove the up indicator and change the label for time
export function leftOne(user){   //console.log('leftOne>')

    user.company=string.removeSpecialCharacters(user.company);

    const html              =  document.getElementById(`monitor-${user.company}-${user.id}`)
    const unit              =  html.querySelector('.lastUpdate')
    const lastUpdateDetail  =  html.querySelector('.lastUpdateDetail')

    html.classList.remove('line-avatar-up') 
    lastUpdateDetail.setAttribute('data-time', '')

    lastUpdateDetail.innerHTML = `${timeTime.formatAMPM()}`
    lastUpdateDetail.title     = 'User left at'
 
     //show the light indicator
    unit.classList.add('unit-active')
    setTimeout(()=>{ unit.classList.remove('unit-active');  }, 800)

    //update the company label
    companyRefreshTime(user.company)
}/**/


//refresh the company user on each activity
function companyRefreshTime(company){

    const html   =  document.getElementById(`monitor-${company}`)
    const unit   =  html.querySelector('.lastUpdate')
    const lastUpdateDetail =  html.querySelector('.lastUpdateDetail')

    lastUpdateDetail.setAttribute('data-time', new Date()) 

    //show the light indicator
    unit.classList.add('unit-active')
    setTimeout(()=>{ unit.classList.remove('unit-active');  }, 800)
}



//keep the timer for each user active
export function lastupdateTimer(){

    const timer = setInterval(()=>{ // console.log( 'setInterval>' )
       
    const allMonitorLastupdate = document.querySelectorAll('.lastUpdateDetail')

   // console.log( 'allMonitorLastupdate>', allMonitorLastupdate)

    allMonitorLastupdate.forEach((unit) => { 
 
        let unitTime =  unit.getAttribute('data-time')

       

        
        if(unitTime != '' ){

            const lastTimeActive = timeTime.getTimeDiff( new Date(unitTime) )
            //  console.log( 'lastTimeActive>', lastTimeActive )

            unit.innerHTML = `${ lastTimeActive.hour } : 
                              ${ lastTimeActive.min  } :
                              ${ lastTimeActive.seg  } `
        }
    })/*companies*/    

   }, 2000)/*mapTimer*/
}/**/



//we we get an activity update, we have to update the line and the company timer
export function activityUpdates(data){ //  console.log('activityUpdates ', data)

    if( data.typeApp === 'nurse'){ return }

    data.company=string.removeSpecialCharacters(data.company);


    const elem        = document.querySelector(`#monitor-${data.company}-${data.id}`)

    //console.log('activityUpdates elem', elem)

    const elemCompany = document.querySelector(`#monitor-${data.company} .bar`)

    const unit        = elem.querySelector('.lastUpdate')
    const unitCompany = elemCompany.querySelector('.lastUpdate')

    const lastUpdateDetail        = elem.querySelector('.lastUpdateDetail')
    const lastUpdateDetailCompany = elemCompany.querySelector('.lastUpdateDetail')

    // si no encuentra el ultimo detalle de actualizacion salir
    if (lastUpdateDetail == null) {
        return;
    }

    lastUpdateDetail.setAttribute('data-time', data.time)
    lastUpdateDetailCompany.setAttribute('data-time', data.time)

    const lasTimeActive = timeTime.getTimeDiff(data.time)
    const newTime       = `${ lasTimeActive.hour } : ${ lasTimeActive.min  } : ${ lasTimeActive.seg  } `

    lastUpdateDetail.innerHTML        = newTime
    lastUpdateDetailCompany.innerHTML = newTime


    unit.classList.add('unit-active')
    unitCompany.classList.add('unit-active')
   
    setTimeout(()=>{
        unit.classList.remove('unit-active')
        unitCompany.classList.remove('unit-active')
    }, 200)

}/**/

