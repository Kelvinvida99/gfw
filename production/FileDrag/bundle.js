
///https://www.youtube.com/watch?v=0HCiH4Tk04I&ab_channel=CodingNepal

var file 

document.body.addEventListener('dragover', function(ev){ //console.log('click>')  
  
    ev.preventDefault()

	const elem = ev.target
	if( elem.classList.contains('drag') ){
        elem.classList.add('drag-active')
	}

	

 }, true)



document.body.addEventListener('dragleave', function(ev){ //console.log('click>')  
        
	const elem = ev.target

	if( elem.classList.contains('drag') ){
        elem.classList.remove('drag-active')
	}

 }, true)



document.body.addEventListener('drop', function(ev){ //console.log('click>')  
        
    ev.preventDefault()

	const elem = ev.target

	if( elem.classList.contains('drag') ){
        elem.classList.remove('drag-active')
        console.log('drag File leave')
	}

	file = ev.dataTransfer.files

	console.log('droped file', file)

 }, true)