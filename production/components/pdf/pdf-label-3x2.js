const pdfStyle   = require('./pdf-style')
const pdfHandler = require('./pdf-handler')
const pdfBarCode = require('./pdf-barcode')
const math       = require ('../../js-handler/math')
const string     = require ('../../js-handler/string')

const { jsPDF }  = require('jspdf')
require('jspdf-autotable')

//barcode label 1"x2", just code and des max24Characeter
//label.create2x1({top: 'this is the top label', code: 'ADG12324582GHJUG', bottom: 'K & A Produce'})
export function start(data){  //console.log('goku-dt 5>', data)
	 
	const doc = new jsPDF({
	  format: 'letter', //permite agregar parrafos
	  orientation: 'portrait', // 'portrait' 'landscape'
	  unit: 'in',
	  format: [3, 2], // 2 pulgadas por 1 pulgada
	});


		pdfStyle.small8(doc)
		pdfHandler.centerText(doc, 0.15, data.company)

	pdfHandler.drawLine(doc, 0.20)//-----------------------------------------------------
	

		pdfStyle.small8(doc)
		doc.text('Price', 0.10, 0.35)

		pdfStyle.title(doc)
		doc.text(math.cashFormat(data.price, true), 0.10, 0.53)


		pdfStyle.small8(doc)
		doc.text('Date In', 1.21, 0.35)

		pdfStyle.title(doc)
		doc.text(data.dateIn, 1.21, 0.53)


	pdfHandler.drawLine(doc, 0.62)//-----------------------------------------------------


		pdfStyle.small8(doc)
		doc.text('Provider', 0.10, 0.76)

		pdfStyle.title(doc)
		doc.text(string.cutText(data.prodiver, 29), 0.10, 0.92)


	pdfHandler.drawLine(doc, 1.02)//-----------------------------------------------------


		pdfStyle.small8(doc)
		doc.text('Description', 0.10, 1.16)

		//the description only allows 196 characters
		pdfStyle.small6(doc)
		pdfHandler.addParra(doc, 1.29, string.cutText(data.note, 217) )



	pdfHandler.drawLine(doc, 1.75)//-----------------------------------------------------

                                                     //px  py     wid  hei      
    doc.addImage( pdfBarCode.create(data.code), 'PNG', 0.1, 1.8 , 1.8, 0.95)

	pdfStyle.small8(doc)
	pdfHandler.centerText(doc, 2.9, data.code)

	doc.save(data.pdfName)


}/**/




