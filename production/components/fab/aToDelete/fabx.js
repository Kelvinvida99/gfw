

const snack = require('../snack/snack')

//entities
const goku   = require('../../entity/goku/goku')
const powers = require('../../entity/powers/powers')
const users  = require('../../entity/users/users')

const services  = require('../../applications/staff/desktop/entity/services/services')


export function start(detail){ ///console.log('fab star>', detail)
  
 
	switch (detail.act){

         case 'add': add();        break;

	}
}

function add(){//console.log('fab add>')


    const allPage = document.getElementsByClassName("page_main");

    var actualViewPage = ''
    for (let i = 0; i < allPage.length; i++) {
         if(!allPage[i].classList.contains('dn')){ actualViewPage = allPage[i].id}
    }  


    switch (actualViewPage){
         case 'goku-page':    goku.start   ({dest:"goku",   elem:"fullcont", id:"goku-fullcont",   act:"prepareAdd"} );  break;
         case 'powers-page':  powers.start ({dest:"powers", elem:"fullcont", id:"powers-fullcont", act:"prepareAdd"} );  break;
         case 'users-page':   users.start  ({dest:"users",  elem:"fullcont", id:"users-fullcont",  act:"prepareAdd"} );  break;


         case 'home-page':      snack.start({act:'show',  id:'nothingToAdd'});        break;
         case 'homestaff-page': snack.start({act:'show',  id:'nothingToAdd'});        break;
         case 'monitor-page': snack.start({act:'show',  id:'nothingToAdd'});        break;

         ///staff dekstop
         case 'services-page':  services.start  ({dest:"services",  elem:"fullcont", id:"services-fullcont",  act:"prepareAdd"} );;        break;
         


    }

}





