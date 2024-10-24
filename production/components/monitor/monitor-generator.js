
const string = require('../../js-handler/string')


//<div class="icon"> <svg><use xlink:href="./css/svg.svg#building"></use></svg>  </div>
export function company(company){ //console.log('company>')
    // 25/10/2023 marco molina
    const company_name =string.removeSpecialCharacters(company.name);

    const destPage = document.getElementById('monitor-page')
    
    const body = `
         <div class="monitor" id="monitor-${company_name}">

             <div class="bar">


                    <label>${string.capitalizeFirstLetter(company.name)}</label>

                    <div class="unit  unit-click select" 
                            data-detail='{"click": [ 
                              {"dest":"ripple" },                               
                              {"dest":"monitor", "id":"monitor-${company_name}", "elem":"tab",  "act":"pageMov", "pagetoshow":"users" }  ] }' > 

                        <div class="icon"> 
                            <svg><use xlink:href="./css/svg.svg#person"></use></svg>  
                        </div>
                         <label> ${company.user.length} </label>
                    </div>


                    <div class="unit purple unit-click" 
                            data-detail='{"click": [ 
                              {"dest":"ripple" },                               
                              {"dest":"monitor", "id":"monitor-${company_name}", "elem":"tab",  "act":"pageMov", "pagetoshow":"storage" }  ] }' > 

                        <div class="icon "> 
                            <svg><use xlink:href="./css/svg.svg#cloud"></use></svg> 
                        </div>
                        <label>${company.storage}</label>
                    </div>


                    <div class="unit unit-100 lastUpdate " title="Last seen activity was"> 
                        <div class="icon"> <svg><use xlink:href="./css/svg.svg#time-history"></use></svg>  </div>
                        <label  class="lastUpdateDetail" data-time =''>--:--</label>
                    </div>
                                                                                    
             </div>

             <div class="page users" > </div>
 
             <div class="page payment dn" > <h1>payment</h1> </div>

             <div class="page storage dn" > <h1>Storage Details</h1> </div>

         </div><!-- monitor -->  `

         
        destPage.insertAdjacentHTML("beforeend", body) 

}/**/



//each user details is called line
export function line(company){ //console.log('line>')
    // 25/10/2023 marco molina
    const company_name =string.removeSpecialCharacters(company.name);

     const destPage     = document.getElementById(`monitor-${company_name}`)
     const usersPage    = destPage.querySelector('.users')

     var body =''

        for (let j = 0 ;  j < company.user.length ; j++) {  //console.log('users>>', company.user[j])

            body += `<div class="line" id="monitor-${company_name}-${company.user[j].id}"
                            data-detail='{"click": [ {"dest":"ripple" }, 
                           {"dest":"monitor", "elem":"menu", "id":"userOption", 
                            "company":"${company_name}", 
                            "idUser":"${company.user[j].id}", 
                            "act": "show" }  ] }'  > `

                 body += `
                        <div class="line-avatar selectNo"
                            style="background-image: url('${company.user[j].avatar}');" > 
                            <div class="status"></div>
                        </div>

                        <label>${ string.capitalizeFirstLetter(company.user[j].name) }</label> `

                body += ` <div class="unit  device selectNo" >  
                            <div class="icon"> 
                                <svg><use xlink:href="./css/svg.svg#desktop"></use></svg>  
                            </div>
                            <label></label>
                        </div> `

                body += ` <div class="unit  browser selectNo" >  
                            <div class="icon"> 
                                <svg><use xlink:href="./css/svg.svg#web"></use></svg>  
                            </div>
                            <label></label>
                        </div> `

                body += ` <div class="unit lastUpdate unit-100 selectNo"  title=''> 
                                <div class="icon"> 
                                    <svg><use xlink:href="./css/svg.svg#time-history"></use></svg>  
                                </div>
                                <label ></label>
                           </div>`


            body += `  </div><!-- line --> `
        }

        usersPage.insertAdjacentHTML("beforeend", body) 
}





