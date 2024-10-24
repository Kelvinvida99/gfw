

//only those element are enable on the mobile
export function bodyAdmin(){
	return  [
        'homestaff',
        'goku',
        'users',
	]	
}




export function appnav(){
	return 	{

			homestaff: `
				  <div id='appnav-providers-page'  data-detail='{"click": [ 
				                              {"dest":"ripple" }, 
				                              {"dest":"appnav" },
				                              {"dest":"providers", "id":"providers-page", "act":"show" } ] }' >
				    <svg><use xlink:href="./css/svg.svg#person-o"></use></svg>
				    <label>Homeff</label>
				  </div> `
			,

			goku: `
				  <div id='appnav-goku-page'  data-detail='{"click": [ 
				                               {"dest":"ripple" }, 
				                               {"dest":"appnav" },
				                               {"dest":"goku", "elem":"page", "id":"goku-page", "act":"show" } ] }' >
				    <svg><use xlink:href="./css/svg.svg#person-o"></use></svg>
				    <label> Goku ff</label>
				  </div> `
			,


			users: `
			  <div id='appnav-users-page'  data-detail='{"click": [ 
			                               {"dest":"ripple" }, 
			                               {"dest":"appnav" },
			                               {"dest":"users", "elem":"page", "id":"users-page", "act":"show"  } ] }' >
			    <svg><use xlink:href="./css/svg.svg#person-o"></use></svg>
			    <label>Users ff</label>
			  </div> `
			,

		}
}
