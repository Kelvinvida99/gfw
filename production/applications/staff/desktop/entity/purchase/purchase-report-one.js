const reportDB       = require ('../../../../../components/report/report-db')
const report         = require ('../../../../../components/report/report')
const style          = require ('../../../../../components/report/report-style')
const css            = style.get()




export function start(detail){   //console.log('style 55555555555555555555>', css)
         
    const phpFile          = 'server/php/sql/report.php' 
    const fullcontPurchase = document.getElementById('purchase-fullcont')
    let dataDbid = '';

    if(detail.source == 'fullcont'){
      // console.log('purchase report 555555555555555555555>', detail)
      dataDbid         = fullcontPurchase.getAttribute('data-dbid')
      detail.inf    = {entity: 'purchase', report:'purchase-report-one', id: dataDbid }

      reportDB.select(detail, phpFile, (data)=>{ //console.log('reportTest 5>', data)

        insert(detail, data)

      })
    }else if(detail.source == 'dt'){
      // console.log('purchase report 555555555555555555555>', detail)
      dataDbid = detail.dbid
      detail.inf    = {entity: 'purchase', report:'purchase-report-one', id: dataDbid }

      reportDB.select(detail, phpFile, (data)=>{ //console.log('reportTest 5>', data)

        insert(detail, data)

      })

    }else{
      console.log('Errorrrrrrrrrrrrr')
    }
    
    // detail.inf    = {entity: 'purchase', report:'purchase-report-one', id: dataDbid }

    // reportDB.select(detail, phpFile, (data)=>{ //console.log('reportTest 5>', data)

    //   insert(detail, data)

    // })

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

    const pruchaseItem = JSON.parse(data.pruchaseItem)
    const soldItem     = JSON.parse(data.soldItem)


    body += generateHeader(data)
    body += generateTop(data)
    body += generatePurchaseTable(pruchaseItem)
    body += generateSoldTable(soldItem, data)

    body += `</div> <!-- dataCont -->`
    body += `<div class="report-page">`

    return body
}

function generateHeader(data){

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
                        <h1  ${css.f32}>${data.code} Status Report</h1>
                        <p   ${css.f14} >The Top Shows a Summary Of The Cost, Income and Profit. The Rest Shows The Records Of Purchased And Sold Items Qty/Pricing</p>
            `
    return header


}

function generateTop(data){ //console.log('generateTop>>>', data)

        var table      = ` <table ${css.table} > `    
            table += `
                <tr>
                 
                  <th ${css.thNoline}    >Code</th>
                  <th ${css.thNoline}    >#REF</th>
                  <th ${css.thNoline}    >Vendor</th>
                  <th ${css.thNoline}    >P.O. Total</th>
                  <th ${css.thNoline}  >Sold Amount</th>
                </tr> 

                <tr>
                  
                  <td ${css.td0}  ><b>${data.code}   </b></td>
                  <td ${css.td0}  ><b>${data.reference_number}   </b></td>
                  <td ${css.td0}  ><b>${data.vendor} </b></td>
                  <td ${css.td0}  ><b>${data.totalPurchasedAmount} </b></td>
                  <td ${css.td0}  ><b>${data.totalSoldAmount} </b></td>
                </tr> 

                <tr>
                  <th ${css.thNoline}  >Purchased Qty</th>
                  <th ${css.thNoline}  >Sold Qty</th>
                  
                  <th ${css.thNoline}  >COGS</th>
                  <th ${css.thNoline}  >Profit From Sold</th>
                  <th ${css.thNoline}  >Total Profit</th>
                </tr> 

                <tr>
                  <td ${css.td0}  ><b>${data.totalPurchaseQty} </b></td>
                  <td ${css.td0}  ><b>${data.totalSoldQty} </b></td>
                 
                  <td ${css.td0}  ><b>${data.totalCogs} </b></td>
                  <td ${css.td0}  ><b>${data.profit} </b></td>
                  <td ${css.td0}  ><b>${data.totalProfit} </b></td>
                </tr> 
            `
       
        table += `</table>`

        return table

}/**/




function generatePurchaseTable(pruchaseItem){

        var purchasedTotal = 0;
        var soldTotal = 0;
        var percent        = 0;
        var unitTotalCost  = 0;
        //var avg_sold_price = 0;
        var item_total_sold = 0;
        var profit         = 0;
        var table = `
               <h2 ${css.tableTitle}>Purchased Items</h2>
               <table ${css.table} >
                <tr >
                  <th ${css.th}>NAME</th>
                  <th ${css.th}>SIZE</th>
                  <th ${css.th}>QTY</th>
                  <th ${css.th}>SOLD QTY</th>
                  <th ${css.th}>AVAIL</th>                  
                  <th ${css.th}>UNIT COST + COGS</th>
                  <th ${css.th}>PROFIT FROM SOLD</th>
                  <th ${css.th}>TOTAL SOLD</th>
                  <th ${css.th}>TOTAL PURCHASED</th>
                  
                </tr> 
        `
        for ( let i=0; i< pruchaseItem.length; i++ ){ //console.log('for>>>', pruchaseItem.length)


         
          
           percent        = (0.00).toFixed(2);
           unitTotalCost  = 0;
           item_total_sold = 0;
           profit         = 0;



            unitTotalCost  = pruchaseItem[i].unitTotalCost.replace("$","")
            //avg_sold_price = pruchaseItem[i].avg_sold_price.replace("$","")
            item_total_sold = pruchaseItem[i].item_total_sold.replace(/[$,]/g, '')
            profit         = (parseFloat(item_total_sold) - (parseFloat(unitTotalCost) * pruchaseItem[i].sold_qty))
            //alert("TOTAL SOLD: "+parseFloat(item_total_sold)+", UNIT-COST: "+parseFloat(unitTotalCost)+", SOLD-QTY:"+pruchaseItem[i].sold_qty )
           // percent        = (profit * 100) / parseFloat(pruchaseItem[i].rowTotal.replace(/[$,]/g, ''))
            var soldQtyCostAmount = pruchaseItem[i].sold_qty * unitTotalCost;
           // var soldAmount = pruchaseItem[i].sold_amount;
            //var ganancia = soldAmount - soldQtyCostAmount;
            if(profit != 0){
              percent        = (100 * (profit / soldQtyCostAmount)).toFixed(2);
            }
            
            //console.log("soldQtyCostAmount@@@@@@@@@@:::"+soldQtyCostAmount)
            //console.log("soldAmount@@@@@@@@@@:::"+soldAmount)
            //console.log("@@@@@@@@@@:::"+percent)
            //alert(ganancia);
            table += `
                <tr>
                  
                  <td ${css.td} >${pruchaseItem[i].name}</td>
                  <td ${css.td} >${pruchaseItem[i].type_selling}</td>
                  <td ${css.td} >${pruchaseItem[i].purchase_qty}</td>                  
                  <td ${css.td} >${pruchaseItem[i].sold_qty}</td>
                  <td ${css.td} >${pruchaseItem[i].avaialable}</td>
                  <td ${css.td} >${pruchaseItem[i].unitTotalCost}</td>
                  <td ${css.td} >${cashVal(Math.ceil(profit))} / ${percent}%</td>
                  <td ${css.td} >${pruchaseItem[i].item_total_sold}</td>
                  <td ${css.td} >${pruchaseItem[i].rowTotal}</td>
                  
                </tr> 
            `
            purchasedTotal += parseFloat(pruchaseItem[i].rowTotal.replace(/[$,]/g, ''));
            soldTotal += parseFloat(pruchaseItem[i].item_total_sold.replace(/[$,]/g, ''));
        }

        table += `<tr><td colspan='7' ${css.td}><div align='right'><h3>TOTAL</h3></div></td><td ${css.td} ><h3>${cashVal(soldTotal)}</h3></td><td ${css.td} ><h3>${cashVal(purchasedTotal)}</h3></td></tr></table>`

        return table

}


function generateSoldTable(soldItem, data){ 

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
                  <th ${css.th}>ROW PROFIT</th>
                  <th ${css.th}>ROW TOTAL</th>
                  
                </tr> 
        `
        for ( let i=0; i< soldItem.length; i++ ){ //console.log('for>>>', soldItem.length)
            
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

        table += `<tr><td colspan='6' ${css.td}><div align='right'><h3>TOTAL</h3></div></td><td ${css.td} ><h3>${cashVal(data.profit)}</h3></td><td ${css.td} ><h3>${cashVal(soldTotal)}</h3></td></tr></table>`

        return table
}


function cashVal(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
function rowStyle(i){

if( i % 2 === 0 ){ return '' }
return css.trGray

}

