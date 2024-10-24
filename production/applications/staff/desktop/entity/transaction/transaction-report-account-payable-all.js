const reportDB = require ('../../../../../components/report/report-db')
const report   = require ('../../../../../components/report/report')
const style    = require ('../../../../../components/report/report-style')
const css      = style.get()

export function start(detail){   
         
    const phpFile = 'server/php/sql/report.php' 
    
    detail.inf    = {entity: 'transaction', report:'account-payable-all', id: 'dataDbid' }

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
                        <h1  ${css.f32}>Report - Account Payable All </h1>
                        <p   ${css.f14} >This is a financial document that provides information about the money a 
                        company owes to its suppliers, vendors, or creditors for goods or services received on credit. </p>
            `
    return header

}

function generateTable(data){ // console.log('data>>>', data) 

        var table = `
               <h2 ${css.tableTitle}>Purchase Itemxxx</h2>
               <table ${css.table} class="dt-alterColor">
                <tr >
                  <th ${css.th}>transaction</th>
                  <th ${css.th}>total_due_30_days</th>
                  <th ${css.th}>total_due_31_to_60_days</th>
                  <th ${css.th}>total_due_61_to_90_days</th>
                  <th ${css.th}>total_due_over_90_days</th>
                </tr> 
        `
        for ( let i=0; i< data.length; i++ ){ //console.log('for>>>', data.length)
            
            let detailHtml = `data-detail='{"click": [ {"dest":"ripple" },  
                          {"dest":"customer", "elem":"fullcont",  "act":"jump", 
                           "actJump":"goToInvestor", "dtId":"investor-dt", "toSearch":"NIV33"  } ] }'`            
            table += `
                <tr>
                  <td ${css.td} >${data[i].transaction}</td>
                  <td ${css.td} >${data[i].total_due_30_days}</td>
                  <td ${css.td} >${data[i].total_due_31_to_60_days}</td>
                  <td ${css.td} >${data[i].total_due_61_to_90_days}</td>
                  <td ${css.td} >${data[i].total_due_over_90_days}</td>
                </tr> 
            `
        }

        table += `</table>`

        return table

}