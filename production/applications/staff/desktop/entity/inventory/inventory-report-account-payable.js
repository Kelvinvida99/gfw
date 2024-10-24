const reportDB = require ('../../../../../components/report/report-db')
const report   = require ('../../../../../components/report/report')
const style    = require ('../../../../../components/report/report-style')
const css      = style.get()



export function start(detail){   
         
    const phpFile          = 'server/php/sql/report.php' 
    const fullcontPurchase = document.getElementById('inventory-fullcont')
    const dataDbid         = fullcontPurchase.getAttribute('data-dbid')

   // console.log('purchase report 555555555555555555555>', dataDbid)
    
    detail.inf    = {entity: 'inventory', report:'account-payable-one', id: dataDbid }

    reportDB.select(detail, phpFile, (data)=>{ console.log('reportTest 5>', data)

            insert(detail, data)

    })

}/**/


function insert(detail, data){ //console.log('REPORT maixxxx>', style.start('f32'))
    
    report.show(detail, ()=>{

        const pageTarget = document.getElementById('report-page-right')
        const body       = generate(data[0])

        pageTarget.insertAdjacentHTML("beforeend", body )  

    })

}/*insert*/





function generate(data){ //console.log('REPORT html>', data)
    
    var body = ''

    const unpaidBill = JSON.parse(data.unpaidBill)


    body += generateHeader()
    body += generateTop(data)
    body += generateTable(unpaidBill)
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

                            <h1>Report</h1>

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
                        <h1  ${css.f32}>Report - Account Payable  </h1>
                        <p   ${css.f14} >This is a descripti detailed of this report, the meaning and anything that 
                        could help to us to understand more about it</p>
            `
    return header


}

function generateTop(data){console.log('generateTop>>>', data)

        var table      = ` <table ${css.table} class="dt-alterColor"> `    
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
                  <td ${css.td0} ${detailHtml} ><b>${data.inventory_id}     </b></td>
                  <td ${css.td0} ${detailHtml} ><b>${data.name}   </b></td>
                  <td ${css.td0} ${detailHtml} ><b>${data.overdue_age} </b></td>
                  <td ${css.td0} ${detailHtml} ><b>${data.total_due} </b></td>
                </tr> 
            `
       
        table += `</table>`

        return table

}/**/


function generateTable(unpaidBill){ //console.log('unpaidBill>>>', unpaidBill) 

        var table = `
               <h2 ${css.tableTitle}>Purchase Item</h2>
               <table ${css.table} >
                <tr >
                  <th ${css.th} >id</th>
                  <th ${css.th}>code</th>
                  <th ${css.th}>due_amount</th>
                  <th ${css.th}>paid_amount</th>
                  <th ${css.th}>date</th>
                  <th ${css.th}>due_date</th>
                </tr> 
        `
        for ( let i=0; i< unpaidBill.length; i++ ){ console.log('for>>>', unpaidBill.length)
            
            let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  
                          {"dest":"customer", "elem":"fullcont",  "act":"jump", 
                           "actJump":"goToInvestor", "dtId":"investor-dt", "toSearch":"NIV33"  } ] }'`            
            table += `
                <tr>
                  <td ${css.td} >${unpaidBill[i].id}</td>
                  <td ${css.td} >${unpaidBill[i].code}</td>
                  <td ${css.td} >${unpaidBill[i].due_amount}</td>
                  <td ${css.td} >${unpaidBill[i].paid_amount}</td>
                  <td ${css.td} >${unpaidBill[i].date}</td>
                  <td ${css.td} >${unpaidBill[i].due_date}</td>
                </tr> 
            `
        }

        table += `</table>`

        return table

}

