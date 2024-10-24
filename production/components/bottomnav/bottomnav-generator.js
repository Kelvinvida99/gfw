


export function generator(detail){ // console.log('leftnav Generator>x ', detail)

  var body = ``
  const bottomnav  = document.getElementById('bottomnav')
  
  //Select the html elements
  for(let i=0; i < detail.length; i++){ //console.log( 'i', i, detail[i] )
  		body += bottomnavBody[detail[i].entity]
  } 

  body += bottomnavBody['home']
  body += bottomnavBody['monitor']

  //fill the leftmenu
  bottomnav.innerHTML = body

}





const bottomnavBody = {

	home: `
		  <div id='bottomnav-home-page'  data-detail='{"click": [ 
		                              {"dest":"ripple" }, 
		                              {"dest":"bottomnav" },
		                              {"dest":"home", "id":"home-page", "act":"show" } ] }' >
		    <svg><use xlink:href="./css/svg.svg#person"></use></svg>
		    <label>Home</label>
		  </div> `
	,


	goku: `
		  <div id='bottomnav-goku-page'  data-detail='{"click": [ 
		                               {"dest":"ripple" }, 
		                               {"dest":"bottomnav" },
		                               {"dest":"goku", "elem":"page", "id":"goku-page", "act":"show" } ] }' >
		    <svg><use xlink:href="./css/svg.svg#person"></use></svg>
		    <label> Goku </label>
		  </div> `
	,


	monitor: `
	  <div id='bottomnav-monitor-page'  data-detail='{"click": [ 
	                               {"dest":"ripple" }, 
	                               {"dest":"bottomnav" },
	                               {"dest":"monitor", "elem":"page", "id":"monitor-page", "act":"show"  } ] }' >
	    <svg><use xlink:href="./css/svg.svg#person"></use></svg>
	    <label>Monitor</label>
	  </div> `
	,


}


