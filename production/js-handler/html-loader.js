
import fileDialog            from "../components/file/file-dialog.html";
import fileDownCont          from "../components/file/file-download-container.html";
import fileFull              from "../components/file/file-full.html";
import avatarFull              from "../components/file/avatar-view.html";
import fileNewFolderDialog   from "../components/file/file-dialog-newFolder.html";
import loading      			  from "../components/loading/loading.html";
import login        			  from "../components/login/login.html";
import scrimLoading 			  from "../components/scrim/scrim-loading.html";
import signature    			  from "../components/signature/signature.html";


var skullElem = ''

//skullElem  += appbar
//skullElem  += avatarHtml
//skullElem  += drawerHtml
//skullElem  += fab
skullElem  += fileDialog
skullElem  += fileDownCont
skullElem  += fileFull
skullElem  += avatarFull
skullElem  += fileNewFolderDialog
skullElem  += scrimLoading
skullElem  += signature


export function esencial(){ //console.log('esencial>')

   const body = document.body	

   body.insertAdjacentHTML("beforeend", floatElem)  
   body.insertAdjacentHTML("beforeend", loading) 
   body.insertAdjacentHTML("beforeend", login) 
   body.insertAdjacentHTML("beforeend", scrims) 
   body.insertAdjacentHTML("beforeend", skullElem)   

}/**/


/*****************ELEMENTS*********************/
const floatElem = `
	<floatElements>

		<div class="dialog"        	  id="dialog"       				  ></div>
		<div class="menu "         	  id="menu"         				  ></div>
		<div class="backdrop"      	  id="backdrop"     				  ></div>
		<div class="confirmation " 	  id="confirmation" 				  ></div>
		<div class="snack"              id="snack"        				  ></div>
		<div class="onboard"        	  id="onboard"       			  ></div>

		<div class=""                   id="autocompleteSelector" 
			data-detail='{"click": [ {"dest":"autocomplete", "act":"hide"} ] }' ></div>
		
		<iframe id="reportIframe" style="display:none;"                   ></iframe>
	</floatElements>

`

const scrims =  `
	<scrims>
		<div  class="scrim"  id="scrim_autocomplete"  data-detail='{"click": [ {"dest":"autocomplete", "act":"hide"} ] }'  ></div>
		<div  class="scrim"  id="scrim_backdrop"      data-detail='{"click": [ {"dest":"backdrop",     "act":"hide"} ] }'  ></div>
		<div  class="scrim"  id="scrim_confirmation"  data-detail='{"click": [ {"dest":"confirmation", "act":"hide"} ] }'  ></div>
		<div  class="scrim"  id="scrim_dialog"        data-detail='{"click": [ {"dest":"dialog",       "act":"hide"} ] }'  ></div>
		<div  class="scrim"  id="scrim_drawer"        data-detail='{"click": [ {"dest":"drawer",       "act":"hide"} ] }'  ></div>
		<div  class="scrim"  id="scrim_menu"          data-detail='{"click": [ {"dest":"menu",         "act":"hide"} ] }'  ></div>
		<div  class="scrim"  id="scrim_signature"     data-detail='{"click": [ {"dest":"signature",    "act":"hide"} ] }'  ></div>
		<div  class="scrim"  id="scrim_board"         data-detail='{"click": [ {"dest":"onboard",      "act":"hide"} ] }'  ></div>

		<div  class="scrim"  id="scrim_fullcont"      ></div>
	   <div  class="scrim"  id="scrim_login"         ></div>
		

		<div  class="scrim"  id="scrim_file"            data-detail='{"click": [ {"dest":"file",  "act":"hideDialog"} ] }' ></div> 
		<div  class="scrim"  id="scrim_file_rename"     data-detail='{"click": [ {"dest":"file",  "act":"hideRenameDialog"} ] }' ></div> 
		<div  class="scrim"  id="scrim_file_newFolder"  data-detail='{"click": [ {"dest":"file",  "act":"hideNewFolder"} ] }' ></div> 


		<div  class="scrim"  id="scrim_dialog_file"		data-detail='{"click": [ {"dest":"file",  "act":"hideDialog"} ] }'  ></div>
	
		</scrims>

`

/****************ELEMENTS*********************/