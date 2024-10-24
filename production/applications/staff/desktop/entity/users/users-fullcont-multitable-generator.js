

//we use this id for create unic name for multiselect
var radioUnicId = 0

export function users_vs_permissions(id, entityValue){

	radioUnicId++
	return `

	<div class="line line-${id} " lineId="${id}"   > 


	    <div class="row">
	      <div class="c25">

	            <div class="textfield  textfield-filled textfield-desk entity textfield-disabled "  >

	              <input autocomplete="off"  class= 'elem' type="text"    value="${entityValue}"
	                     data-detail='{"key":   [ {"dest":"textfield", "act":"typing"  }] }' >

	                <div class="indicador"></div>
	                <div class="label">Entity</div> 
	            </div><!-- textfield -->  

	      </div><!-- c25 --> 

	      <div class="c25">

				<div class="textfield   textfield-desk textfield-multiselect textfield-filled privilegeDB"  >
				    <select class= 'elem' > 
				    	  <option value="none">Deny</option>
				    	  <option value="readOnly">Read Only</option>
				    	  <option value="readWrite">Read and Write</option>
				    </select> 

				    <div class="indicador"></div>

				    <div class="trailing">
				      <svg><use xlink:href="./css/svg.svg#downs"></use></svg>
				    </div>

				    <div class="label">Entity Control</div> 
				</div> <!-- textfield -->



	      </div><!-- c25 --> 

	      <div class="c25">

					<div class="textfield   textfield-desk textfield-multiselect textfield-filled privilegeFile"  >
					    <select class= 'elem' > 
					    	  <option value="none">Deny</option>
					    	  <option value="readOnly">Read Only</option>
					    	  <option value="readWrite">Read Write</option>
					    </select> 

					    <div class="indicador"></div>

					    <div class="trailing">
					      <svg><use xlink:href="./css/svg.svg#downs"></use></svg>
					    </div>

					    <div class="label">Files Control</div> 

					</div> <!-- textfield -->

	      </div><!-- c25 --> 

		  <div class="c25">

			<div class="textfield   textfield-desk textfield-multiselect textfield-filled privilegeAgrmt"  >
				<select class= 'elem' > 
						<option value="none">Deny</option>
						<option value="readOnly">Read Only</option>
						<option value="readWrite">Read Write</option>
				</select> 

				<div class="indicador"></div>

				<div class="trailing">
					<svg><use xlink:href="./css/svg.svg#downs"></use></svg>
				</div>

				<div class="label">Agreements Control</div> 

			</div> <!-- textfield -->

		</div><!-- c25 --> 



	    </div><!-- row -->  




	</div><!-- line -->  
	`

}


