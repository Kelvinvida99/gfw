

const timeTime = require('../../js-handler/time-time')

export function start(detail){ //console.log('timeValue start>',)

    switch (detail.act){
        case 'add':          add(detail);  break; 
        case 'remove':       remove(detail);  break; 
        case 'getValue':     getValue(func, ev);  break; 
    }
}



export function create(task){ //console.log('TIMEVALUE CREATE ####################### ')

  var body      = ''
  var comodin   = ''
  var allvalues = task.N_value.split('&&')
  var noRemoveOnFirst = false
  var requiredFlat = ''

  if(task.N_mandatory === "true")   { requiredFlat = 'multivalue-caution' }
  else                              { requiredFlat = ''                   }  



  body += `<div class='multivalue ${requiredFlat}' id="task_${task.id}">`
  body += `<div class="lineCont"   data-labels='{"label":"${task.N_name}", "helper":"${task.N_input_helper}"}' >`

    allvalues.forEach((value)=>{
      
          let twoValue  = value.split('@@')
          let timeValue = ( twoValue[1] === undefined ) ? '': `value="${twoValue[1]}"`
          var filled    =''

          if(twoValue[0] != '') filled = 'textfield-filled'

          body += `<div class="line  "> `
         
          //the first element, can't be removed 
          if(noRemoveOnFirst){ 
              body += `<div class="remove"  data-detail='{"click": [{"dest":"multivalue", "act":"remove"}]}' ></div>` 
              noRemoveOnFirst = true
          }        

          body += `<div class="contA ">

                            <div class="textfield  textfield-textarea textfield-multivalue ${filled}" >
                                <textarea  class= 'elem ' type="text" 
                                           data-detail='{"click": [ {"dest":"textfield", "act":"focused"  }], 
                                                           "key": [ {"dest":"textfield", "act":"typing"   }] }'>${twoValue[0]}</textarea>
                                <div class="indicador"></div>

                                <div class="trailing"  data-detail='{"click": [{"dest":"textfield", "act":"clear"}] }' >
                                  <svg><use xlink:href="./css/svg.svg#cancel"></use></svg>
                                </div>

                                <div class="label">${task.N_name}</div>  
                                <div class="helper">${task.N_input_helper}</div>
                            </div>

                        </div><!-- contA -->

                        <div class="contB" > 

                            <div class="textfield textfield-filled textfield-time">
                                <input  class= 'elem  inputTime' type="time" ${timeValue} >
                                <div class="indicador"></div>

                                <div class="label">Time</div> 
                                <div class="helper"></div>
                            </div>

                        </div><!-- contB -->
                      </div>
          `
    })/*forEAch*/

  body += `</div><!-- lineCont -->`
  body += `<div class="button button-flat button-multivalue"  data-detail='{"click": [{"dest":"multivalue", "act":"add"}]}' > <label>add value</label></div>`
  body += `</div><!-- multivalue -->`




    return body
}


export function getValue(task){  //console.log('TIME VALUE getValue >>>', task)

  const taskname   = document.getElementById(`task_${task.id}`)
  const lines      = taskname.querySelectorAll('.line')
  var   allvalues  = ''

  lines.forEach((line)=>{

      let textarea  =  line.querySelector('textarea').value 
      let time      =  line.querySelector('.inputTime').value
    
      //only add if we have time or value
      if(textarea != '' || time != ''){
         allvalues += `${textarea}@@${time}&&`
      }
      
  })/**/

  //avoid send to && at the end of the string
  if(allvalues.slice(-1) === '&'){
       allvalues =  allvalues.substring(0, allvalues.length - 2)
  }/**/



 return allvalues

}/**/


function remove(detail){  //console.log(' remove  >>>>>>>>>>>>>>>>>')

    const line   = detail.ev.target.parentElement
    line.remove()

}

function add(detail){  

  const parent     = detail.ev.target.parentElement
  const lineCont   = parent.querySelector('.lineCont')
  const labels     = JSON.parse( lineCont.getAttribute('data-labels') )
  const actualTime = timeTime.getTimeToInput()
 
  const newLine  = `
            <div class="line">
              <div class="remove"  data-detail='{"click": [{"dest":"multivalue", "act":"remove"}]}' ></div>
              <div class="contA ">

                  <div class="textfield textfield-textarea textfield-multivalue " >
                    <textarea  class= 'elem ' type="text" 
                               data-detail='{"click": [ {"dest":"textfield", "act":"focused"  }], 
                                               "key": [ {"dest":"textfield", "act":"typing"   }] }'></textarea>
                    <div class="indicador"></div>

                    <div class="trailing"  data-detail='{"click": [{"dest":"textfield", "act":"clear"}] }' >
                      <svg><use xlink:href="./css/svg.svg#cancel"></use></svg>
                    </div>


                    <div class="label" >${labels.label}</div>  
                    <div class="helper">${labels.helper}</div>
                  </div>

              </div><!-- contA -->

              <div class="contB" > 

                  <div class="textfield textfield-filled textfield-time">
                      <input  class= 'elem inputTime' type="time" value="${actualTime}" >
                      <div class="indicador"></div>

                      <div class="label">Time</div> 
                      <div class="helper"></div>
                  </div>

              </div><!-- c50 -->
            </div>
  `

  lineCont.insertAdjacentHTML("beforeend", newLine)  

}


///     <div class='timeValueBody' class='bc-devider' >asdfad </div>