const appbar = document.querySelector(".appbar");
const body   = document.querySelector("BODY");


var lastScrollTop = 0; 
var st = 0

function bodyScroll (){ return

	verticalMov = true//vertical true, horizontal false → tab.js
	st= window.pageYOffset || document.documentElement.scrollTop;
	
	const upDown = st > lastScrollTop ? 'down':'up';
	const device = window.innerWidth > 900 ? 'desktop':'mobile';

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

	// device === 'desktop'?  bodyScroll_desktop(upDown, st): 
	//                        bodyScroll_mobile (upDown, st)

	if (device === 'desktop') { 
		bodyScroll_desktop(upDown, st) 
		return
	}
	return
}

//on desktop only add or hide the shadown
//don't hide the appbar(don't exist)
function bodyScroll_desktop(upDown, st){
		if(st === 0){
			return appbar.classList.remove('bs-4')

		}else{
			return appbar.classList.add('bs-4')
		}
}

//on mobile, hide and show the shadown
//determine tab exist
function bodyScroll_mobile(upDown, st){
	//you always should have a .page_show un body (only one)
	const page = document.querySelector(".page_show")
	if( page === null ){ 
	 	return console.log('Error → body.js → bodyScroll_mobile() → should exist a .page_show')
	}
	const existTab  = page.querySelector('.tab')
	const tabPage   = page.querySelector('.tab-page')
	
	//whiout tab bar, just move the body and appbar
	if (existTab === null ){ 
			if(upDown === 'down'){ // 
				appbar.setAttribute("style", `top:-56px`)
				body.setAttribute("style", `margin-top: 0px`)
			}
			else{
	  		    st === 0 ? appbar.classList.remove("bs-4"):appbar.classList.add("bs-4")
				appbar.setAttribute("style", `top:0px`)
				body.setAttribute("style", `margin-top: 56px`)
			}

	}else{ //with tab bar

			if(upDown === 'down'){ // 
				//body.classList.add('no-scrolly')//block scroll, when move pages
				//console.log(st)
				// appbar.setAttribute("style", `top:-56px`)
				// existTab.setAttribute("style", `top:0px`)
				// body.setAttribute("style", `margin-top: 0px`)
				// tabPage.setAttribute("style", `margin-top: 0px`)				
				// existTab.classList.add("bs-4")
			}
			else{

	  		    st === 0 ? existTab.classList.remove("bs-4"):existTab.classList.add("bs-4")
				appbar.setAttribute("style", `top:0px`)
				existTab.setAttribute("style", `top:56px`)
				body.setAttribute("style", `margin-top: 56px`)	
				tabPage.setAttribute("style", `margin-top: 56px`)				

			}
	}


}

