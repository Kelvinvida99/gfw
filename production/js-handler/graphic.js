

const screenHeight = window.innerHeight 
const screenWeight = window.innerWidth

function changeSVG(parent, icon){
	//console.log('changeSVG parent', parent)
	parent.querySelector('svg use').setAttribute("xlink:href", `./css/svg.svg#${icon}`);

}


function changeSVGxxx(parent, icon){
	//console.log('changeSVG parent', parent)
	parent.querySelector('svg use').setAttribute("xlink:href", `./css/svg.svg#${icon}`);

}


module.exports = {
	screenHeight:screenHeight, 
	screenWeight:screenWeight,
	changeSVG: changeSVG
}