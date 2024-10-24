


const invoiceBasic        = require('./pdf-invoice-basic')
const invoiceShipping     = require('./pdf-invoice-shipping')
const invoiceShippingData = require('./pdf-invoice-shipping-data')

const invoiceBasicData    = require('./pdf-invoice-basic-data')
const label2x1            = require('./pdf-label-2x1')
const label3x2            = require('./pdf-label-3x2')
const label3x2area        = require('./pdf-label-3x2-area')


export function start(detail, data){  //console.log('goku-dt 5>', detail)
         
      obj[detail.act].start( detail)
}/**/

const obj = {
   
      createInvoiceBasic:        { start: (detail)=>{  invoiceBasic.start(detail.data)   }},
     
      //for testing and learn
      pdfLearning:               { start: (detail)=>{     pdfLearning()  }},
      pdfLabel:                  { start: (detail)=>{     pdfLabel()     }},
}


function pdfLearning(){

      pdfInvoice()
     // pdfShipping()
     // pdfLabel()
}



function pdfShipping(){console.log('pdfShipping>>>>>>>>>>>>>')
            invoiceShipping.start( invoiceShippingData.start() )
}

function pdfInvoice(){
            invoiceBasic.start( invoiceBasicData.start() )
}







function pdfLabel(){
      
      const data2x1 = {top: 'K&A - this is the top label', code: 'ADG12324582GHJUG'}

      const data3x2 = { 
            company:  'K&A - this is the top label',
            price:    '1000000',
            dateIn:   '1/1/2024',
            prodiver: 'Peru vestables Peru vestables Peru vestables',
            code:     'ADG12324582GHJUG',
            note:     'Este es un texto largo que se romperá en múltiples líneas para demostrar cómo jEste es un texto largo que se romperá en múltiples líneas para demostrar cómo jEste es un texto largo que se romperá en múltiples líneas para demostrar cómo jEste es un texto largo que se romperá en múltiples líneas para demostrar cómo jEste es un texto largo que se romperá en múltiples líneas para demostrar cómo jEste es un texto largo que se romperá en múltiples líneas para demostrar cómo jEste es un texto largo que se romperá en múltiples líneas para demostrar cómo jEste es un texto largo que se romperá en múltiples líneas para demostrar cómo j',
            pdfName:  "Miguel Invoice.pdf",
      }

      const data3x2area = {
            area: 'A', //only one character
            row: '1',
            rack: '2',
            level: '3',
            pos: '2', //only one character
            company: 'K&A Produce',
            code: `area:A row:1 rack:2 level:3 pos:D`
      }

            //label2x1.start(data2x1)
            //label3x2.start(data3x2)
            label3x2area.start(data3x2area)


}

