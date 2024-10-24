

const pdfStyle   = require('./pdf-style')
const pdfHandler = require('./pdf-handler')
const pdfBarCode = require('./pdf-barcode')
const math       = require ('../../js-handler/math')
const timeDate   = require ('../../js-handler/time-date')
const string     = require ('../../js-handler/string')
const bwipjs     = require('bwip-js');


const { jsPDF }  = require('jspdf')
require('jspdf-autotable')





//barcode label 1"x2", just code and des max24Characeter
//label.create2x1({top: 'this is the top label', code: 'ADG12324582GHJUG', bottom: 'K & A Produce'})
export function create3x2(data){  //console.log('goku-dt 5>', data)
	 
	const doc = new jsPDF({
	  format: 'letter', //permite agregar parrafos
	  orientation: 'portrait', // 'portrait' 'landscape'
	  unit: 'in',
	  format: [3, 2], // 2 pulgadas por 1 pulgada
	});


	pdfStyle.small8(doc)
	pdfHandler.centerText(doc, 0.15, data.top)

	pdfHandler.drawLine(doc, 0.20)//-----------------------------------------------------
	

	pdfStyle.small8(doc)
	doc.text('Price', 0.10, 0.35)

	pdfStyle.title(doc)
	doc.text('$1,000,000', 0.10, 0.53)


	pdfStyle.small8(doc)
	doc.text('Date', 1.01, 0.35)

	pdfStyle.title(doc)
	doc.text('Jan 14, 2024', 1.01, 0.53)


	pdfHandler.drawLine(doc, 0.62)//-----------------------------------------------------


	pdfStyle.small8(doc)
	doc.text('Provider', 0.10, 0.76)

	pdfStyle.title(doc)
	doc.text('Peru vestables', 0.10, 0.92)


	pdfHandler.drawLine(doc, 1.02)//-----------------------------------------------------


	pdfStyle.small8(doc)
	doc.text('Description', 0.10, 1.14)

	const text = "Este es un texto largo que se romperá en múltiples líneas para demostrar cómo jsPDF maneja automáticamente la división de texto.";
	pdfStyle.small6(doc)
	pdfHandler.addParra(doc, 1.29, text)



	pdfHandler.drawLine(doc, 1.7)

                                                     //px  py     wid  hei      
    doc.addImage( pdfBarCode.create(data.code), 'PNG', 0.1, 1.8 , 1.8, 0.95)

	pdfStyle.small8(doc)
	pdfHandler.centerText(doc, 2.9, data.code)

	// doc.text('Texto debajo de la tabla', 20, lastTablePosY + 10);
	doc.save(data.pdfName)


}/**/




//barcode label 1"x2", just code and des max24Characeter
//label.create2x1({top: 'K&A - this is the top label', code: 'ADG12324582GHJUG'})
export function create2x1(data){  //console.log('goku-dt 5>', data)
	 

	const doc = new jsPDF({
	  orientation: 'landscape', // 'portrait' 'landscape'
	  unit: 'in',
	  format: [1, 2], // 2 pulgadas por 1 pulgada
	});


	pdfStyle.small(doc)
	pdfHandler.centerText(doc, 0.15, data.top)
	//doc.text(data.pdfName, 0.2, 0.2);

                                                     //px  py     wid  hei      
    doc.addImage( pdfBarCode.create(data.code), 'PNG', 0.1, 0.20 , 1.8, 0.60)

	pdfStyle.small(doc)
	pdfHandler.centerText(doc, 0.93, data.code)

	// doc.text('Texto debajo de la tabla', 20, lastTablePosY + 10);
	doc.save(data.pdfName)


}/**/
