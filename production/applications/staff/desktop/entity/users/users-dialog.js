
const dialog    = require ('../../../../../components/dialog/dialog')

export function start( detail ){  console.log('dialog users detail', detail)

	dialogBody[detail.id].start(detail) 
	
	detail.html =  dialogBody[detail.id]
	dialog.start(detail)
}

const dialogBody = {

	chagePassword: { 
		title:  '',
		des: '',
		bodyHtml:`

          <div class="textfield  textfield-password password-noview mt-16"  >

            <input  class= 'elem' type="password"    autocomplete="off"
                     data-detail='{ "key":   [ {"dest":"textfield", "act":"validator", "validator": "passIsStrong"  }
                                    ] }' >

            <div class="indicador"></div>

            <div class="trailing"  data-detail='{"click": [{"dest":"textfield", "act":"password"}] }' >
              <svg><use xlink:href="./css/svg.svg#eye"></use></svg>
            </div>

            <div class="label"  >Password </div> 
            <div class="helper" >Required*</div>

          </div><!-- textfield -->   
		`,

		primary: {
			text:'',
			class:'button primary',
	        dataDetail:``,
		},

		secondary: {
			text:'',
			class:'button   button-flat',
	    dataDetail:`data-detail='{ "click": [ {"dest":"ripple" },  
	    											   {"dest":"dialog", "act":"hide"} ]}'`,
		},    
   
   		tertiary: {
			text:'',
			class:'button button-plain',
	    dataDetail:`data-detail='{ "click": [ {"dest":"ripple" }, 
	    										     {"dest":"users",  "elem":"autoGenPassword"} ]}'`,
		},   


		start: function(detail){

			this.title              = 'Change user password'
			this.des                = ''
			this.primary.text       = 'update'
			this.secondary.text     = 'cancel'						
			this.tertiary.text      = 'Autogenerate'	
			this.primary.dataDetail = `data-detail='{
			                       			 "click": [
			                            {"dest":"ripple" },
			                            {"dest":"users",  "elem":"chagePassword", "dbid":"${detail.dbid}" }  ]}'`

		}

	},
	
}