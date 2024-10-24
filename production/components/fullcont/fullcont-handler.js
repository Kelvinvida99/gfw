

///Here we handle default actions
const backControl          = require('../../js/back-control')
const dialog               = require ('../../components/dialog/dialog')
const dtHandler            = require ('../dt/dt-handler')
const fullcont             = require ('../../components/fullcont/fullcont')
const fullcontForm         = require ('../../components/fullcont/fullcont-form')
const fullcontPageMove     = require ('./fullcont-page-move')
const map                  = require ('../../components/map/map')
const settings             = require ('../../js-handler/settings')
const signature            = require ('../../components/signature/signature')
const snack                = require ('../../components/snack/snack')
const textfield            = require ('../../components/textfield/textfield')

var scrimFullcont 


//insert and select the fullcont on the body and select all the inputs
//and save on htmlFc all the importants documents
export function HTMLselect(entity, dest, id, fullcontHTML, form, formCopy, entityMT, editDialog, deleteDialog,  dtCall, htmlFc ){ 

   
    scrimFullcont  = document.getElementById('scrim_fullcont')

    loadFullcont(dest, fullcontHTML)

    if(form != undefined){
        //select all the input html to the form
        for(let i=0 ; i < form.length ; i++){
            let elem = document.getElementById(form[i].id)
            form[i].html     = elem
            formCopy[i].html = elem

            //we init the signature here
            if( form[i].type === 'signature'){ signature.start({ "id":form[i].id, "act":"init" }) }
        }
        
    }


    ///MULTITABLE
    if(entityMT != undefined){
        for(let i=0 ; i < entityMT.length ; i++){
            entityMT[i].html = document.getElementById( entityMT[i].id)
        }        
    }

    htmlFc.deleteDialog  =  deleteDialog
    htmlFc.dtCall        =  dtCall
    htmlFc.editDialog    =  editDialog
    htmlFc.entity        =  entity
    htmlFc.dest          =  dest
    htmlFc.entityMT      =  entityMT
    htmlFc.form          =  form
    htmlFc.formCopy      =  formCopy
    htmlFc.fullcontHTML  =  document.getElementById(id)
    htmlFc.notification  =  htmlFc.fullcontHTML.querySelector('.fullcont-notification')
    
    previlegeControl( htmlFc)

}/*init*/

//decide if we insert the fullcont on the page or in the body
//somes fullcont aren't insert in page as edit profield
function loadFullcont(dest, fullcontHTML){  // console.log(`fullcont Show>`, ); 

// /************************red - Remove this from here*/
//         const body = document.body
//         body.insertAdjacentHTML("beforeend", fullcontHTML)   
// /************************red*/


    const entityPage = document.getElementById(`${dest}-page`) 

    if(entityPage === null){
       
        const body = document.body
        body.insertAdjacentHTML("beforeend", fullcontHTML)           
    
    }else{

        entityPage.insertAdjacentHTML("beforeend", fullcontHTML)
    }

   // console.log('entityPagexxx>', entityPage)

}


export function show(detail, scrimFullcont){ console.log( 'fullcont show>', window.innerWidth )

  //select the fullcont
  var elem 

  if(detail.id != undefined){
           elem = document.getElementById(detail.id)
  }else{   elem = detail.fullcontHTML }




  //show the element
  elem.classList.add('fullcont-show')

  //place all page on the top
  fullcontPageMove.scrollTop(detail)

  //control resize
  isFullcontOpen = true


  //we need show scrim?
  //on pc, back don't works with fullcont
  if(window.innerWidth < 1800){ 
      scrimFullcont.classList.add('scrim-show')
      //add to the url
      backControl.hashAdd({ toShow:`fullcont-${detail.id}` })
  }


}/**/

//showSimple, don't move the pages to the top
export function showSimple(detail, scrimFullcont){ //console.log( 'fullcont show>' )

  //select the fullcont
  var elem = document.getElementById(detail.id)

  //show the element
  elem.classList.add('fullcont-show')

  //control resize
  isFullcontOpen = true

  //we need show scrim?
  //on pc, back don't works with fullcont
  if(window.innerWidth < 1800){ 
      scrimFullcont.classList.add('scrim-show')
      //add to the url
      backControl.hashAdd({ toShow:`fullcont-${detail.id}` })
  }


}/**/


export function hide(detail, scrimFullcont){    console.log('hide',  detail)

  var elem 

  if(detail.id != undefined){
           elem = document.getElementById(detail.id)
  }else{   elem = detail.fullcontHTML }

  hideAnimation(elem, scrimFullcont)

  //control resize
  isFullcontOpen = false

  //remove to the url
  backControl.hashSub({ toHide:`fullcont-${detail.id}` })


  
}/**/




export function prepareAdd(detail, htmlFc){ //console.log('prepareAdd>1') 

    //remove the view/edit from the page
    htmlFc.fullcontHTML.classList.remove('mode-view')
    htmlFc.fullcontHTML.classList.remove('mode-edit')
    htmlFc.fullcontHTML.classList.add('mode-add')

    //clean htmlprepareAdd
    fullcontForm.clean(htmlFc)
    
    //clean the form obj value
    fullcontForm.cleanFromValues(htmlFc)
    
    //we we have a map, load the current position
    htmlFc.form.forEach((elem)=>{
        if(elem.type === 'map'){  
            map.loadMyPosition(elem) 
        }

         if(elem.type === 'signature'){  
            elem.html.classList.remove('signatureOnLine-view')
        }       

    })/*foreach*/  

    //move the entity page, or mainPage before start
    fullcont.start( {act:"pageMov",    id: detail.id, pagetoshow:"entity"} )
    fullcont.start( {act:"show",       id: detail.id } )
    

    //CLEARING AVATAR
    resetAvatarUrl(htmlFc.fullcontHTML)

    cleanNotification(htmlFc)


}


function cleanNotification(htmlFc){
       if(htmlFc.notification != undefined){ htmlFc.notification.innerHTML='' } 
}

function resetAvatarUrl(fc){

    const fcUserPic = fc.querySelector(".avatar");
    if( fcUserPic === null ) return
    fcUserPic.style.backgroundImage = "url('')";   
    fcUserPic.style.backgroundImage = "url('css/img/pic/person.svg?" + new Date().getTime();+"')";
    
}



export function discard( detail, htmlFc ){ //console.log('discard>')

    dialog.start({act:"hide"}) 

    //refesh formCopy values
    fullcontForm.cleanFromValues(htmlFc)

    //clean fullcont 
    fullcontForm.clean(htmlFc)

    prepareView(htmlFc.form, detail)  
    
    dtHandler.highlightTrClean(detail)
    
    fullcont.start({ act:"hide",  id: detail.id  })  
}




export function prepareView(form, detail){ //console.log('prepareViewx', detail.id)

    const fullcontParent =  document.getElementById(detail.id)

    //remove the view from the page
    fullcontParent.classList.add('mode-view')
    fullcontParent.classList.remove('mode-edit')
    fullcontParent.classList.remove('mode-add')

    //if we have a signature, can be edited this signature?
    form.forEach((elem)=>{

        if(elem.type === 'signature'){ 
            if( elem.edit === true ){
                    elem.html.classList.remove('signatureOnLine-view')
            }else{  elem.html.classList.add('signatureOnLine-view')}
        }

    })/*foreach*/  

}/**/


export function prepareEdit(detail, htmlFc){  //console.log('prepareEdit')

   // const fullcontParent =  document.getElementById(detail.id)
    const fullcontParent = htmlFc.fullcontHTML

    if( fullcontParent.classList.contains('mode-edit') ){ return }
    if( fullcontParent.classList.contains('mode-add')  ){ return }
    if( fullcontParent.classList.contains('mode-readOnly') ){
        snack.start({ act:'show', id:'cantEdit'})
        return false
    }

    //remove the view from the page
    fullcontParent.classList.remove('mode-view')
    fullcontParent.classList.remove('mode-add')
    fullcontParent.classList.add('mode-edit')

    //increase the size of textarea
    textfield.textareaIncreaseAll(fullcontParent)

    return true

}


export function setDbid(detail){  //console.log('setDbid', detail)

    const fullcontParent =  document.getElementById(detail.id)
    fullcontParent.setAttribute('data-dbid', detail.dbid)

} 

//when a entity is deleted, close the fullcont if it's open with that entitty
export function controlAfterDelete(detail){ //console.log('controlAfterDelete')

    const entityFullcont = document.getElementById(`${detail.dest}-fullcont`)
   
    //if the fullcont is open
    if( entityFullcont.classList.contains('fullcont-show') ){  //console.log('fullcont' )
        
        let dbid = parseInt( entityFullcont.getAttribute('data-dbid') )

        detail.dbid.forEach((id)=>{
            if(dbid === id){
                fullcont.start({act: 'hide', id:`${detail.dest}-fullcont`})
            }
        })        
    }


} 

export function previlegeControl(htmlFc){ //console.log('privilegeControl>')

    const data = settings.getData()

    //no privilege control on nurses app
    if(data.typeApp === "nurse"){
        return
    }

    //admins don't have previlege control
    if(data.right === 'admin' || data.right === 'adminGosive') {
        return
    }
       
    var privilegeDB  
    var privilegeFile
    var previlegeSource 

    //select the element for control, on mobile-bottomnav/desktop-leftnav
   if(data.device.deviceType === 'desktop'){ previlegeSource = 'leftnav'   }
   else                                    { previlegeSource = 'bottomnav' }
    

    data[previlegeSource].forEach((elem)=>{
        if( elem.entity === htmlFc.entity ){
                
                privilegeDB   = elem.privilegeDB
                privilegeFile = elem.privilegeFile
        }
    })


    if( privilegeDB === 'readOnly'){
            htmlFc.fullcontHTML.classList.add('mode-readOnly')
    }

    if( privilegeFile === 'none'){
            htmlFc.fullcontHTML.classList.add('mode-noFile')
    }



}/**/


export function closeBeforeExit(){ //console.log('>>closeBeforeExit')

    const allFullcont = document.querySelectorAll('.fullcont')
    var control = false
    console.log('allFullcont', allFullcont)
    
    allFullcont.forEach((elem)=>{
        if( elem.classList.contains('mode-edit') && elem.classList.contains('fullcont-show') ){
            let close = elem.querySelector('.fullcont-close')
          
           close.classList.add('a-shake')
           close.classList.add('error')
           close.click()
           snack.start({act: 'show', id:'closeBeforeExit'})
           

           removeLong(()=>{ 
                close.classList.remove('a-shake')
                close.classList.remove('error') 
            })

            // console.log('>>ELEMENTS OPENNED ON EDIT MODE')
            control =  true
        }
    })

    return control

}


/********CONTROL WINDOW RESIZE AND FULLCONT/SCRIM****************/
//avoid potencial error that the user resize the scrim :)
var isFullcontOpen = false

window.addEventListener('resize', ()=>{   console.log(`Screen resize`, ); 

  const size = window.innerWidth

  if( size > 1200 && isFullcontOpen){     //console.log('windows resized')
  
      if(size > 1800){
         scrimFullcont.classList.add('scrim-hide')
         scrimFullcont.classList.remove('scrim-show')

      }else{
         scrimFullcont.classList.add('scrim-show')
         scrimFullcont.classList.remove('scrim-hide')
      }
  }

});


function hideAnimation(elem, scrimFullcont){ //console.log(`hideAnimation`, elem)

  const size = window.innerWidth

  elem.classList.add('fullcont-hide');
  
  if(size < 1800){
        scrimFullcont.classList.add('scrim-hide')
  }

  remove(()=>{

        elem.classList.remove('fullcont-show');
        elem.classList.remove('fullcont-hide');
        scrimFullcont.classList.remove('scrim-show')
        scrimFullcont.classList.remove('scrim-hide')
  })
}


function remove(callback){
  setTimeout(()=>{
    callback()
  }, 250)
}

function removeLong(callback){
  setTimeout(()=>{
    callback()
  }, 450)
}

