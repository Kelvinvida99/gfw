const fullCont  = require ('../../components/fullCont/fullCont')
const snack     = require ('../../components/snack/snack')


/****************ELEMENTS*****************/
var fullcontLogs 
var logger       
var loggerInput  

var wasSelectHtml = false
function selectHTML(){ console.log('LOGS >>>>>>>>>>>>>selectHTML')
    wasSelectHtml  = true

    fullcontLogs = document.getElementById('fullcont_logs')
    logger       = document.querySelector('#fullcont_logs .page')
    loggerInput  = document.getElementById('logs_input')

}
/****************ELEMENTS*****************/



function p_logs(func, ev){ console.log('p_logs')

    if(!wasSelectHtml) {selectHTML()}
        
    switch (func){
        case 'show' :   fullCont.show(null, fullcontLogs) ;    break;  
        case 'copy' :   copy() ;    break;  
        case 'share' :   share() ;    break;  

    }   


}



function copy(){ console.log('copyxxx8', loggerInput)

	loggerInput.setAttribute('value', logger.innerHTML);


	loggerInput.select()
    loggerInput.setSelectionRange(0, 999999)
    document.execCommand("copy")
    snack.show('Copied')


    // alert("Copied the text: ", loggerInput.value.replace(/<br\s*\/?>/mg,"\n") );

}

function share(){ console.log('share')
	// navigator.share()
}


// async function share ()  {console.log('share')
//   try {
//     await navigator.share('xxxxxxxxxxxx')
//     console.log('share good')
//   } catch(err) {
//     console.log('share error')
//   }
// }



module.exports = {
	p_logs:p_logs,
}