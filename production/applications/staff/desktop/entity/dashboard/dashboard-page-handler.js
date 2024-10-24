const dashboardSnack = require('./dashboard-snack')
const {changeSVG}    = require('../../../../../js-handler/graphic')
const pageDB         = require('./dashboard-db')
const chartjs        = require('../../../../../components/chart/chartjs')


let timeoutId;

export function searchbydate() {

   // Limpiar el temporizador anterior
   clearTimeout(timeoutId);

   // Establecer un nuevo temporizador de 3 segundos
   timeoutId = setTimeout(function () {
      let input_date_from = document.querySelector('#dashboard_form_date_from input');
      let input_date_do   = document.querySelector('#dashboard_form_date_to input');

      input_date_from.parentElement.classList.remove('textfield-error')




      if (!isNaN(new Date(input_date_from.value + 'T00:00:00').getTime()) && !isNaN(new Date(input_date_do.value + 'T00:00:00').getTime())) {

         //due_date.value = timeDate.convertDateToInput( new Date().setDate(new Date(sale_date.value + 'T00:00:00').getDate()+parseInt(sale_form_terms.value)));

      
         let date_from = new Date(input_date_from.value + 'T00:00:00');
         let date_to = new Date(input_date_do.value + 'T00:00:00')

         if (date_from > date_to) {
            dashboardSnack.start({ act: 'show', id: 'fromisgreater' });

            let parentdate = input_date_from.parentElement;
	         let trailing   = parentdate.querySelector('.trailing')	
            parentdate.classList.add('textfield-error')
			   changeSVG(trailing, 'error')
         }
         else{
            let formdata = {action: "update" ,date_from: input_date_from.value, date_to: input_date_do.value}

            updateAllChart(formdata);
          
         }


      }
   }, 1000);




}



export function updateAllChart(parameter) {
	

	pageDB.load(parameter,(result) => { 

      if (result.barsimple.length > 0) {

			/////////////////////////////////////FIRST LINE

			let barsimple = handler.barsimple(result.barsimple)

			chartjs.start({
				elem: 'bar', act: 'createSimple', targetChart: allCharts.barSimple,
				data: barsimple, options: { aspectRatio: 10 / 4, legend: false }
			})

			

			let piesimple = handler.piesimple(result.barsimple)

			chartjs.start({elem:'pie', 
				act:'createSimple', 
				targetChart: allCharts.pieSimple, //html selecteed    
				data: piesimple, 
				options:[{ name: 'aspectRatio', value:  10/4 } ]  })



		}

	})



}
