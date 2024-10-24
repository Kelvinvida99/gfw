

export function   title54(doc){ 
    doc.setFont('Helvetica', 'normal')
    doc.setTextColor(0, 0, 0)      
    doc.setFontSize(54)
}

export function   title36(doc){ 
    doc.setFont('Helvetica', 'normal')
    doc.setTextColor(0, 0, 0)      
    doc.setFontSize(36)
}

export function   title28(doc){ 
    doc.setFont('Helvetica', 'normal')
    doc.setTextColor(0, 0, 0)      
    doc.setFontSize(28)
}



export function   title(doc){ 
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
}



export function   des(doc){ 
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(113, 113, 113)
}

export function   small8(doc){ 
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(0, 0, 0)
}

export function   small6(doc){ 
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(6)
    doc.setTextColor(0, 0, 0)
}


///whitee
export function   desWhite(doc){ 
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
}


export function  f22white(doc){ 
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(22)
    doc.setTextColor(255, 255, 255)
}






export function   blueHeader(){ 
    return {
            fillColor: [0, 128, 255], /*bg*/  
            textColor: 255,  /*text color*/
            fontStyle: 'bold', // Estilo del texto (negrita)
    }
}



export function   greenHeader(){ 
    return {
            fillColor: [75, 187, 100], /*bg*/  
            textColor: 255,  /*text color*/
            fontStyle: 'bold', // Estilo del texto (negrita)
    }
}
