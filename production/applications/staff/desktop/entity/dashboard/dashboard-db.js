
const dbRequest = require('../../../../../js-network/db-request')
const snack = require('../../../../../components/snack/snack')


export function load(parameter,callback) {  
	
	loadDB(parameter)
		.then((result) => { //console.log('monitor result', result.data ) 

			callback(result.data)

		}).catch((error) => {  //console.log('ERROR DOWNLOADRING users for monitoring', error)  
			snack.start({ act: "showxxxxx", id: "downloadError" })
		})

}/*loadBasic*/


async function loadDB(parameter) { 
	


	const detail = { inf: parameter }
	//console.log('aaaaaaaaaaaaa aquii',detail)

	// const result = await dbRequest.start(detail, 'atoDelete/tvDashboardHome.php') 
	const result = await dbRequest.start(detail, 'server/php/sql/selectdashboard.php')



	if (result.status != "ok") { throw (result) }


	return result

}









