// print pdf
export function reportPdf( detail, htmlFc ){ 
  let elem        = document.querySelector("#otherexpense-fullcont");
  let dbid        = elem.getAttribute("data-dbid");


  if (detail.id != "") {
    printPdf({ id: detail.id, type: "print" });
  }else{
    printPdf({ id: dbid, type: "print" });
  }
}

function printPdf(data) {
  const formData = new FormData();
  formData.append('otherexpense_id', data.id);
  formData.append('type', data.type);

  const controller = new AbortController();
  const timeout = setTimeout(() => { controller.abort() }, 30000);

  let options = {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    credentials: 'same-origin'
  };

  fetch(`./server/php/queries/report/otherexpense/pdf-invoice.php`, options)
    .then(response => {
      if (!response.ok) {
        alert("An error occurred while printing the PDF. Please try again.");
      } else {
        return response.text(); // Devolver el nombre del archivo PDF generado
      }
    })
    .then(pdfFileName => {
      if (pdfFileName) {
        // Ruta base del servidor
        const baseUrl = 'https://beestock.gosive.com/server/server/';

        // Agregar la parte faltante a la ruta del PDF
        const fullPath = pdfFileName.startsWith('server/') ? pdfFileName : 'server/' + pdfFileName;

        // Construir la URL absoluta del archivo PDF
        const realPdfUrl = new URL(fullPath, baseUrl).href;

        // Crear un iframe para cargar el PDF generado
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = realPdfUrl;
        document.body.appendChild(iframe);
        
        // Esperar a que el PDF se cargue en el iframe antes de imprimir
        iframe.contentWindow.print();

        console.log(realPdfUrl)

      }
    })
    .catch(error => {
      console.log('An error occurred while printing the PDF:', error);
    });
}