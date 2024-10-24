

//https://www.youtube.com/watch?v=jfYWwQrtzzY&ab_channel=WebDevSimplified



document.body.addEventListener('dragstart', function(ev){  console.log('drag start')


		const elem = ev.target

	if( elem.classList.contains('dragMe') ){
        elem.classList.add('dragMe-active')
	}

 }, true)    


document.body.addEventListener('dragend', function(ev){  console.log('drag end')

	ev.preventDefault()	
	const elem = ev.target

	if( elem.classList.contains('dragMe') ){
        elem.classList.remove('dragMe-active')
	}
	

 }, true)


document.body.addEventListener('dragover', function(ev){ 
	
	ev.preventDefault()

	const cont = ev.target
	const isCont = cont.classList.contains('dropCont')

	if( isCont ){
		cont.classList.add('dropCont-active')
	}

 // console.log('dragover', ev.target)

	// const container = ev.target
	// const elem = document.querySelector('.drag-active')

	// container.appendChild(elem)   

	

 }, true)



document.body.addEventListener('dragleave', function(ev){ 
	

	const cont = ev.target
	cont.classList.remove('dropCont-active')
	
 }, true)


document.body.addEventListener('drop', function(ev){ console.log('drop')

	const cont = ev.target
	const elem = document.querySelector('.dragMe-active')

	cont.appendChild(elem)   

	cont.classList.remove('dropCont-active')
	elem.classList.remove('dragMe-active')

	

 }, true)

