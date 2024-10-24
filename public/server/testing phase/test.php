<?php
//print_r(pathinfo("storage/gokudb/entities/goku/1/uploaded_files/A/pic.jpg", PATHINFO_EXTENSION));
//if(is_file("storage/gokudb/entities/goku/1/uploaded_files/A/pic.jpg"))
//echo "siii";


function findObjectById($id){
$array = array( /* your array of objects */ );

foreach ( $array as $element ) {
	if ( $id == $element->id ) {
		return $element;
	}
}

return false;
}


function generateRandomString($length = 20) {
    return substr(str_shuffle(str_repeat($x='0123456789abcde-fghijklmnopqrstuvwxyz', ceil($length/strlen($x)) )),1,$length);
}


?>
<body>
<button id="myBtn">Dame click rapido</button>
<form      style="display: none;"  method="post" name ='photo' class="fileUploadForm" id='goku_form_file' 
                    data-detail='{"submit": [ {"dest":"file", "act":"submittingFile", "formId":"goku-fullcont"} ] }'
                    enctype="multipart/form-data" data-file_type="uploaded_files" >
                      <input style="display: none;" class="fileUploadInput" type="file"  name="fileInputElement[]" data-detail='{"change": [ {"dest":"file", "act":"triggerSubmit", "formId":"goku-fullcont"} ] }' multiple />
                    </form>
</body>


<script>

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
document.body.addEventListener("submit", function(event){
  event.preventDefault();

  alert("klk")
});

</script>