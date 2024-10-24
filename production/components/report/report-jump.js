

const page          = require('../page/page')
const fullcontJump  = require('../fullcont/fullcont-jump')
const click         = require('../../js/click')


export function start(detail){  console.log('Report Jump act start>', detail)
         
      obj[detail.actJump].start(detail)

}/**/




const obj = {
   
      goToSales:        { start: (detail)=>{  goToSales(detail)         }},
      goToPurchase:        { start: (detail)=>{  goToPurchase(detail)         }},
      goToProvider:     { start: (detail)=>{  goToProvider(detail)         }},


}


function goToPurchase(detail){ console.log('goToPurchase >>>>>>>>>>>>>>>>>>>>>>>>', detail)
      
   //show the page
   click.start({dest: 'purchase', elem: 'page', act: 'show', id: 'purchase-page'})   

   //fullcontJump.searchOnPage({ dtId: 'investor-dt', value: 'investor23' })
   fullcontJump.searchOnPage(detail)


}/**/



function goToSales(detail){ console.log('goToSales >>>>>>>>>>>>>>>>>>>>>>>>', detail)
      
   //show the page
   click.start({dest: 'sale', elem: 'page', act: 'show', id: 'sale-page'})   

   //fullcontJump.searchOnPage({ dtId: 'investor-dt', value: 'investor23' })
   fullcontJump.searchOnPage(detail)


}/**/

function goToProvider(detail){ console.log('goToProvider >>>>>>>>>>>>>>>>>>>>>>>>', detail)
      
   //show the page
   click.start({dest: 'provider', elem: 'page', act: 'show', id: 'provider-page'})   

   //fullcontJump.searchOnPage({ dtId: 'investor-dt', value: 'investor23' })
   fullcontJump.searchOnPage(detail)


}/**/

