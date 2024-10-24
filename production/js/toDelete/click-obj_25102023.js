const actions        = require ('../js-handler/actions')
const appbar         = require ('../components/appbar/appbar')
const appnav         = require ('../components/appnav/appnav')
const autocomplete   = require ('../components/textfield/autocomplete')
const avatar         = require ('../components/avatar/avatar')
const backdrop       = require ('../components/backdrop/backdrop')
const onboard        = require ('../components/onboard/onboard')
const banner         = require ('../components/banner/banner')
const confirmation   = require ('../components/confirmation/confirmation')
const darkTheme      = require ('../js-handler/darkTheme')
const dialog         = require ('../components/dialog/dialog')
const drawer         = require ('../components/drawer/drawer')
const dt             = require ('../components/dt/dt')
const file           = require ('../components/file/file')
const fullcont       = require ('../components/fullcont/fullcont')
//const graphBar       = require ('../components/graph/graph-bar')
const leftnav        = require ('../components/leftnav/leftnav')
const leftnavTv      = require ('../components/leftnav/leftnav-tv')
const login          = require ('../components/login/login-bridge')
const map            = require ('../components/map/map')
const menu           = require ('../components/menu/menu')
const monitor        = require ('../components/monitor/monitor')
const multitable     = require ('../components/multitable/multitable')
const multivalue     = require ('../components/textfield/textfield-multivalue')
const page           = require ('../components/page/page')
const ripple         = require ('../components/ripple/ripple')
const signature      = require ('../components/signature/signature')
const snack          = require ('../components/snack/snack')
const startApp       = require ('../js-handler/start-app')
const stepper        = require ('../components/stepper/stepper')
const tab            = require ('../components/tab/tab')
const textfield      = require ('../components/textfield/textfield')
const userPreference = require ('../js-handler/user-preference')


const goku         = require ('../entity/goku/goku')
//const home         = require ('../entity/home/home')
const myuser       = require ('../entity/myuser/myuser')
//const powers       = require ('../entity/powers/powers')


//STAFF DESKTOP
const nurses       = require ('../applications/staff/desktop/entity/nurses/nurses')
const company      = require ('../applications/staff/desktop/entity/company/company')
const services     = require ('../applications/staff/desktop/entity/services/services')
const departments  = require ('../applications/staff/desktop/entity/departments/departments') 
const users        = require ('../applications/staff/desktop/entity/users/users')
const patients     = require ('../applications/staff/desktop/entity/patients/patients')
const payrolls     = require ('../applications/staff/desktop/entity/payrolls/payrolls')

const servicesReport     = require ('../applications/staff/desktop/entity/servicesReport/servicesReport')
const admin              = require ('../applications/staff/desktop/entity/admin/admin')
// const homestaff          = require ('../entity/homestaff/homestaff')
const staffLearning     = require ('../applications/staff/desktop/entity/staffLearning/staffLearning')


////PATIENT APP
const homepatient     = require ('../applications/patient/entity/homepatient/homepatient')
const historypatient  = require ('../applications/patient/entity/historypatient/historypatient')

////NURSSE APP
// const todaynurse     = require ('../applications/nurse/entity/todaynurse/todaynurse')
// const weeknurse      = require ('../applications/nurse/entity/weeknurse/weeknurse')
const nextweeknurse  = require ('../applications/nurse/entity/nextweeknurse/nextweeknurse')
const historynurse   = require ('../applications/nurse/entity/historynurse/historynurse')
const clocknurse     = require ('../applications/nurse/entity/clocknurse/clocknurse')



////TV
//const dashboardTv       = require ('../applications/staff/tv/entity/dashboardTv/dashboardTv')
const tvDashboardHome   = require ('../applications/staff/tv/entity/tvDashboardHome/tvDashboardHome')


//const backControl  = require ('./backControl') asdf


export const obj = {

        actions:       { start: function(detail){ actions.start(detail)       }},
        appbar:        { start: function(detail){ appbar.start(detail)        }},
        avatar:        { start: function(detail){ avatar.start(detail)        }},
        appnav:        { start: function(detail){ appnav.select(detail.ev)    }},
        autocomplete:  { start: function(detail){ autocomplete.start(detail)  }},
        backdrop:      { start: function(detail){ backdrop.start(detail)      }},
        banner:        { start: function(detail){ banner.start(detail)        }},
        confirmation:  { start: function(detail){ confirmation.start(detail)  }},
        darkTheme:     { start: function(detail){ darkTheme.start()           }},
        dialog:        { start: function(detail){ dialog.start(detail)        }},
        drawer:        { start: function(detail){ drawer.start(detail)        }},
        dt:            { start: function(detail){ dt.start(detail)            }},
        file:          { start: function(detail){ file.start(detail)          }},
        fullcont:      { start: function(detail){ fullcont.start(detail)      }},
        //graphBar:      { start: function(detail){ graphBar.start(detail)    }},
        leftnav:       { start: function(detail){ leftnav.start(detail)   }},
        login:         { start: function(detail){ login.start(detail)         }},
        map:           { start: function(detail){ map.start(detail)           }},
        menu:          { start: function(detail){ menu.start(detail)          }},
        monitor:       { start: function(detail){ monitor.start(detail)       }},
        multitable:    { start: function(detail){ multitable.start(detail)    }},
        multivalue:    { start: function(detail){ multivalue.start(detail)    }},
        onboard:       { start: function(detail){ onboard.start(detail)       }},
        page:          { start: function(detail){ page.start(detail)          }},
        reload:        { start: function(detail){ location.reload()           }},
        ripple:        { start: function(detail){ ripple.show(detail.ev)      }},
        signature:     { start: function(detail){ signature.start(detail)     }},
        snack:         { start: function(detail){ snack.start(detail)         }},
        startApp:      { start: function(detail){ startApp.start ()           }},
        stepper:       { start: function(detail){ stepper.start(detail)       }},        
        tab:           { start: function(detail){ tab.mov(detail.ev)          }},
        textfield:     { start: function(detail){ textfield.start(detail)     }},

        //entities
        departments:   { start: function(detail){  departments.start(detail)    }},
        goku:          { start: function(detail){  goku.start(detail)           }},
        home:          { start: function(detail){  home.start(detail)           }},
        // homestaff:     { start: function(detail){  homestaff.start(detail)      }},
        myuser:        { start: function(detail){  myuser.start(detail)         }},
        powers:        { start: function(detail){  powers.start(detail)         }},
        users:         { start: function(detail){  users.start(detail)          }},

        ////PATIENT APP    
        homepatient:    { start: function(detail){  homepatient.start(detail)   }},
        historypatient: { start: function(detail){  historypatient.start(detail)}},


        //staff desktop
        nurses:         { start: function(detail) {  nurses.start(detail)         }},
        company:        { start: function(detail) {  company.start(detail)        }},
        servicesReport: { start: function(detail) {  servicesReport.start(detail) }},
        services:       { start: function(detail) {  services.start(detail)       }},
        admin:          { start: function(detail) {  admin.start(detail)          }},
        payrolls:       { start: function(detail) {  payrolls.start(detail)       }},
        payrolls:       { start: function(detail) {  payrolls.start(detail)       }},
        patients:       { start: function(detail) {  patients.start(detail)       }},
        staffLearning:  { start: function(detail) {  staffLearning.start(detail)  }},




        ////NURSE APP    
        // todaynurse:     { start: function(detail){  todaynurse.start(detail)       }},
        // weeknurse:      { start: function(detail){  weeknurse.start(detail)        }},
        nextweeknurse:  { start: function(detail){  nextweeknurse.start(detail)    }},
        historynurse:   { start: function(detail){  historynurse.start(detail)     }},
        clocknurse:     { start: function(detail){  clocknurse.start(detail)       }},


        ////TV
        dashboardTv:        { start: function(detail){  dashboardTv.start(detail)           }},
        tvDashboardHome:    { start: function(detail){  tvDashboardHome.start(detail)       }},
        leftnavTv:          { start: function(detail){  leftnavTv.start(detail)             }},



        userPreference: { start: function(detail){  userPreference.start(detail)       }},


        nothing:       { start: function(detail){  console.log('CLICK', 'DONT DO THING')      }},




}




