const SignaturePad = require('./signature_pad')


export function setSignature(cont){  

  const pad = new SignaturePad(cont);
  cont.width  = 346//cont.offsetWidth  
  cont.height = 300
  cont.getContext("2d").scale(1, 1)    
  return   pad    

}


export function loadSignature(srcPad, desPad){
  desPad.fromData( srcPad.toData() )
}

export function getData(pad){
  return pad.toData()
}


export function clean(pad){
 pad.clear()
}

