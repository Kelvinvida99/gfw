
const signatureHandler = require('../signature/signature-handler')



// put your text centered, py define where will be
// pdfStyle.small(doc)
// pdfStyle.centerText(doc, 0.2, data.pdfName)
export function centerText(doc, py, text) {
  const textWidth = doc.getTextDimensions(text).w;
  const xPosition = (doc.internal.pageSize.width - textWidth) / 2;
  doc.text(text, xPosition, py);
}

//aggregar un parrafo, solo con la posicion de Y
export function addParra(doc, py, text) {

  const anchoMaximo = doc.internal.pageSize.width - 2 * 0.10; // Restar los márgenes izquierdo y derecho 
  doc.text(text, 0.10, py, { maxWidth: anchoMaximo })

}


//draw a line on the document
export function drawLine(doc, y) {

    const anchoDocumento = doc.internal.pageSize.width;

    const x1 = 10; // coordenada x del punto de inicio
    const x2 = anchoDocumento - 10; // coordenada x del punto final (ancho total menos márgenes)
    const grosorLinea = 0.001; // Grosor de la línea en pulgadas

    // Establecer el grosor de la línea
    doc.setLineWidth(grosorLinea);

    // Dibujar la línea
    doc.line(x1, y, x2, y);
}



export function   addFooter(doc, text){ 

     doc.setFont('Helvetica', 'normal')
     doc.setFontSize(8)
     doc.setTextColor(0, 0, 0)

      // Obtener el número total de páginas en el documento
      const totalPaginas = doc.internal.getNumberOfPages()

      // Iterar sobre cada página para agregar el pie de página
      for (let i = 1; i <= totalPaginas; i++) {
         
          // Cambiar a la página actual
          doc.setPage(i)

          // Calcular la posición y en la parte inferior de la página
          const y = doc.internal.pageSize.height - 25

          // Agregar el texto del pie de página con el número de página
          doc.text(text + i, 10, y)
      }
}



export function loadSingature(doc, signatureValue, signatureName, px, py){ //console.log('signature init> ')

    const html   = document.getElementById('signatueForPDF')
    const canvas = html.querySelector('canvas')
    const pad    = signatureHandler.setSignature(canvas)       

     pad.fromData( JSON.parse(signatureValue) )

     const dataURL = canvas.toDataURL() 
     doc.addImage(dataURL, 'PNG', px, py, 60, 25); 

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      doc.text(signatureName, px, py+28)


   
}/*init*/
