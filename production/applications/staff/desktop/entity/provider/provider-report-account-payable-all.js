const reportDB = require ('../../../../../components/report/report-db')
const report   = require ('../../../../../components/report/report')
const style    = require ('../../../../../components/report/report-style')
const css      = style.get()



export function start(detail){   
         
    const phpFile          = 'server/php/sql/report.php' 
    
    detail.inf    = {entity: 'provider', report:'account-payable-all', id: 'dataDbid' }

    reportDB.select(detail, phpFile, (data)=>{ console.log('reportTest 5>', data)

         insert(detail, data)

    })

}/**/


function insert(detail, data){ //console.log('REPORT maixxxx>', style.start('f32'))
    
    report.show(detail, ()=>{

        const pageTarget = document.getElementById('report-page-right')
        const body       = generate(data)

        pageTarget.insertAdjacentHTML("beforeend", body )  

    })

}/*insert*/





function generate(data){ //console.log('REPORT html>', data)
    
    var body = ''

    body += generateHeader()
    body += generateTop(data[0])
    body += generateTable(data)

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

                            <h1>All Providers Statement </h1>

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
                        <h1  ${css.f32}>Accounts Payable Aging Report </h1>
                        <p   ${css.f14} >This is a financial document that provides a summary of the outstanding invoices and bills that a company owes to its suppliers or vendors. </p>
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
      <h2 style="text-align: center;">Accounts Payable Aging Report</h2>
      <h2 style="text-align: center;">As Of ${data.current_dateTime}</h2>
      `;


        return table

}/**/



function generateTable(data){ //console.log('data>>>', data) 

        var  totals = {
                        current: 0, 
                        total_due_30_days: 0, 
                        total_due_31_to_60_days: 0, 
                        total_due_61_to_90_days: 0, 
                        total_due_over_90_days: 0,
                        grandTotal: 0
        };
        var nextFormat = 0;
        var table = `
               <h2 ${css.tableTitle}>Providers Vs Aging Owned Amounts</h2>
               <table ${css.table} class="dt-alterColor">
                <tr >
                  <th ${css.th}>Provider</th>
                  <th ${css.th}>Current</th>
                  <th ${css.th}>30 days</th>
                  <th ${css.th}>31 to 60 days</th>
                  <th ${css.th}>61 to 90 days</th>
                  <th ${css.th}>Over 90 days</th>            
                  <th ${css.th}>Total</th>            
                </tr> 
        `




        
        for ( let i=0; i< data.length; i++ ){ //console.log('for>>>', data.length)
            
            let rowTotal = 0;
            let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  
                          
                           {"dest":"provider", "elem":"report", "reportType":"accountPayable", "entity":"provider", "dbid":"${data[i].provider_id}", "source":"dt" }
                        ] }'`            
           

            totals.current                  += parseFloat(data[i].current.replace(/[$,]/g, ''));
            totals.total_due_30_days        += parseFloat(data[i].total_due_30_days.replace(/[$,]/g, ''));
            totals.total_due_31_to_60_days  += parseFloat(data[i].total_due_31_to_60_days.replace(/[$,]/g, ''));
            totals.total_due_61_to_90_days  += parseFloat(data[i].total_due_61_to_90_days.replace(/[$,]/g, ''));
            totals.total_due_over_90_days   += parseFloat(data[i].total_due_over_90_days.replace(/[$,]/g, ''));

            rowTotal  = parseFloat(data[i].current.replace(/[$,]/g, ''))+parseFloat(data[i].total_due_30_days.replace(/[$,]/g, ''))+parseFloat(data[i].total_due_31_to_60_days.replace(/[$,]/g, ''));
            rowTotal += parseFloat(data[i].total_due_61_to_90_days.replace(/[$,]/g, '')) + parseFloat(data[i].total_due_over_90_days.replace(/[$,]/g, ''));

            totals.grandTotal += rowTotal;

            table += `
                <tr ${rowStyle(i)}>
                  
                  <td class='tdClick' ${css.td} ${detailHtml} >${data[i].provider}</td>
                  <td ${css.td} >${data[i].current}</td>
                  <td ${css.td} >${data[i].total_due_30_days}</td>
                  <td ${css.td} >${data[i].total_due_31_to_60_days}</td>
                  <td ${css.td} >${data[i].total_due_61_to_90_days}</td>
                  <td ${css.td} >${data[i].total_due_over_90_days}</td>
                  <td ${css.td} >${cashVal(rowTotal)}</td>
                </tr> 
            `
//<td ${css.td} colspan="5"  ><div align="right"><h1>Total Due</h1></div></td><td ${css.td} ><div align="left"><h1>${cashVal(totalDue)}</h1></div></td>

            nextFormat = i + 1;

        }


        //GRAND TOTAL
        totals.grandTotal = totals.current + totals.total_due_30_days + totals.total_due_31_to_60_days + totals.total_due_61_to_90_days + totals.total_due_over_90_days;


        //PRINITNG EACH COLUMM TOTAL
        table += `
        <tr ${rowStyle(nextFormat)}>
          
          <td style="text-align: right;"><h2>Total</h2></td>
          <td ${css.td} ><h3>${cashVal(totals.current)}</h3></td>
          <td ${css.td} ><h3>${cashVal(totals.total_due_30_days)}</h3></td>
          <td ${css.td} ><h3>${cashVal(totals.total_due_31_to_60_days)}</h3></td>
          <td ${css.td} ><h3>${cashVal(totals.total_due_61_to_90_days)}</h3></td>
          <td ${css.td} ><h3>${cashVal(totals.total_due_over_90_days)}</h3></td>
          <td ${css.td} ><h3>${cashVal(totals.grandTotal)}</h3></td>
        </tr> 
        `

        table += `</table>`

        return table

}

function rowStyle(i){

    if( i % 2 === 0 ){ return '' }
    return css.trGray

}

function cashVal(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
