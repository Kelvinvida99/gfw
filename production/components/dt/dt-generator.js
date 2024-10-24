

export function addBody(data, htmlDt, cleanTable ){ //console.log('addBody>########', data)

	if(data[0].id === 'nothing' ) {
			emptyTable(data, htmlDt)
			return
	}

	var body   = ''

	//PRINT > [check] [row1]  [row1]  [row1]  [row1] 
		data.forEach((row)=>{ //console.log('row', row)
			 
			var newTableDetail =   htmlDt.tdDataDetail.replaceAll('#dbid', row.id )

		  var trDetail = ''
		  if( row.trDetail != undefined ) { trDetail = row.trDetail}

					  	
			body +=`<tr id='${htmlDt.dest}-tableRow-${row.id}' ${trDetail}>`	
				body += `<td> <input class = "checkAll" type="checkbox"  
				               data-detail='{"click":[{"dest":"dt", "act":"checkboxTd"}]}' >
				          <div class='id'>${row.id}</div>
				         </td>`
				
			

				//CHECKING & SETTING UP  AVATAR
				row = avatarSetup(row)

				
				row.colum.forEach(function(key) {

					  //avoid undefined span
					  var span = key.span
					  if( span === undefined ) { span = ''}


					const style = rowStyle(key)
					
						body += `<td ${newTableDetail} class="${style.tdClass}"' title="${style.title}" > 
						          	<label> ${key.label} </label>
												<span>  ${span}</span>
												${style.avatar}
												${style.svg}
										</td>`
				});
				
			   body +=`</tr>`
		})  

		//normally usage for load more
		if( cleanTable === true){// console.log('TABLE CLEANEDDDDDDDDDDDDDDDDDDDDDDD')
			 htmlDt.dtBody.innerHTML = ''
		}
		
		htmlDt.dtBody.insertAdjacentHTML("beforeend", body)  

}/*addBody*/



function avatarSetup(row){

	
	//CHECKING IF ROW HAS SEX
		if(!row.hasOwnProperty('sex')){
			row.sex = 'person';
		}else if(row.sex.toLowerCase() !="female" && row.sex.toLowerCase() !="male"){
			row.sex = 'person';
		}


	
	row.colum.forEach(function(key,index) {
		if(key.hasOwnProperty('style')){
			if(key.style.hasOwnProperty('avatar')){
				if(key.style.avatar == ""){
					key.style.avatar = "css/img/pic/"+row.sex.toLowerCase()+".svg";
					row.colum[index] = key;
				}		
			}
		}
	});

	return row;

}




//function rowStyle(key, sex = "NA"){ ///console.log('TABLE keykeykeykey', key.style)
function rowStyle(key){ ///console.log('TABLE keykeykeykey', key.style)

	var obj = { tdClass:'', svg:'', avatar: '', title:'' }

	if(key.style === undefined){  return obj }

	if(key.style.tdClass != undefined){
		 obj.tdClass = key.style.tdClass
	}


	if (key.style.avatar != undefined){
		obj.avatar = `<div class="avatarOnTD" style="background-image: url('${key.style.avatar}');" ></div>`	
	}

	
	if (key.style.svg != undefined){
		 obj.svg = `<svg><use xlink:href="${key.style.svg}"></use></svg>`
	}

	if (key.style.title != undefined){
		 obj.title = key.style.title
	}	

	return obj

}

/*


*/


function emptyTable(data, htmlDt){

	var body   = ''

	//PRINT > [check] [row1]  [row1]  [row1]  [row1]	 
			body +=`<tr > <td></td>`	
			
				//#dbid > see tableDetail.tdDataDetail
				data[0].colum.forEach(function(key) {

						body += `<td> 
					          	<label> ${key.label} </label>
											<span>  ${key.span}</span>
										 </td>`
				});
				
			  body +=`</tr>`


		htmlDt.dtBody.insertAdjacentHTML("beforeend", body)

}/**/


export function addRow(detail, htmlDt){  //console.log('addRow #####', detail, htmlDt)

	try{

	var body = ''

	const row = htmlDt.organizeRow(detail.row)

	const newTableDetail =   htmlDt.tdDataDetail.replaceAll('#dbid', detail.row[0].id )

			body +=`<tr id='${htmlDt.dest}-tableRow-${detail.row[0].id}' >`	
				body += `<td> <input class = "checkAll" type="checkbox"  data-detail='{"click":[{"dest":"dt", "act":"checkboxTd"}]}' ></td>`
				

				//SETTING UP AVATAR
				row[0] = avatarSetup(row[0]);

				//#dbid > see tableDetail.tdDataDetail
				row[0].colum.forEach(function(key) {

					  //avoid undefined span
					  var span = key.span
					  if( span === undefined ) { span = ''}

					  const style = rowStyle(key)

						body += `<td ${newTableDetail} class="${style.tdClass}"' title="${style.title}" > 
						          	<label> ${key.label} </label>
												<span>  ${span}</span>
												${style.avatar}
												${style.svg}
										</td>`
				});

			body +=`</tr>`
			
			htmlDt.dtBody.insertAdjacentHTML("afterbegin", body);  

			shakeTr(`${htmlDt.dest}-tableRow-${detail.row[0].id}`)


	}catch(error){console.log('addRow #####', error) }


}/*addRow*/





export function updateRow(detail, htmlDt){ ///console.log('updateRow>@@@@@@@', detail, htmlDt)
	
	var body = ''

//console.log('updateRow>', `${htmlDt.dest}-tableRow-${detail.row[0].id}`, )
	const HTMLrow = document.getElementById(`${htmlDt.dest}-tableRow-${detail.row[0].id}`)

  const row = htmlDt.organizeRow(detail.row)

 // console.log('updateRow>>>>>>>>>>>>>>>', row, )

	const newTableDetail =   htmlDt.tdDataDetail.replaceAll('#dbid', detail.row[0].id )


	body += `<td> <input type="checkbox"  data-detail='{"click":[{"dest":"dt", "act":"checkboxTd"}]}' ></td>`
	
	//SETTING UP AVATAR
	row[0] = avatarSetup(row[0]);


	//#dbid > see tableDetail.tdDataDetail
	row[0].colum.forEach(function(key) {
		
		  //avoid undefined span
		  var span = key.span
		  if( span === undefined ) { span = ''}


			const style = rowStyle(key)

			body += `<td ${newTableDetail} class="${style.tdClass}"' title="${style.title}" > 
			          	<label> ${key.label} </label>
									<span>  ${span}</span>
									${style.avatar}
									${style.svg}
							</td>`
	});


	HTMLrow.innerHTML = body 
	shakeTr( undefined , HTMLrow)


}/*addRow*/



export function updateRow_OLD_TODELTE(detail, htmlDt){ //console.log('updateRow>', detail, )
	
	var body = ''

//console.log('updateRow>', `${htmlDt.dest}-tableRow-${detail.row[0].id}`, )

	const HTMLrow = document.getElementById(`${htmlDt.dest}-tableRow-${detail.row[0].id}`)

  const row = htmlDt.organizeRow(detail.row)

  console.log('updateRow>>>>>>>>>>>>>>>', row, )


	const newTableDetail =   htmlDt.tdDataDetail.replaceAll('#dbid', detail.row[0].id )


	body += `<td> <input type="checkbox"  data-detail='{"click":[{"dest":"dt", "act":"checkboxTd"}]}' ></td>`
	
	//#dbid > see tableDetail.tdDataDetail
	row[0].colum.forEach(function(key) {

			body += `<td ${newTableDetail}' > 
		          	<label> ${key.label} </label>
								<span>  ${key.span}</span>
							 </td>`
	});


	HTMLrow.innerHTML = body 
	shakeTr( undefined , HTMLrow)


}/*addRow*/



export function deleteRow(detail){ console.log('deleteRow>', `${detail.dest}-tableRow-${detail.dbid}`)
			
			detail.dbid.forEach((id)=>{
				
				let row = document.getElementById(`${detail.dest}-tableRow-${id}`)
				
				//don't try to remove if don't exist, 
				//in case that the command was get from webscoket
				if( row != null || row != undefined ){
					
					row.classList.add('tr-deleteRow')
					removeLong(()=>{ row.remove() })	
				}

			
			})

}/*addRow*/


//shake can be by id or HTML selection
function shakeTr(id, HTMLrow){ //console.log('shakeTr>')

		var tr = undefined
	
		if(id != undefined){
			 tr = document.getElementById(id)
		
		}else{ tr = HTMLrow }

		tr.classList.add('tr-notice')
		remove(()=>{ tr.classList.remove('tr-notice') })
}



function remove(callback){
  setTimeout(()=>{ callback() }, 600)
}

function removeLong(callback){
  setTimeout(()=>{  callback()  }, 900)
}




//when happend a error downloading the data from the server
//show the Reload btn ad the btn of the table dt-error
export function error(detail){ ///console.log('dt generator error', detail )

	var body = ''

	body +=`
        <tr>
          <th> </th>    
          <th> ERROR Downloading data </th>
        </tr>

        <tr>
          <td> </td>    
          <td data-detail='{"click":[{"dest":"ripple"},
                                     {"dest":"${detail.dest}", "elem":"${detail.elem}",  "act":"${detail.act}" } ]}' >
                                     Reload</td>
        </tr>
	`
	return body
}




