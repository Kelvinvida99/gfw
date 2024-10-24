
const stepperFooterGenerator = require('../stepper/stepper-footer-generator')

//we should get an buttom to close o a stepper
export function start(html){ // console.log('OOOOOOOOOOOOOOOOOOOnboard> GENERATOR', html[0].stepper.page )

  ////Generate Element
  var body = ``

  for(let i=0; i< html.length; i++){
	  	body+=`
			   <div class="page page-${i+1} ">

			       <div class="row h-100">
			          <div class="c50 h-100 ${html[i].pageColor}" > 

			                <div class="illustration-onboard">
			                    <img src="${html[i].svg}">
			                </div>

			                <div class="logo-gray"></div>

			          </div><!-- c50 -->
			          <div class="c50 h-100"> `

								  	//page righ content
			body+=` <div class="title">${html[i].title}</div> `

			  	for(let j=0; j< html[i].des.length; j++){
						
						body+=`<div class="subtitle">${html[i].des[j].subtitle}</div> `
						body+=`<div class="des">${html[i].des[j].des  }</div> `

					}
			if(html[i].btn != ''){
					body+=` 
						 <div class="button ${html[i].btnclass}">
						    <svg><use xlink:href="${html[i].icon}"></use></svg>
						    <label>${html[i].btn}</label>        
						</div>		
					`
			}

	  	body+=`
			                <div class="logo"></div>

			          </div><!-- c50 -->
			        </div><!-- row -->
			   </div><!-- page -->
	  	`

  }/*body*/

	if(html[0].stepper.pages != undefined){
		body+=stepperFooterGenerator.start(html[0].stepper)
	}



  return body

}



