
// const textfieldHandler       = require('../textfield/textfield-handler')
// const loginError             = require('./login-error')

const snack = require('../snack/snack')



export function start(val){ console.log('ERROR HADNLER &&&', val)
    
    const smg = errors[val]

    if( smg === undefined ){
    	 snackCall('Database Error, description will be sent')
    	 return
    }

 	snackCall( smg.start() )
}/**/


function snackCall(msg){
	snack.start({ act:'show', id:'empty', msg: msg })
}

 




export function startRestriction(val){ console.log('#####*********', val,)
    

    	 snackCall(val)
   

 	//snackCall( smg.start() )
}/**///









const errors = {

  MySqlError:{ start: function(){  
	           return 'Database Error, description will be sent'   } },          //language.start('')     

  UserTrac:{ start: function(){  
	           return 'User Tracking Error, description will be sent'   } },     //language.start('') 

  FileError:{ start: function(){  
	           return 'Error with file request, description will be sent'   } },  //language.start('') 

  FolFileNameExist:{ start: function(){  
	           return 'Folder name already exist in this directory'   } },        //language.start('') 

  FolderError:{ start: function(){  
	           return 'Folder could not be created!'   } },     //language.start('') 

  FilePostVar:{ start: function(){  
	           return 'missing post variable: currentPath'   } },     //language.start('') 

  FileStrName:{ start: function(){  
	           return 'Invalid file/folder name, only letters,numbers and -_.() are allowed.'   } },     //language.start('') 	           

  FilNotExist:{ start: function(){  
	           return 'Folder or File doesn’t exist anymore, please reload the system!'   } },     //language.start('') 	

  FilUpFail:{ start: function(){  
	           return ' File Upload failed'   } },     //language.start('') 	           

  FileExt:{ start: function(){  
	           return 'Upload Failed, Unsupported file format or It is too large to upload!'   } },     //language.start('') 	

  InvReqType:{ start: function(){  
	           return 'Invalid Request type'   } },     //language.start('') 	       

	//only one for authorization
  notAllowed:{ start: function(){  
	           return 'You are not allowed to perform the requested action'   } }, 

			   	//only one for authorization
  SaleHasPayment    :{ start: function(){  
	return 'Sale cannot be edited because it has payments associated to it, please delete payments to be able to edit!'   } }, 

}/**/

