
const dialog    = require ('../../components/dialog/dialog')

export function start( detail ){ console.log('dialog GOKU detail', detail)

	dialogBody[detail.id].start() 
	
	detail.html =  dialogBody[detail.id]
	dialog.start(detail)


}


const dialogBody = {


	hellow: { 
		title:  '',
		des: '',
		bodyHtml:`

				<div class="textfield textfield-filled  textfield-autocomplete" id="_______">

				  <input  class= 'elem' type="text"   value="empy1" 
				         data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' >

				  <div class="indicador"></div>

				  <div class="trailing"  data-detail='{"click": [{"dest":"textfield", "act":"clear"}] }' >
				    <svg><use xlink:href="../../../public/css/svg.svg#cancel"></use></svg>
				  </div>

				  <div class="label">text</div> 
				  <div class="helper" >Required*</div>
				  <div class="counter">10/10</div> 
				  <div class="selector"></div>
				</div><!-- textfield -->  


				<div class="textfield textfield-filled  textfield-autocomplete" id="_______">

				  <input  class= 'elem' type="text"   value="empy1" 
				         data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' >

				  <div class="indicador"></div>

				  <div class="trailing"  data-detail='{"click": [{"dest":"textfield", "act":"clear"}] }' >
				    <svg><use xlink:href="../../../public/css/svg.svg#cancel"></use></svg>
				  </div>

				  <div class="label">text</div> 
				  <div class="helper" >Required*</div>
				  <div class="counter">10/10</div> 
				  <div class="selector"></div>
				</div><!-- textfield -->  

		`,

		primary: {
			text:'',
			class:'button primary',
	        dataDetail:`data-detail='{
	                        "click": [
	                            {"dest":"ripple" },
	                            {"dest":"dialog", "act":"hide"} ]}'`,
		},

		secondary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:`data-detail='{ "click": [ {"dest":"ripple" },  {"dest":"dialog", "act":"hide"} ]}'`,
		},    

		tertiary: {
			text:'',
			class:'button secondary  button-plain',
	        dataDetail:`data-detail='{  "click": [ {"dest":"ripple" },  {"dest":"dialog", "act":"hide"} ]}'`,
		},      

		start: function(){
			this.title     = 'TEST title'
			this.des       = ''
			this.primary.text   = 'TEST 111'
			this.secondary.text = 'TEST 222'						
			this.tertiary.text  = 'TEST 33333'						
		}

	},
	
}



