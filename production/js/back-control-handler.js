
const settings       = require('../js-handler/settings')
const click          = require('./click')

//show the page on the url, no more
export function findPageOnUrl() {  //console.log( '#############URL >', getPageFromUrl() )

    const settingsData    = settings.getData()
    const pageOnUrl       = getPageFromUrl()
    window.location.hash  = ''  

    if(pageOnUrl != false){ //console.log( '#############URL ', settingsData.pageMap[pageOnUrl].click)
          click.start( settingsData.pageMap[pageOnUrl].click ) 
  

    }else{ //console.log( '#############URL > NO PAGE' )
           click.start( settingsData.pageMap.default.click ) 
    }




}

function getPageFromUrl() {

    const url        = window.location.href
    const indicePage = url.indexOf("page-");

    if (indicePage === -1) {
        return false;
    }

    const subcadenaDespuesPage = url.substring(indicePage + 5);
    const indiceSeparador = subcadenaDespuesPage.search(/[^a-zA-Z0-9]/);

    if (indiceSeparador === -1) {
        return subcadenaDespuesPage;
    }

    return subcadenaDespuesPage.substring(0, indiceSeparador);
}


