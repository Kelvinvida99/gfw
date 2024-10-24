



const applicattions     = require('../applications/applications')
const htmlLoader        = require('./html-loader')
const loading           = require ('../components/loading/loading')
const settings          = require('./settings')
//25/10/2023 marco molina
//const clickObj          = require('../js/click-obj')
const dateTime          = require('../js-handler/time-date')
const timeTime          = require('../js-handler/time-time')



window.addEventListener("load", ()=>{ start()  })


export const start = async () =>{     //console.log('start >')


   htmlLoader.esencial()

   loading.show()
   loading.notify('starting')
    
    var settingsData = await  settings.load({"dest":"startApp"})

    //exist an error loading the settings?
    if(settingsData === false || settingsData === undefined){ loading.notify('settingsError'); return  }

   //console.log('settingsDataxxx go to app start>', settingsData)

    applicattions.start(settingsData)

    
   loading.hide()

   setTimeout(()=>{
        //document.body.style.zoom = "90%"
       // testing()
   },1500)

}/**/


//we  usage this function to click element on the dom, and do our life easier
function testing(){ //console.log('testing 1  >')
 
    // const elem = document.getElementById('patients-tableRow-241')
    //const elem = document.getElementById('nurses-tableRow-61')

    // const elem1 = document.getElementById('clickFromStartForTesting_1')
    // elem1.click()

        //onboard
        const elem = document.getElementById('onboard-test')
        elem.click()

   setTimeout(()=>{console.log('testing 2  >')
     //    const tds = elem.querySelectorAll('td')
     // tds[1].click()


     //    const patientFullcont = document.getElementById('patients-fullcont')
     //    const tab             = patientFullcont.querySelector('.agreementTab')
     //    tab.click()

        //nurses
        // const patientFullcont = document.getElementById('nurses-fullcont')
        // const tab             = patientFullcont.querySelector('.managementTab')
        // tab.click()



        //tasks group
        // const elem2 = document.getElementById('servicesReport-tableRow-88')
        // const elem3 = elem2.querySelectorAll('td')

        // console.log('testing 2  >', elem3[1])

        // elem3[1].click()

 
   },200)   
}



//isExpireOn('2022-12-27')

function isExpireOn(dateString) {

    var today      = new Date();
    var expireDate = new Date(dateString)

    console.log('isExpireOn>', today)
    console.log('isExpireOn>', expireDate)
    console.log('isExpireOn>', timeTime.getTimeDiff( expireDate, new Date() ) )






    console.log('isExpireOn>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
}





