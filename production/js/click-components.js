//25/10/2023 marco molina
//archivo creado a partir del archivo click-obj pero solo con los componentes


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
const report         = require ('../components/report/report')




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
        report:        { start: function(detail){ report.start(detail)        }},
        signature:     { start: function(detail){ signature.start(detail)     }},
        snack:         { start: function(detail){ snack.start(detail)         }},
        startApp:      { start: function(detail){ startApp.start ()           }},
        stepper:       { start: function(detail){ stepper.start(detail)       }},        
        tab:           { start: function(detail){ tab.mov(detail.ev)          }},
        textfield:     { start: function(detail){ textfield.start(detail)     }},

       
        userPreference: { start: function(detail){  userPreference.start(detail)       }},
        nothing:        { start: function(detail){  console.log('CLICK', 'DONT DO THING')      }},
        userPreference: { start: function(detail){  userPreference.start(detail)       }},
        nothing:        { start: function(detail){  console.log('CLICK', 'DONT DO THING')      }},

        //TV
        leftnavTv:          { start: function(detail){  leftnavTv.start(detail)             }},
    


}




