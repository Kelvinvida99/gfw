const reportDB = require ('../../../../../components/report/report-db')
const report   = require ('../../../../../components/report/report')
const style    = require ('../../../../../components/report/report-style')
const css      = style.get()



export function start(detail){   
         

    const phpFile          = 'server/php/sql/report.php' 
    const fullcontPurchase = document.getElementById('provider-fullcont')
    let dataDbid = '';

    if(detail.source == 'fullcont'){
      // console.log('purchase report 555555555555555555555>', detail)
      dataDbid         = fullcontPurchase.getAttribute('data-dbid')
      detail.inf    = {entity: 'provider', report:'account-payable-one', id: dataDbid }

      reportDB.select(detail, phpFile, (data)=>{ //console.log('reportTest 5>', data)

        insert(detail, data)

      })
    }else if(detail.source == 'dt'){
      // console.log('purchase report 555555555555555555555>', detail)
      dataDbid = detail.dbid
      detail.inf    = {entity: 'provider', report:'account-payable-one', id: dataDbid }

      reportDB.select(detail, phpFile, (data)=>{ //console.log('reportTest 5>', data)

        insert(detail, data)

      })

    }else{
      console.log('Errorrrrrrrrrrrrr')
    }

}/**/


function insert(detail, data){ //console.log('REPORT maixxxx>', style.start('f32'))
    
    report.show(detail, ()=>{

        const pageTarget = document.getElementById('report-page-right')
        const body       = generate(data)

        pageTarget.insertAdjacentHTML("beforeend", body )  

    })

}/*insert*/





function generate(data){ ///console.log('REPORT html>', data)
//return
    
    var body = ''

    //const unpaidBill = JSON.parse(data.unpaidBill)


    body += generateHeader()
    body += generateTop(data[0])
    body += generateTable(data)
    // body += generateSoldTable(soldItem)

    body += `</div> <!-- dataCont -->`
    body += `<div class="report-page">`

    return body
}

function generateHeader(){

   var header = ''
        header +=`<div class="report-page" id="miDiv5" ${css.table}>`
            header +=`
                    <div class="report-appbar report-appbar-black" >

                            <div  data-detail='{"click": [ 
                                                        {"dest":"ripple" }, 
                                                        {"dest":"report", "act":"remove" } ] }' >
                                <svg><use xlink:href="../css/svg.svg#close"></use></svg>
                            </div>

                            <h1>Provider Statement </h1>

                        <div class="fr" data-detail='{"click": [ 
                                                    {"dest":"ripple" }, 
                                                    {"dest":"report", "act":"print" }  ] }' >
                                <svg><use xlink:href="../css/svg.svg#print"></use></svg>
                                <label>Print</label>
                        </div>
                    </div> <!-- appbar -->
            `

            header +=`
                    <div class="dataCont">
                        <h1  ${css.f32}>Account Payable Aging Report </h1>
                        <p   ${css.f14} >This is a financial document that provides a summary of the outstanding invoices and bills that a company owes to one Provider.</p>
            `
    return header


}

function generateTop(data){console.log('generateTop>>>', data)

        /*var table      = ` <table ${css.table} > `    
        let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  {"dest":"report", "act":"jump"  } ] }'`

            let detailVendor= `data-detail='{"click": [ {"dest":"ripple" },  
                          {"dest":"report", "act":"jump", 
                           "actJump":"goToVendor", "dtId":"vendor-dt", "toSearch":"vendorId"  } ] }'` 


            table += `
                <tr>
                  <td ${css.td0t} ${detailHtml}   >Id</td>
                  <td ${css.td0t} ${detailHtml}   >name</td>
                  <td ${css.td0t} ${detailVendor} >overdue_age</td>
                  <td ${css.td0t} ${detailHtml}   >total_due</td>
                </tr> 

                <tr>
                  <td ${css.td0} ${detailHtml} ><b>${data.provider_id}     </b></td>
                  <td ${css.td0} ${detailHtml} ><b>${data.name}   </b></td>
                  <td ${css.td0} ${detailHtml} ><b>${data.overdue_age} </b></td>
                  <td ${css.td0} ${detailHtml} ><b>${data.total_due} </b></td>
                </tr> 
            `
       
        table += `</table>`*/

      var table = `<br><br><h1 style="text-align: center;">${data.company_name}</h1>
      <h2 style="text-align: center;">Account Payable Aging Report</h2>
      <h2 style="text-align: center;">As Of ${data.current_dateTime}</h2>
      `;


        return table

}/**/


function generateTable(agesData){ //console.log('agesData>>>', agesData) 

            var totalDue = 0;

            var table = `
            <h2 ${css.tableTitle}>${agesData[0].name+" Unpaid Bills"} </h2>
            <table ${css.table} >
            <tr >
             
              <th ${css.th}>Date</th>
              <th ${css.th}>Category</th>
              <th ${css.th}>code</th>   
              <th ${css.th}>Due Date</th>  
              <th ${css.th}>Due Amount</th>         
              <th ${css.th}>Original Amount</th>
             
              
            </tr> 
          `



            //SI EL REPORTE RETIRNO NADA
            //SI EL REPORTE RETIRNO NADA
            //SI EL REPORTE RETIRNO NADA
            if(agesData[0].ageDueAmount == null){
              table += `
              <tr>
                <td ${css.td} colspan="6"  ><div align="center"><h3>No Due Bills Were Found.</h3></div></td>
              </tr> 
            `


              table += `</table>`

              return table


            }




        for ( let i=0; i< agesData.length; i++ ){ //console.log('for>>>', agesData.length)
            

                                
                                
                    table += `
                    <tr>
                      <td ${css.td} colspan="6" bgcolor="lightgray" ><div align="center"><h3>${agesData[i].overdue_age + " "+agesData[i].ageDueAmount}</h3></div></td>
                    </tr> 
                `

                totalDue +=  parseFloat(agesData[i].ageDueAmount.replace(/[$,]/g, ''));
                  
                var ageUnpaidBill =   JSON.parse(agesData[i].unpaidBill)


                for ( let y=0; y< ageUnpaidBill.length; y++ ){ //console.log('for>>>', unpaidBill.length)
                  
                  let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  
                                {"dest":"report", "elem":"fullcont",  "act":"jump", 
                                "actJump":"goToPurchase", "dtId":"purchase-dt", "toSearch":"${ageUnpaidBill[y].code}"  } ] }'`   



                      table += `
                      <tr ${rowStyle(i+y)}>
                            
                            <td ${css.td} >${ageUnpaidBill[y].date}</td>
                            <td ${css.td} >${ageUnpaidBill[y].category}</td>
                            <td class='tdClick' ${css.td} ${detailHtml} >${ageUnpaidBill[y].code}</td>
                            <td ${css.td} >${ageUnpaidBill[y].due_date}</td>
                            <td ${css.td} >${ageUnpaidBill[y].due_amount}</td>
                            <td ${css.td} >${ageUnpaidBill[y].original_amount}</td>
                            
                          
                          </tr> 
                      `
                }










        }


        table += `
        <tr>
          <td ${css.td} colspan="5"  ><div align="right"><h1>Total Due</h1></div></td><td ${css.td} ><div align="left"><h1>${cashVal(totalDue)}</h1></div></td>
        </tr> 
    `


        table += `</table>`

        return table



        function cashVal(value) {
          return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }
      function rowStyle(i){

        if( i % 2 === 0 ){ return '' }
        return css.trGray
    
    }

}

