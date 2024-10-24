
const fullcontForm  = require ('../fullcont/fullcont-form')
const fullcont             = require ('../fullcont/fullcont')
const dialog           = require ('../../components/dialog/dialog')

const map                  = require ('../map/map')



export function prepareAdd(detail, form, formCopy){  console.log(' stepperHandler prepareAdd>')

    //clean html
    fullcontForm.clean(form)
    
    //clean the form obj value
    fullcontForm.cleanFromValues(form, formCopy)


    form.forEach((elem)=>{ //we we have a map, load the current position
        if(elem.type === 'map'){  map.loadMyPosition(elem) }
    })/*foreach*/  

    fullcont.start({act:'show', id:detail.id})


}


export function hide(detail, form, formCopy){  console.log(' stepperHandler prepareAdd>')


    //if wasn't edited just clean and hide
    if( !wasEdited(detail, form, formCopy) ) { //console.log('edited just clean and hide') 
          fullcontForm.clean(form)
          fullcontForm.cleanFromValues(form, formCopy)
          fullcont.start({act:"hide", id:"goku-fullcont-withStepper"})
     } 
     

}


function wasEdited(detail, form, formCopy){ console.log('goku wasEdited @@@@@@@@@@@@@@>>>>>>>>>>>>>>')
    
    if( fullcontForm.wasEdited(form, formCopy) ) { 
        dialog.start({ act:"show", id:"saveChangesStepper", entity:detail.dest } )   
        return true
    }
    
    return false
}
