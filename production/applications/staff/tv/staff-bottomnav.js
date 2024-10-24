


export function bodyAdmin(){
	return  [
        'homestaff',
        'goku',
        'users',
	]	
}


//const entities["goku"] = {"mobile":{edit: true}};

export function body(){
	return 	{

			homestaff: `
				  <div id='bottomnav-homestaff-page'  data-detail='{"click": [ 
				                              {"dest":"ripple" }, 
				                              {"dest":"bottomnav" },
				                              {"dest":"homestaff", "id":"homestaff-page", "act":"show" } ] }' >
				    <svg><use xlink:href="./css/svg.svg#person-o"></use></svg>
				    <label>Home</label>
				  </div> `
			,

			goku: `
				  <div id='bottomnav-goku-page'  data-detail='{"click": [ 
				                               {"dest":"ripple" }, 
				                               {"dest":"bottomnav" },
				                               {"dest":"goku", "elem":"page", "id":"goku-page", "act":"show" } ] }' >
				    <svg><use xlink:href="./css/svg.svg#person-o"></use></svg>
				    <label> Goku </label>
				  </div> `
			,


	

			users: `
			  <div id='bottomnav-users-page'  data-detail='{"click": [ 
			                               {"dest":"ripple" }, 
			                               {"dest":"bottomnav" },
			                               {"dest":"users", "elem":"page", "id":"users-page", "act":"show"  } ] }' >
			    <svg><use xlink:href="./css/svg.svg#person-o"></use></svg>
			    <label>Users</label>
			  </div> `
			,

		}
}


