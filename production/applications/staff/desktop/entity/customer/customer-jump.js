

const page          = require('../../../../../components/page/page')
const fullcontJump  = require('../../../../../components/fullcont/fullcont-jump')

const click      = require('../../../../../js/click')


export function start(detail){  //console.log('goku-dt 5>', detail)
         
      obj[detail.actJump].start(detail)

}/**/




const obj = {
   
      goToInvestor:        { start: (detail)=>{  goToInvestor(detail)         }},


}


function goToInvestor(detail){ console.log('goToInvestor >>>>>>>>>>>>>>>>>>>>>>>>', detail)
      
   //show the page
   click.start({dest: 'investor', elem: 'page', act: 'show', id: 'investor-page'})   

   //fullcontJump.searchOnPage({ dtId: 'investor-dt', value: 'investor23' })
   fullcontJump.searchOnPage(detail)


}/**/
