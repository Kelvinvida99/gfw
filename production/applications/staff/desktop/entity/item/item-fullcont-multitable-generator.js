//we use this id for create unic name for multiselect
//only used for the ac selection
var acUnicId = 0

export function goku_vs_powers(id){

	acUnicId++
	return `
	<div class="line line-${id}" lineId="${id}"  > 

        <div class="removeLine" 
           data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" }  ] }'>
        </div>  

	    <div class="row">
	      <div class="c50">

	            <div class="textfield  powerValue"  >

	              <input autocomplete="off"  class= 'elem' type="text"   value="" 
	                     data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' >

	                <div class="indicador"></div>

	                <div class="trailing"  data-detail='{"click": [{"dest":"textfield", "act":"clear"}] }' >
	                  <svg><use xlink:href="./css/svg.svg#cancel"></use></svg>
	                </div>

	                <div class="label">Power Value</div> 
	                <div class="helper" >Required*</div>
	            </div><!-- textfield -->  

	      </div><!-- c50 --> 
	      <div class="c50">


            <div class="textfield   textfield-autocomplete au__goku_vs_powers_vs_power" id="item_form_department_mt_${acUnicId}" selected = '[]'  max = '3'>

                <input autocomplete="off"  class= 'elem' type="text" 
                      data-detail='{
                     "key": [   {"dest":"textfield",    "act":"typing" }, 
                                {"dest":"autocomplete", "act":"typing",  "entity": "powers", "mainFilter": ["name"], "parent": "item_form_department_mt_${acUnicId}"   }],
                     "click": [ {"dest":"autocomplete", "act":"click",   "entity": "powers", "mainFilter": ["name"], "parent": "item_form_department_mt_${acUnicId}"   }]
                     }' >
                     
                <div class="chip-cont"></div>
                <div class="label">Auto Complete</div> 

            </div> <!-- textfield --> 

	      </div><!-- c50 --> 
	    </div><!-- row -->  


	</div><!-- line -->  
	`

}





//we use this id for create unic name for multiselect
var radioUnicId = 0

export function goku_vs_countries(id){

	radioUnicId++
	return `

	<div class="line line-${id} " lineId="${id}"   > 

        <div class="removeLine" 
           data-detail='{"click": [  {"dest":"ripple"}, {"dest":"multitable", "act":"removeLine" }  ] }'>
        </div>  

	    <div class="row">
	      <div class="c33">

	            <div class="textfield  name "  >

	              <input autocomplete="off"  class= 'elem' type="text"    
	                     data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' >

	                <div class="indicador"></div>

	                <div class="trailing"  data-detail='{"click": [{"dest":"textfield", "act":"clear"}] }' >
	                  <svg><use xlink:href="./css/svg.svg#cancel"></use></svg>
	                </div>

	                <div class="label">Power Value</div> 
	                <div class="helper" >Required*</div>
	            </div><!-- textfield -->  

	      </div><!-- c33 --> 

	      <div class="c33">



        <div class="textfield textfield-date dateVisited" >
          <input autocomplete="off"  class= 'elem' type="date"   value='0000-00-00' 
              data-detail='{"click": [ {"dest":"textfield", "act":"focused"  }], 
                              "key": [ {"dest":"textfield", "act":"validator", "validator": "date"  }], 
                           "change": [{"dest":"textfield", "act":"validator", "validator": "date"  }] }'  >

          <div class="indicador"></div>

          <div class="label">date input </div> 
          <div class="helper" >Required*</div>
        </div><!-- textfield  {"dest":"textfield", "act":"typing"  },  -->  


	      </div><!-- c33 --> 

      <div class="c33">

				<div class="textfield  textfield-multiselect textfield-filled race"  >
				    <select class= 'elem' > 
				    	  <option value="">car model</option>
				    	  <option value="latino">latino</option>
				    	  <option value="prieto">prieto</option>
				    	  <option value="rubio">rubio</option>
				    </select> 

				    <div class="indicador"></div>

				    <div class="trailing">
				      <svg><use xlink:href="./css/svg.svg#downs"></use></svg>
				    </div>

				    <div class="label">Car type</div> 
				    <div class="helper">Required</div>
				    <div class="counter">10/10</div> 
				</div> <!-- textfield -->

      </div><!-- c33 --> 

	    </div><!-- row -->  



     <div class="row">
      <div class="c25">

	      <div class="checkbox tropical"  > 
	         <label class="title">Zone</label>
	         <input autocomplete="off" type="checkbox" name="">
	         <label  >tropical</label>
	      </div>

      </div>
      <div class="c75">

		    <div class="radio radio-line continent" >
		        <label class="title">Zone</label>
		        <div>
		          <input autocomplete="off" type="radio"  name="continent-${radioUnicId}" value="America" >
		          <label for="male">America</label>
		        </div>
		        <div>
		          <input autocomplete="off" type="radio"  name="continent-${radioUnicId}" value="Europa">
		          <label for="male">Europa</label>
		        </div>
		    </div> 

      </div>

      </div><!-- c33 -->  
    </div><!-- row --> 


	</div><!-- line -->  
	`

}

