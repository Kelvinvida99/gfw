











///convert values string to json
export function barTest2(data){ try{   //console.log('### barTest2', data)

		data.forEach((elem)=>{ //console.log('elem', elem )
			elem.value = JSON.parse( elem.value )
		})

}catch(err){ console.log('err', err)} }/*createAllChart*/



//we convert the data from the server, to data format to creaste the charts
export function bubbleTest(data){ try{  //console.log('### bubleTest', data)

		data.forEach((elem)=>{  //console.log('elem', elem.x)
			elem.value = JSON.parse(elem.value)
		})


}catch(err){ console.log('err', err)} }/*createAllChart*/


export function totalRevenue(data){ try{ // console.log('### totalRevenue', data)

		data.forEach((elem)=>{ //console.log('elem', 5555, parseInt(elem.value.y) )
			elem.value = JSON.parse(elem.value)
			elem.color = 'blue'
		})

}catch(err){ console.log('err', err)} }/*createAllChart*/


/*****************NO ACTIVES FUNCTIONS********************/









//we convert the data from the server, to data format to creaste the charts
export function bubbleTestOld(data){ try{ // console.log('### bubleTest', data)

		const toReturn = [{
				            label:'Dept a',
				            color: "purple",
				            value: []		
		}]

		data.forEach((elem)=>{  //console.log('elem', elem.x)
			elem.x = parseInt(elem.x)
			elem.y = parseInt(elem.y)
			elem.r = parseInt(elem.r)

			toReturn[0].value.push(elem)
		})

		return toReturn

}catch(err){ console.log('err', err)} }/*createAllChart*/


//we convert the data from the server, to data format to creaste the charts
export function barTest(data){ try{   //console.log('### barTest', data)

		const toReturn = [{
				            label:'Dept a',
				            borderRadius: 0,
				            borderWidth:2,
				            color:'blue',
				            value: []		
		}]

		data.forEach((elem)=>{  //console.log('elem', elem.x)
			elem.y = parseInt(elem.y)
			toReturn[0].value.push(elem)
		})

		return toReturn

}catch(err){ console.log('err', err)} }/*createAllChart*/


//we convert the data from the server, to data format to creaste the charts
export function barSimple(data){ try{  // console.log('### barSimple', data)

		const toReturn = []

		data.forEach((elem)=>{ // console.log('elem', elem)
		let chartDetails = {
			            label:'Dept a',
			            borderRadius: 0,
			            borderWidth:2,
			            color:'blue',
			            value: []		
		}

		elem.num = parseInt(elem.num)
		chartDetails.value.push(elem)


		toReturn.push(chartDetails)


		})

		// console.log('### barSimple', toReturn)

		return toReturn

}catch(err){ console.log('err', err)} }/*createAllChart*/



//we convert the data from the server, to data format to creaste the charts
export function listTest(data){ try{  // console.log('### listTest', data)

		const toReturn = []

		data.forEach((elem)=>{  //console.log('elem', elem.x)
			let chartDetails = { icon:"home", title: elem.title, des:"", num:elem.num, color:""}
			//let chartDetails = { icon:"home", title: elem.title, des:"", num:elem.num, color:""}

			toReturn.push(chartDetails)

		})

		return toReturn

}catch(err){ console.log('err', err)} }/*createAllChart*/



//we convert the data from the server, to data format to creaste the charts
export function pieTest(data){ try{   //console.log('### pieTest', data)

		const toReturn = {
			label:[],
			color:['blue', "green", "red"],
			value:[]
		}

		for(let x=0 ; x < data.value.length ; x++) {
			toReturn.label[x]=data.label[x]
			toReturn.value[x]=data.value[x]

		}

		return toReturn

}catch(err){ console.log('err', err)} }/*createAllChart*/
