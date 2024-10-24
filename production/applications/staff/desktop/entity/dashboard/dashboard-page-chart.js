const pageDB         = require('./dashboard-db')
const handler        = require('./dashboard-page-chart-handler')
const chartjs        = require('../../../../../components/chart/chartjs')
const dashboardSnack = require('./dashboard-snack')
const {changeSVG}    = require('../../../../../js-handler/graphic')

/****************ELEMENTS*****************/
var HTMLwasSelected = false
const allCharts = {

	barSimple: { html: '', chart: '', },
	//pieSimple: { html: '', chart: '', },
	


}


let timeoutId;

function HTMLselect(detail) { //console.log('goku init>')
	HTMLwasSelected = true
	allCharts.barSimple.html = document.getElementById('chartBar')
	//allCharts.pieSimple.html = document.getElementById('chartPie')




}/*init*/
/****************ELEMENTS*****************/

export function start(detail) {  //console.log('TV page Chart >', detail)

	if (!HTMLwasSelected) { HTMLselect(detail) }

	obj[detail.act].start(detail)
}


const obj = {

	createAllChart: { start: (detail) => { createAllChart({action: "create"}) } },
	searchbydate: 	{ start: (detail) => { searchbydate() } 					},
	searchbybutton: { start: (detail) => { searchbybutton(detail) 				}},


}/**/


function createAllChart(parameter) {

	pageDB.load(parameter,(result) => {  // console.log('########## GO TO CREATE ALL CHARTS pieTestX', result.pieTest )  

		if (result.barsimple.length > 0) {


			if (allCharts.barSimple.chart != '') {
				allCharts.barSimple.chart.destroy();
			}
			

			let barsimple = handler.barsimple(result.barsimple)

			chartjs.start({
				elem: 'bar', act: 'createSimple', targetChart: allCharts.barSimple,
				data: barsimple, options: { aspectRatio: 10 / 4, legend: false }
			})

		}


	})



}/*createAllChart*/



export function searchbydate() {

	// Limpiar el temporizador anterior
	clearTimeout(timeoutId);
 
	// Establecer un nuevo temporizador de 3 segundos
	timeoutId = setTimeout(function () {
	   let input_date_from = document.querySelector('#dashboard_form_date_from input');
	   let input_date_do   = document.querySelector('#dashboard_form_date_to input');
 
	   input_date_from.parentElement.classList.remove('textfield-error')
 
 
	   if (!isNaN(new Date(input_date_from.value + 'T00:00:00').getTime()) && !isNaN(new Date(input_date_do.value + 'T00:00:00').getTime())) {

		  let date_from = new Date(input_date_from.value + 'T00:00:00');
		  let date_to   = new Date(input_date_do.value + 'T00:00:00')
 
		  if (date_from > date_to) {
			 dashboardSnack.start({ act: 'show', id: 'fromisgreater' });
 
			 let parentdate = input_date_from.parentElement;
			  let trailing  = parentdate.querySelector('.trailing')	
			 parentdate.classList.add('textfield-error')
				changeSVG(trailing, 'error')
		  }
		  else{
			 let formdata = {action: "update" ,date_from: input_date_from.value, date_to: input_date_do.value}
 
			 createAllChart(formdata);
		   
		  }
 
 
	   }
	}, 1000);
 
 
 
 
}


export function searchbybutton(detail) {

	// Limpiar el temporizador anterior
	clearTimeout(timeoutId);

	timeoutId = setTimeout(function () {
		let period         = document.querySelector("#dashboard_period select");
		let value          = period.value;
		let selectedOption = period.selectedOptions[0];
		let data_detail    = "";
		try {
			data_detail = JSON.parse(selectedOption.getAttribute('data-detail'));
		} catch (error) {
			console.error("Error parsing JSON:", error);
			return;
		}
		let typedate = data_detail.period;
		
		let formdata = { action: "update", typedate: typedate, value: value };

		createAllChart(formdata);

	}, 500);

}
 
