



export function start( detail ){ //console.log('patients, notification', detail)

//  notifyBody[detail.id].start(detail) 

  type[detail.type].start(detail) 
  
  return type[detail.type].bodyHtml
}


const type   =  {

    blockEdition:{
        bodyHtml:``,
        start: function(detail){
          this.bodyHtml     = `
          <div class="font-icon  font-icon-red ta-l"  >
              <span class="cont"> 
                  <span> <svg><use xlink:href='./css/svg.svg#block'></use></svg></span>  
                  <span>Block</span>
              </span> 
              <label>Some fileds editions are locked because there are payments associated with this sale.</label> 
          </div> 

         `
        }
    },




}





