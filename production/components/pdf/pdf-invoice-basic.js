

const pdfStyle   = require('./pdf-style')
const pdfHandler = require('./pdf-handler')
const pdfBarCode = require('./pdf-barcode')
const math       = require ('../../js-handler/math')
const timeDate   = require ('../../js-handler/time-date')
const string     = require ('../../js-handler/string')


const { jsPDF }  = require('jspdf')
require('jspdf-autotable')


export function start(data){  //console.log('goku-dt 5>', data)
         
      const doc = new jsPDF()

      //photo
      doc.addImage(data.company.logo, 'PNG', 160, 5, 30, 30)

      //title
      pdfStyle.title54(doc)
      doc.text('INVOICE', 10, 20)

      /**********************************************/

      //Invoice number
      pdfStyle.title(doc)
      doc.text('Invoice number', 10, 30)
      pdfStyle.des(doc)
      doc.text(data.invoice, 10, 35)


      //Date of issue
      const dateInvoice = timeDate.friendlyDate(data.date)
      pdfStyle.title(doc)
      doc.text('Date of issue', 75, 30)
      pdfStyle.des(doc)
      doc.text(dateInvoice,  75, 35)

      //Billed to 
      const billedToAddr = `${data.billedTo.name} \n${data.billedTo.address} \n${data.billedTo.address2} ${data.billedTo.state}  ${data.billedTo.zip} \n${string.formatPhone(data.billedTo.phone) } `

      pdfStyle.title(doc)
      doc.text('Billed to ', 10, 45)

      pdfStyle.des(doc)
      doc.text(billedToAddr, 10, 50)


      //GosiveLLC
      pdfStyle.title(doc)
      doc.text('Billed from', 75, 45)

      pdfStyle.des(doc)
      const companyAdd = `${data.company.name} \n${data.company.address} \n${data.company.address2} ${data.company.state}  ${data.company.zip}  \n${string.formatPhone(data.company.phone)} `
      doc.text(companyAdd, 75, 50)

      ///barCode
      doc.addImage( pdfBarCode.create(data.invoice), 'PNG', 126, 45 , 60, 15)  

      //table
      const headStyles = pdfStyle.blueHeader()

      doc.autoTable({
          head: [data.dtHeader],
          body: data.dtBody,
          startY: 75, // Position
          headStyles
      });

      //Total
      const lastTable     = doc.lastAutoTable;
      const lastY         = lastTable.finalY || startY;
      const total         = math.cashFormat(data.total, true)

      // Square
      doc.setFillColor(0, 128, 255)
      doc.rect(126, lastY + 2, 70, 10, 'F')

      pdfStyle.desWhite(doc)
      doc.text('Total', 128, lastY + 8)

      pdfStyle.f22white(doc)
      doc.text(total, 140, lastY + 9.5)



      //signature
      pdfHandler.loadSingature(doc, data.signature.value, data.signature.name, 126, lastY+15 )

      //signature
      pdfHandler.loadSingature(doc, data.signature2.value, data.signature2.name, 10, lastY+15 )
  

      //last text
      // Titulo pequeño
      // pdfStyle.title(doc)
      // doc.text('Notes', 10, lastY+50)

      // Titulo pequeño
      pdfStyle.des(doc)
      doc.text( `Notes : ${string.formatParra(data.note, 110, 3)}` , 10,  lastY+55)


      ///formatParra(text, charactersPerLine, maxLines)




      ///Page footer
      pdfHandler.addFooter(doc, `${data.company.name}  | ${string.formatPhone(data.company.phone)} | Inovice ${data.invoice}`)


      // doc.text('Texto debajo de la tabla', 20, lastTablePosY + 10);
      doc.save(data.pdfName)



}/**/




////////////////////////////// green


////////////////////////////// green

