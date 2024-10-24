
const timeTime = require('../../js-handler/time-time')



export function start(detail){ //console.log('detail>',  detail )

    const elem = document.getElementById(detail.id)
    const perA = timeTime.covertDatePercent(detail.start)
    const perB = timeTime.covertDatePercent(detail.end) 

      elem.querySelector('.circle-a').style.left      = `${perA}%`
      elem.querySelector('.circle-a label').innerHTML = `${timeTime.formatAMPM(detail.start)}`

      elem.querySelector('.circle-b').style.left      = `${perB}%`
      elem.querySelector('.circle-b label').innerHTML = `${timeTime.formatAMPM(detail.end)}`

      elem.querySelector('.bar-active').style.left    = `${perA}%`
      elem.querySelector('.bar-active').style.width   = `${perB-perA}%` 


}



