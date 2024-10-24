
export function start( code ){ // console.log('Menu Type -> ', detail)
  	return authetication[code].start()
}


export const authetication = {
    
  ForcedLogOut:{ start: function(){  
	           return `You've been logged out by an administrator!`   } },     //language.start('') 	

  IpChanged:{ start: function(){  
	           return 'Seems like your IP has changed, please try to login again!'   } },     //language.start('') 	           

  expired:{ start: function(){  
	           return 'Your session has expired'   } },     //language.start('') 	

  login:{ start: function(){  
	           return 'Try to login.'   } },     //language.start('') 	           

  tooManyFailed:{ start: function(){  
	           return 'Too many filed login attemps, please try after 6 minutes'   } },     //language.start('') 	

  authFailed:{ start: function(){  
  					 return 'Try to authenticate'   } },     //language.start('') 
	           //return 'Authentication failed'   } },     //language.start('') 	           

  CompFailed:{ start: function(){  
	           return 'No user found on company database'   } },     //language.start('') 	

  loggedOut:{ start: function(){  
	           return `You've been logged out`   } },     //language.start('') 	

  lockedAcc:{ start: function(){  
	           return `Your account is locked, contact your administrator to unlock`   } },     //language.start('') 	
	           




}/**/








export const autorization = {
          
  notAllowed:{ start: function(){  
	           return 'You are not allowed to perform the requested action'   } },     //language.start('') 	


}/**/







  // ____________:{ start: function(){  
	 //           return '____________'   } },     //language.start('') 	           

  // ____________:{ start: function(){  
	 //           return '____________'   } },     //language.start('') 	





