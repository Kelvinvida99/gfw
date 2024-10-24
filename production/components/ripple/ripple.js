
export function show(ev){ //console.log('on Lc_ripple')

	const circle = document.createElement('span');
 	ev.target.appendChild(circle)   
 	circle.classList.add('ripple')

    //get the largest dimention of the element
	const dimentions = Math.max(ev.target.clientWidth, ev.target.clientHeight )

    circle.style.width = circle.style.height = dimentions + 'px';

    circle.style.top  = ev.clientY - ev.target.getBoundingClientRect().top  - dimentions / 2 + "px";
    circle.style.left = ev.pageX   - ev.target.getBoundingClientRect().left - dimentions / 2 + "px";


	remove(circle, (circle)=>{
		circle.remove();
	})

}

function remove(circle, callback){
	setTimeout(()=>{
		callback(circle)
	}, 700)
}


