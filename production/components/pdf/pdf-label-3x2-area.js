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
	  orientation: 'landscape', // 'portrait' 'landscape'
	  unit: 'in',
	  format: [3, 2], // 2 pulgadas por 1 pulgada
	});


                                                     //px  py     wid  hei      
    doc.addImage( pdfBarCode.create(data.code), 'PNG', 0.1, 0.1 , 2.8, 0.80)

	pdfHandler.drawLine(doc, 0.98)//-----------------------------------------------------

//-----------------------------------------------------
	pdfStyle.small8(doc)
	doc.text('AREA', 0.18, 1.15)

	pdfStyle.title54(doc)
	doc.setFont('Helvetica', 'bold')
	doc.text(data.area, 0.10, 1.76)

//-----------------------------------------------------

	pdfStyle.small8(doc)
	doc.text(`ROW          RACK        LEVEL     POS`, 0.85, 1.15)

	pdfStyle.title28(doc)
	doc.setFont('Helvetica', 'bold')
	doc.text(`${toDigit(data.row)}-${toDigit(data.rack)}-${toDigit(data.level)}-${data.pos}`, 0.80, 1.50)


	pdfStyle.small8(doc)
	pdfHandler.centerText(doc, 1.9, data.company)


	doc.save(data.pdfName)

}/**/




//convert '1'>'01'
function toDigit(str) {
  
  if(str === '' || str === ' '){ return `00` }
  if(!isNaN(number) ){ return '0'}

  let number = parseFloat(str)

    if (number >= 0 && number < 10) {
      return '0' + number.toString();
    } else {
      return number.toString();
    }

}



