

const colorxx = {
      blue:    '#36A2EB',
      purple:  '#9966FF',
      green:   '#4BC0C0',
      yellow:  '#FFCD56',
      orange:  '#FF9F40',
      red:     '#FF6384',
      gray:    '#C9CBCF',      
}



const colorRGB= {
      blue:    '54, 162, 235',
      red:     '255, 99, 132',      
      purple:  '153, 102, 255',
      green:   '75, 192, 192',
      yellow:  '255, 205, 86',
      orange:  '255, 159, 64',
      gray:    '201, 203, 207',      
}


export function set(color, value){  //console.log('colorSEt')
     
      value.backgroundColor = `rgba(${colorRGB[color]}, 0.80)`
      value.borderColor     = `rgb(${colorRGB[color]})`

}

export function get(color ){  
     
     return {
           backgroundColor : `rgba(${colorRGB[color]}, 0.80)`,
           borderColor:      `rgb(${colorRGB[color]})`
     }


}



//get an array of colors anc convert this to rbg
export function convertRGB(color){  //console.log('convert colors')
     
      let newColors = []

      color.forEach((elem)=>{
            newColors.push(`rgb(${colorRGB[elem]})`)
      })

      return newColors


}

export function convertRGBborder(color){ // console.log('convert colors')
     
      let newColors = []

      color.forEach((elem)=>{
            newColors.push(`rgba(${colorRGB[elem]}, 0.80)`)
      })
      console.log('XXXXXXXX', newColors)

      return newColors


}

//this function get the bordor and background for others colors
export function pieColor(color){
      
      let newColors = {
            backgroundColor: [],
            borderColor: []
      }


      color.forEach((elem)=>{
            newColors.borderColor.push(`rgb(${colorRGB[elem]})`)
            newColors.backgroundColor.push(`rgba(${colorRGB[elem]}, 0.80)`)
      })

      //console.log('pieCiolors', newColors)

      return newColors



}
