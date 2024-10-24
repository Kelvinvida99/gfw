
const fullcontPageMove     = require ('./fullcont-page-move')
const fullcontHandler      = require ('./fullcont-handler')
const fullcontJump         = require ('./fullcont-jump')


/****************ELEMENTS*****************/
var scrimFullcont
var HTMLwasSelected = false

function HTMLselect(){ 

  scrimFullcont   = document.getElementById('scrim_fullcont')
  HTMLwasSelected  = true
}
/****************ELEMENTS*****************/

export function start(detail){ //console.log('FULLCONT START>', detail.act)
  
      if(!HTMLwasSelected) { HTMLselect() }
       
      obj[detail.act].start(detail)

}/**/



const obj = {
   
      show:         { start: (detail)=>{  fullcontHandler.show(detail, scrimFullcont)        }},
      showSimple:   { start: (detail)=>{  fullcontHandler.showSimple(detail, scrimFullcont)  }},
      hide:         { start: (detail)=>{  fullcontHandler.hide(detail, scrimFullcont)        }},
      pageMov:      { start: (detail)=>{  fullcontPageMove.start(detail)                     }},
      NoTabSource:  { start: (detail)=>{  fullcontPageMove.NoTabSource(detail)               }},
      jump:         { start: (detail)=>{  fullcontJump.start(detail)                         }},

}/**/











