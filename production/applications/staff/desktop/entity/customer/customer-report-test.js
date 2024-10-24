

const reportDB    = require ('../../../../../components/report/report-db')
const report      = require ('../../../../../components/report/report')
const style       = require ('../../../../../components/report/report-style')




export function start(detail){  // console.log('reportTest 5>', detail)
         
    const phpFile = 'server/php/sql/report.php' 
    detail.inf    = {entity: 'purchase', report:'purchase-report', id:'55' }

    reportDB.select(detail, phpFile, (data)=>{ console.log('reportTest 5>', data)

      insert(detail, data)

    })

}/**/


function insert(detail, data){ //console.log('REPORT maixxxx>', style.start('f32'))
    
    const pageTarget = document.getElementById('customer-page')
    const body       = generate(data[0])

    pageTarget.insertAdjacentHTML("beforeend", body )  
    

}/*insert*/





function generate(data){ //console.log('REPORT html>', data)
    
    var body = ''

    const pruchaseItem = JSON.parse(data.pruchaseItem)
    const soldItem     = JSON.parse(data.soldItem)


    body += generateHeader()
    body += generateTop(data)
    body += generatePurchaseTable(pruchaseItem)
    body += generateSoldTable(soldItem)

    body += `</div> <!-- dataCont -->`
    body += `<div class="report-page">`

    return body
}

function generateHeader(){

   var header = ''
        header +=`<div class="report-page"  ${style.r('table')}>`
            header +=`
                    <div class="report-appbar report-appbar-black" >

                            <div  data-detail='{"click": [ 
                                                        {"dest":"ripple" }, 
                                                        {"dest":"report", "act":"remove" } ] }' >
                                <svg><use xlink:href="../public/css/svg.svg#close"></use></svg>
                            </div>

                            <h1>Close</h1>

                        <div class="fr" data-detail='{"click": [ 
                                                    {"dest":"ripple" }, 
                                                    {"dest":"report", "act":"print" }  ] }' >
                                <svg><use xlink:href="../public/css/svg.svg#print"></use></svg>
                                <label>Print</label>
                        </div>
                    </div> <!-- appbar -->
            `

            header +=`
                    <div class="dataCont">
                        <h1  ${style.r('f32')}>Report Title </h1>
                        <p   ${style.r('f14')} >This is a descripti detailed of this report, the meaning and anything that 
                        could help to us to understand more about it</p>
            `
    return header


}

function generateTop(data){console.log('generateTop>>>', data)

        var table      = ` <table ${style.r('table')} > `    
        let detailHtml = ``

///"actJump": "goToInvestor",  "dtId": "investor-dt", "toSearch": "investor23"
            
            table += `
                <tr>
                  <td ${style.r('td0t')} ${detailHtml} >Id</td>
                  <td ${style.r('td0t')} ${detailHtml} >Code</td>
                  <td ${style.r('td0t')} ${detailHtml} >Vendor</td>
                  <td ${style.r('td0t')} ${detailHtml} >totalPurchasedAmount</td>
                </tr> 

                <tr>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.id}     </b></td>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.code}   </b></td>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.vendor} </b></td>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.totalPurchasedAmount} </b></td>
                </tr> 

                <tr>
                  <td ${style.r('td0t')} ${detailHtml} >totalPurchaseQty</td>
                  <td ${style.r('td0t')} ${detailHtml} >totalSoldQty</td>
                  <td ${style.r('td0t')} ${detailHtml} >totalSoldAmount</td>
                  <td ${style.r('td0t')} ${detailHtml} >totalCogs</td>
                  <td ${style.r('td0t')} ${detailHtml} >profit</td>
                </tr> 

                <tr>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.totalPurchaseQty} </b></td>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.totalSoldQty} </b></td>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.totalSoldAmount} </b></td>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.totalCogs} </b></td>
                  <td ${style.r('td0')} ${detailHtml} ><b>${data.profit} </b></td>
                </tr> 
            `
       
        table += `</table>`

        return table

}/**/




function generatePurchaseTable(pruchaseItem){

        var table = `
               <h2 ${style.r('tableTitle')}>Purchase Item</h2>
               <table ${style.r('table')} >
                <tr >
                  <th ${style.r('th')} >id</th>
                  <th ${style.r('th')}>name</th>
                  <th ${style.r('th')}>type_selling</th>
                  <th ${style.r('th')}>purchase_qty</th>
                  <th ${style.r('th')}>avaialable</th>
                  <th ${style.r('th')}>qty</th>
                  <th ${style.r('th')}>unitTotalCost</th>
                  <th ${style.r('th')}>rowTotal</th>
                  <th ${style.r('th')}>avg_sold_price</th>
                </tr> 
        `
        for ( let i=0; i< pruchaseItem.length; i++ ){ //console.log('for>>>', pruchaseItem.length)
            
        let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  
                          {"dest":"customer", "elem":"fullcont",  "act":"jump", 
                           "actJump":"goToInvestor", "dtId":"investor-dt", "toSearch":"investor23"  } ] }'`
            
            table += `
                <tr>
                  <td class='tdClick' ${style.r('td')} ${detailHtml} >${pruchaseItem[i].id}</td>
                  <td class='tdClick' ${style.r('td')} ${detailHtml} >${pruchaseItem[i].name}</td>
                  <td class='tdClick' ${style.r('td')} ${detailHtml} >${pruchaseItem[i].type_selling}</td>
                  <td class='tdClick' ${style.r('td')} ${detailHtml} >${pruchaseItem[i].purchase_qty}</td>
                  <td ${style.r('td')} ${detailHtml} >${pruchaseItem[i].avaialable}</td>
                  <td ${style.r('td')} ${detailHtml} >${pruchaseItem[i].qty}</td>
                  <td ${style.r('td')} ${detailHtml} >${pruchaseItem[i].unitTotalCost}</td>
                  <td ${style.r('td')} ${detailHtml} >${pruchaseItem[i].rowTotal}</td>
                  <td ${style.r('td')} ${detailHtml} >${pruchaseItem[i].avg_sold_price}</td>
                </tr> 
            `
        }

        table += `</table>`

        return table

}


function generateSoldTable(soldItem){

        var table = `
              <h2 ${style.r('tableTitle')}>Sold Item</h2>                        
              <table ${style.r('table')} >
                <tr>
                  <th ${style.r('th')}>sale_id</th>
                  <th ${style.r('th')}>saleCode</th>
                  <th ${style.r('th')}>saleDate</th>
                  <th ${style.r('th')}>customer</th>
                  <th ${style.r('th')}>name</th>
                  <th ${style.r('th')}>qty</th>
                  <th ${style.r('th')}>soldPrice</th>
                  <th ${style.r('th')}>rowTotal</th>
                  <th ${style.r('th')}>rowTotalEarnings</th>
                </tr> 
        `
        for ( let i=0; i< soldItem.length; i++ ){ //console.log('for>>>', soldItem.length)
            
            let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  {"dest":"report", "act":"jump"  } ] }'`
            
            table += `
                <tr>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].sale_id}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].saleCode}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].saleDate}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].customer}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].name}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].qty}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].soldPrice}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].rowTotal}</td>
                  <td ${style.r('td')} ${detailHtml} >${soldItem[i].rowTotalEarnings}</td>
                </tr> 
            `
        }

        table += `</table>`

        return table
}

