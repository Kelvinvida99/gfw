
const monitorHandler  = require('../../../../../components/monitor/monitor-handler')
const tvMonitorDB     = require('./dashboardTv-monitor-db')
const timeTime        = require('../../../../../js-handler/time-time')

// const monitorHandler      = require('../../../../../components/monitor/monitor-handler')


/****************ELEMENTS*****************/
var HTMLwasSelected  = false
var tvcardActivity   

function HTMLselect(){ //console.log('nurses init>')
    
    tvcardActivity   = document.getElementById('tvcard-activity')

    HTMLwasSelected  = true

}/*init*/

/****************ELEMENTS*****************/



export function start(detail){   console.log('monitortv>', detail)
  
     

	switch (detail.elem){

        case 'load':                        load();  break;
        case 'joinAdminDashboardTvReplay':  joinAdminDashboardTvReplay(detail);  break;

	}
}
 



export function load(){

    if(!HTMLwasSelected) {HTMLselect()}
    
    //make a dbREquest to get all users    
    tvMonitorDB.load({}, (data)=>{ startGenerate(data[0])  })/**/
}



function startGenerate(data){  console.log('startGenerate tvxxxxxxxxxxxxxxxxxxxxx>', data.user)

    try{

        tvcardActivity.innerHTML=''
        //generate all the companies and all the users in the companie
        data.user.forEach((line) => { //console.log('forEach>', line)
                let bodyLine=` <div class="tvcard-activity" id="monitorTv-${data.name}-${line.id}""> 
                                  <div class="avatarLine line-avatar-up" style="background-image: url('${line.avatar}');" >
                                        <div class="status"></div> 
                                  </div>   
                                  <div class="title">${line.name}</div>
                                  <div class="des">${line.right}</div>
                                  <div class="num lastUpdateDetail" data-time =''></div>
                               </div> <!-- tvcard-list -->  `

               tvcardActivity.insertAdjacentHTML("beforeend", bodyLine)
        })

        tvMonitorDB.joinAdminDashboardTv()

    }catch(error){ console.log('error', error)}
}


function joinAdminDashboardTvReplay(detail){ console.log('HEREEEEEEEEEEEEEEEEEEEEEEEEEE', detail.user)


    detail.user.forEach((user) => {
         lineUpdate(user)    
    })/*companies*/ 

}


//userDetailsUpdate
function lineUpdate(user){  console.log('userDetailsUpdatex>', user.typeApp)




    const html =  document.getElementById(`monitorTv-${user.company}-${user.id}`)

    //Set the avatar up
    html.querySelector('.avatarLine').classList.add('avatar-online')  



    const lasTimeActive = timeTime.getTimeDiff(user.time)
    const ago = `${  lasTimeActive.hour } : 
                 ${  lasTimeActive.min  } :
                 ${  lasTimeActive.seg  } `

    const lastUpdate = html.querySelector('.lastUpdateDetail')

    
    lastUpdate.innerHTML = `${ago}`
    lastUpdate.setAttribute('data-time', user.time)

    lastupdateTimer()


}/*device update*/



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







