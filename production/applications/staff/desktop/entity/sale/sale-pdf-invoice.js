

const pdfStyle   = require('../../../../../components/pdf/pdf-style')
const pdfHandler = require('../../../../../components/pdf/pdf-handler')
const pdfBarCode = require('../../../../../components/pdf/pdf-barcode')
const math       = require ('../../../../../js-handler/math')
const timeDate   = require ('../../../../../js-handler/time-date')
const string     = require ('../../../../../js-handler/string')


const { jsPDF }  = require('jspdf')
require('jspdf-autotable')

export function start(data){  

    //console.log('data pdf', data)

    const doc = new jsPDF()

    //photo
    doc.addImage(data.logo, 'PNG', 160, 5, 30, 30)

    //title
    pdfStyle.title36(doc)
    doc.text('SALE ORDER', 10, 20)

    /**********************************************/

    //Customer Name
    pdfStyle.title(doc)
    doc.text('Customer:', 10, 30)
    pdfStyle.des(doc)
    doc.text(data.customer, 30, 30)

    //Phone
    pdfStyle.title(doc)
    doc.text('Phone:', 10, 35)
    pdfStyle.des(doc)
    doc.text(data.phone, 23, 35)

    // Fax
    pdfStyle.title(doc)
    doc.text('Fax:', 10, 40)
    pdfStyle.des(doc)
    doc.text(data.fax, 19, 40)

    // Email
    pdfStyle.title(doc)
    doc.text('Email:', 10, 45)
    pdfStyle.des(doc)
    doc.text(data.email, 22, 45)


    //Date of issue
    const dateInvoice = timeDate.friendlyDate(data.date)
    pdfStyle.title(doc)
    doc.text('Date:', 126, 40)
    pdfStyle.des(doc)
    doc.text(dateInvoice, 136, 40)

    // code
    pdfStyle.title(doc)
    doc.text('Code:', 126, 45)
    pdfStyle.des(doc)
    doc.text(data.code, 137, 45)

    ///barCode
    doc.addImage(pdfBarCode.create(data.customer), 'PNG', 126, 50, 60, 15)

    //Vendor
    pdfStyle.title(doc)
    doc.text('Vendor', 10, 55)
    pdfStyle.des(doc)
    doc.text(data.customer, 10, 59)

    //Bill to 
    const billedToAddr = `${data.billtoAddress} \n${data.billtoCity} \n${data.billtoState} \n${data.billtoZip}`

    pdfStyle.title(doc)
    doc.text('Bill to', 35, 55)

    pdfStyle.des(doc)
    doc.text(billedToAddr, 35, 59)


    //Ship to
    const shipdToAddr = `${data.shiptoAddress} \n${data.shiptoCity} \n${data.shiptoState} \n${data.shiptoZip}`

    pdfStyle.title(doc)
    doc.text('Ship to', 80, 55)

    pdfStyle.des(doc)
    doc.text(shipdToAddr, 80, 59)

    //table
    const headStyles = pdfStyle.blueHeader()

    doc.autoTable({
        head: [data.dtHeader],
        body: data.dtBody,
        startY: 75, // Position
        headStyles
    });

    //Total
    const lastTable = doc.lastAutoTable;
    const lastY = lastTable.finalY || startY;
    const total = math.cashFormat(data.total, true)

    // Square
    doc.setFillColor(0, 128, 255)
    doc.rect(126, lastY + 2, 70, 10, 'F')

    pdfStyle.desWhite(doc)
    doc.text('Total', 128, lastY + 8)

    pdfStyle.f22white(doc)
    doc.text(total, 140, lastY + 9.5)

    pdfStyle.des(doc)
    doc.text(`Notes : ${string.formatParra(data.sale_statement, 80, 3)}`, 10, lastY + 55)

    ///Page footer
    //pdfHandler.addFooter(doc, `${data.customer}  | ${string.formatPhone(data.phone)} | Inovice ${data.customer}`)
    pdfHandler.addFooter(doc, `${string.formatParra(data.sale_footer, 150, 3)}`)


    //doc.text('Texto debajo de la tabla', 20, lastTablePosY + 10);
    //doc.save(data.pdfName)

    doc.autoPrint();
    doc.output('dataurlnewwindow', {filename: 'SALE ORDER.pdf'});

    // // Guardar el PDF en un blob
    // var blob = doc.output('blob');
    // // Crear un objeto URL a partir del blob
    // var blobUrl = URL.createObjectURL(blob);
    // // Crear un iframe oculto para imprimir el PDF
    // var iframe = document.createElement('iframe');
    // iframe.style.display = 'none';
    // iframe.src = blobUrl;
    // document.body.appendChild(iframe);

    // let eliminarIframe = function () {

    //     document.body.removeChild(iframe);
    // }

    // // Agregar evento de descarga o cancelación de impresión al iframe
    // iframe.onload = function () {
    //     iframe.contentWindow.print();
    // };

    // setTimeout(eliminarIframe, 30000);


}/**/

function drawCell(doc, label, position, value) {
    pdfStyle.title(doc);
    doc.text(label, position.x, position.y);

    pdfStyle.des(doc);
    const valueX = 15 + position.x + 0; // Adjust this value based on your needs
    const valueY = position.y + 0;  // Adjust this value based on your needs
    doc.text(value, valueX, valueY);
}

////////////////////////////// green


////////////////////////////// green

