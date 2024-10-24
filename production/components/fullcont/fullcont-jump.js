const leftnav            = require ('../leftnav/leftnav')
const keyHandler         = require ('../../js/key-handler')
const dbRequest          = require ('../../js-network/db-request')
const page          = require('../page/page')
const click         = require('../../js/click')

export function start(detail){  console.log('FULLCONT JUMP>', detail)
         
      obj[detail.actJump].start(detail)

}/**/



const obj = {
   
      fromFullcont:      { start: (detail)=>{  fromFullcont(detail)  }},
      searchOnPage:      { start: (detail)=>{  searchOnPage(detail)     }},
      goToSales:         { start: (detail)=>{  goToSales(detail)        }},
      goToPurchase:      { start: (detail)=>{  goToPurchase(detail)        }},
      goToSendPayment:   { start: (detail)=>{  goToSendPayment(detail)  }}


}/**/


export function searchOnPage(detail){console.log('searchOnPage############### 8888888888888888>', detail)

    //wait until the dbrequest is done
    waitDbRequest((result)=>{ console.log('waitDbRequest>')
          
           //fill the search
           const dtTarget      = document.getElementById(detail.dtId)
           const searchInput   = dtTarget.querySelector('.searchInput')
           const searchArea    = dtTarget.querySelector('.searchArea')
           const searchDiv     = dtTarget.querySelector('.searchDiv')

           console.log('waitDbRequest############### is done>', searchInput)
           // console.log('waitDbRequest############### is done>', searchArea)

           searchInput.value   = detail.toSearch

           searchArea.classList.add('search-filled')
           searchArea.classList.add('a-shake')
           searchDiv.classList.add('search-highlight')

            setTimeout(()=>{ 
                //press enter
                keyHandler.keyUpByInput(searchInput)
                searchArea.classList.remove('a-shake')  
                searchDiv.classList.remove('search-highlight')
               clickFirstTr(detail, dtTarget, searchInput)
            

            },350)   
    })
}

export function goToSales(detail){ console.log('goToSales >>>>>>>>>>>>>>>>>>>>>>>>', detail)
      
   //show the page
   click.start({dest: 'sale', elem: 'page', act: 'show', id: 'sale-page'})   

   //fullcontJump.searchOnPage({ dtId: 'investor-dt', value: 'investor23' })
   searchOnPage(detail)
}/**/


export function goToPurchase(detail){ console.log('goToPurchase >>>>>>>>>>>>>>>>>>>>>>>>', detail)
      
   //show the page
   click.start({dest: 'purchase', elem: 'page', act: 'show', id: 'purchase-page'})   

   //fullcontJump.searchOnPage({ dtId: 'investor-dt', value: 'investor23' })
   searchOnPage(detail)
}/**/

export function goToSendPayment(detail){ console.log('goToSendPayment >>>>>>>>>>>>>>>>>>>>>>>>', detail)
      
   //show the page
   click.start({dest: 'sentpayment', elem: 'page', act: 'show', id: 'sentpayment-page'})   

   //fullcontJump.searchOnPage({ dtId: 'investor-dt', value: 'investor23' })
   searchOnPage(detail)
}/**/

//if only exist one result, this will click the first one
function clickFirstTr(detail, dtTarget, searchInput){ // console.log('clickFirstTr###############>', )

   // const dtTarget = document.getElementById(detail.dtId)

    waitFinishSearching(searchInput, (result)=>{ //console.log('clickFirstTr readyyyyyyyyy#>', result)
       
        if(result){// on time out wont enter here
            const allTr    = dtTarget.querySelectorAll('tr')

            console.log( 'allTr>', allTr.length, allTr[1].classList.contains('trEmpty')   ) 

            //no click if we have more than one result
            if(allTr.length === 2 && allTr[1].classList.contains('trEmpty') === false){  console.log('Go to click the TR')
                const firstTd = allTr[1].querySelectorAll('td')
                 firstTd[1].click()
                //console.log('we only have two',)
            } else { 
                //console.log('DONT CLICK THE TR Go to click the TR') 
            }           
        }
    })
}/**/


//we wait unthing dt-handler, searching, remove the searching class on the input on the input
function waitFinishSearching(searchInput, callback){  //console.log('searchInputAAAAAAAAAAAAAAAA>')
    
    var count  = 0

    const interval = setInterval(()=>{   // console.log('count', count)
        
        //search returned
        if( searchInput.classList.contains("searching") === false ){
            clearInterval(interval)
            callback(true)
        }   
        
        if(count === 200){
            clearInterval(interval)
            callback(false)
        }

        count = count+1

    },100)
}/**/



function waitDbRequest(callback){
    var count  = 0

    const interval = setInterval(()=>{  console.log('waitDbRequest>', dbRequest.isSearching())  
        
        //start the search
        //if( dbRequest.isSearching() === true )  {  }
        
        //search returned
        if( dbRequest.isSearching() === false ){
            clearInterval(interval)
            callback(true)
        }   
        
        if(count === 200){
            clearInterval(interval)
            callback(false)
        }

        count = count+1

    },100)
}/**/









function remove(callback){
  setTimeout(()=>{
    callback()
  }, 350)
}


