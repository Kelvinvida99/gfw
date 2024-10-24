const reportDB = require('../../../../../components/report/report-db')
const report = require('../../../../../components/report/report')
const style = require('../../../../../components/report/report-style')
const css = style.get()




export function start(detail) {   //console.log('style 55555555555555555555>', css)

  const phpFile = 'server/php/sql/report.php'
  const fullcontPurchase = document.getElementById('purchase-fullcont')
  let dataDbid = '';

  if (detail.source == 'fullcont') {
    // console.log('purchase report 555555555555555555555>', detail)
    dataDbid = fullcontPurchase.getAttribute('data-dbid')
    detail.inf = { entity: 'inventory', report: 'inventory-report-one', id: dataDbid }

    reportDB.select(detail, phpFile, (data) => {



      insert(detail, data)

    })
  } else if (detail.source == 'dt') {
    // console.log('purchase report 555555555555555555555>', detail)
    dataDbid = detail.dbid
    detail.inf = { entity: 'inventory', report: 'inventory-report-one', id: dataDbid }

    reportDB.select(detail, phpFile, (data) => { //console.log('reportTest 5>', data)
      //console.log('reportTest 5>', data)
      insert(detail, data)

    })

  } else {
    console.log('Errorrrrrrrrrrrrr')
  }

  // detail.inf    = {entity: 'purchase', report:'purchase-report-one', id: dataDbid }

  // reportDB.select(detail, phpFile, (data)=>{ //console.log('reportTest 5>', data)

  //   insert(detail, data)

  // })

}/**/


function insert(detail, data) { //console.log('REPORT maixxxx>', style.start('f32'))

  report.show(detail, () => {


    const pageTarget = document.getElementById('report-page-right')
    const body = generate(data[0])

    pageTarget.insertAdjacentHTML("beforeend", body)

  })

}/*insert*/





function generate(data) { //console.log('REPORT html>', data)

  var body = ''

  const soldItem = JSON.parse(data.soldItem)


  body += generateHeader(data)
  body += generateTop(data)
  body += generateSoldTable(soldItem)



  body += `</div> <!-- dataCont -->`
  body += `<div class="report-page">`

  return body
}

function generateHeader(data) {

  var header = ''
  header += `<div class="report-page" id="miDiv5" ${css.table}>`
  header += `
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

  header += `
                    <div class="dataCont">
                        <h1  ${css.f32}>${data.code} Status Report</h1>
                        <p   ${css.f14} >The Top Shows a Summary Of The Cost, Income and Profit. The Rest Shows The Records Of Item And Sold Items Qty/Pricing</p>
            `
  return header


}

function generateTop(data) { //console.log('generateTop>>>', data)

  var table = ` <table ${css.table} > `
  table += `
                <tr>
                 
                  <th ${css.thNoline}    >Code</th>
                  <th ${css.thNoline}    >Name</th>
                  <th ${css.thNoline}    >Size</th>
                  <th ${css.thNoline}    >Sold QTY</th>
    
                </tr> 

                <tr>
                  
                  <td ${css.td0}  ><b>${data.code}   </b></td>
                  <td ${css.td0}  ><b>${data.item_name}   </b></td>
                  <td ${css.td0}  ><b>${data.unit_name} </b></td>
                  <td ${css.td0}  ><b>${data.sold_qty} </b></td>
                </tr> 

                <tr>
                  <th ${css.thNoline}  >Available</th>
                  <th ${css.thNoline}  >Unit Cost + COGS  </th>
                  <th ${css.thNoline}  >AVG Sold Price</th>
                  <th ${css.thNoline}  >Item Total</th>
                </tr> 

                <tr>
                  <td ${css.td0}  ><b>${data.available} </b></td>
                  <td ${css.td0}  ><b>${data.unitTotalCost} </b></td>
                  <td ${css.td0}  ><b>${data.avg_sold_price} </b></td>
                  <td ${css.td0}  ><b>${data.rowTotal} </b></td>
                </tr> 
            `

  table += `</table>`

  return table

}/**/


function generateSoldTable(soldItem) {

  var soldTotal = 0;
  var table = `
              <h2 ${css.tableTitle}>Sold Item</h2>                        
              <table ${css.table} >
                <tr>
                  <th ${css.th}>GO TO SALE</th>
                  <th ${css.th}>SALE DATE</th>
                  <th ${css.th}>CUSTOMER</th>
                  <th ${css.th}>ITEM</th>
                  <th ${css.th}>QTY</th>
                  <th ${css.th}>SOLD PRICE</th>
                  <th ${css.th}>ROW TOTAL EARNINGS</th>
                  <th ${css.th}>ROW TOTAL</th>

                </tr> 
        `
  if (soldItem !== null) {
    for (let i = 0; i < soldItem.length; i++) { //console.log('for>>>', soldItem.length)

      let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  
                          {"dest":"report",  "act":"jump", 
                           "actJump":"goToSales", "dtId":"sale-dt", "toSearch":"${soldItem[i].saleCode}"  } ] }'`

      table += `
                <tr>
                  <td class='tdClick' ${css.td} ${detailHtml} >${soldItem[i].saleCode}</td>
                  <td ${css.td}>${soldItem[i].saleDate}</td>
                  <td ${css.td}>${soldItem[i].customer}</td>
                  <td ${css.td}>${soldItem[i].name}</td>
                  <td ${css.td}>${soldItem[i].qty}</td>
                  <td ${css.td}>${soldItem[i].soldPrice}</td>
                  <td ${css.td}>${soldItem[i].rowTotalEarnings}</td>
                  <td ${css.td}>${soldItem[i].rowTotal}</td>

                </tr> 
            `
      soldTotal += parseFloat(soldItem[i].rowTotal.replace(/[$,]/g, ''));
    }
  }

  table += `<tr><td colspan='7' ${css.td}><div align='right'><h3>TOTAL</h3></div></td><td ${css.td} ><h3>${cashVal(soldTotal)}</h3></td></tr></table>`
    
        return table
}


function cashVal(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
function rowStyle(i) {

  if (i % 2 === 0) { return '' }
  return css.trGray

}

