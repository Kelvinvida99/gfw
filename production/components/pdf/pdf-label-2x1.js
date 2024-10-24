

const pdfStyle   = require('./pdf-style')
const pdfHandler = require('./pdf-handler')
const pdfBarCode = require('./pdf-barcode')


const { jsPDF }  = require('jspdf')
require('jspdf-autotable')





//barcode label 1"x2", just code and des max24Characeter
//label.create2x1({top: 'K&A - this is the top label', code: 'ADG12324582GHJUG'})
export function start(data){  //console.log('goku-dt 5>', data)
	 

	const doc = new jsPDF({
	  orientation: 'landscape', // 'portrait' 'landscape'
	  unit: 'in',
	  format: [1, 2], // 2 pulgadas por 1 pulgada
	});


	pdfStyle.small8(doc)
	pdfHandler.centerText(doc, 0.15, data.top)
	//doc.text(data.pdfName, 0.2, 0.2);

                                                     //px  py     wid  hei      
    doc.addImage( pdfBarCode.create(data.code), 'PNG', 0.1, 0.20 , 1.8, 0.60)

	pdfStyle.small8(doc)
	pdfHandler.centerText(doc, 0.93, data.code)

	// doc.text('Texto debajo de la tabla', 20, lastTablePosY + 10);
	doc.save(data.pdfName)


}/**/
