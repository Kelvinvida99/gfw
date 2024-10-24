const bwipjs   = require('bwip-js');






export function create( text) {


  const barcodeOptions = {
    bcid: 'code128', 
    text: text,     
    scale: 1,         
  }


  const canvas = document.createElement('canvas')
  bwipjs.toCanvas(canvas, barcodeOptions)
  const dataUrl = canvas.toDataURL('image/png')

  return dataUrl


}







