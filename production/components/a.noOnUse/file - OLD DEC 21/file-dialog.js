
const dialog    = require ('../dialog/dialog')
const generator = require('../file/file-server-generator') 

export function start( detail ){ //console.log('dialog        file@@@@@@@@@ detail', detail) 

    const selectedFiles = generator.getSelectedFiles(detail.entity, "file-deletedFiles");

    detail.act = "show";
    detail.html =  dialogBody[detail.id];   

    if(selectedFiles.length == 0){       
        dialogBody[detail.id].startEmpty(detail);
    }
    else{         
        detail.fileQty = selectedFiles.length;
        if(detail.fileQty>1) detail.dialogDesc =  'Are you sure you want to permanently delete the '+detail.fileQty+' files below?<br><br>'+selectedFiles.join("<br>");
        else detail.dialogDesc =  'Are you sure you want to permanently delete the file below?<br><br>'+selectedFiles.join("<br>");
        dialogBody[detail.id].start(detail) 
    }

	dialog.start(detail)
	
}


const dialogBody = {


	confirmDelete: { 
		title:  '',
		des: '',
		
		primary: {

			text:'',
			class:'button   ', //button-plain
	        dataDetail:`data-detail='{ "click": [ {"dest":"ripple" },  {"dest":"dialog", "act":"hide"} ]}'`,

		},  

		secondary: {

			text:'',
			class:'button button-flat',
	        dataDetail: '',
	        

		},

  

		tertiary: {

			text:'',
			class:'',
	        dataDetail:``,
		}, 
        
        startEmpty: function(detail){
			this.title     = 'Delete File'
			this.des       = 'Please, select at least one file!'
			this.primary.text   = 'Close'
			this.secondary.text = ''						
			this.tertiary.text  = ''
            this.primary.dataDetail = `data-detail='{
                "click": [
                    {"dest":"ripple" },
                    {"dest":"dialog", "act":"hide"}
                ]}'`						
		},

		start: function(detail){
			this.title     = 'Delete File'
			this.des       = detail.dialogDesc
			this.secondary.text   = 'Delete forever'
			this.primary.text = 'Cancel'						
			this.tertiary.text  = ''
            this.secondary.dataDetail = `data-detail='{
                "click": [
                    {"dest":"ripple" },
                    {"dest":"dialog", "act":"hide"},
                    {"dest":"file", "act":"deletePermanentFile", "entity": "${detail.entity}"}
                ]}'`						
		}

	},
	
}



