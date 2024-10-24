const selector = require('../../js-handler/selector')


const inf = {
	
	 target : '',
	 startX : 0,
	 startY : 0,
	 distX  : 0,
	 distY  : 0,
	 
	 tabLeft : 0,     //container left value
	 tabLeftMax: 0,  //maxvalue to righ per child
	 
	 tabPage: 0,
	 indicator: 0,
	 page: '',
	 tabBar: 0,
	 tabBarChilds: 0,
	 appbar: '',
	 appbarTop: 0, 	

	 screenWidth : 0,
	 screenHeight : 0,	
	 verticalMov: undefined, 

	 initClick(ev){ 

		//select elements
		this.tabPage    = ev.target.parentElement.parentElement.querySelector('.tab-page') //tab-page
		this.page       = this.tabPage.parentElement
		this.tabBar     = this.page.querySelector('.tab')
		this.appbar     = this.page.parentElement.querySelector('.appbar')
		
	 	this.screenWidth  = this.page.offsetWidth

		this.indicator    = selector.siblingFindClass(ev.target, 'indicator')
		this.tabBarChilds = this.tabBar.childElementCount-1

		this.verticalMov  = true

		return this.addAnimation(ev)

	 }, 

	 
	 init(ev){

	 	this.target     = ev.target,
		this.distX      = 0 // avoid error → user touch and don't move
		this.distY      = 0 

		this.startX     = parseInt(ev.changedTouches[0].clientX) 
		this.startY     = parseInt(ev.changedTouches[0].clientY) 

		//select elements
		this.tabPage    = ev.target.parentElement //tab-page
		this.page       = this.tabPage.parentElement
		this.tabBar     = this.page.querySelector('.tab')

	   // this.screenWidth  = window.innerWidth
	 	this.screenWidth  = this.page.offsetWidth
	 	// console.log('page.offsetWidth', page.offsetWidth)
	 	// console.log('window.innerWidth', window.innerWidth)
   
	 	this.screenHeight = window.innerHeight 

	    this.tabLeftMax = ((this.tabPage.childElementCount-1)*-1*this.screenWidth) //maximum mov per0 childs
		this.indicator    = this.tabPage.parentElement.querySelector('.indicator')

		this.verticalMov = undefined

		// //where the appbar is
		

		this.appbar     = this.page.parentElement.querySelector('.appbar')

		if(this.appbar === null){ //whiout appbar
			this.verticalMov = false

		}else{
			if( this.appbar.style.top === '' || this.appbar.style.top === '0px'){
				this.appbar.setAttribute("style", `top:0px`)
				this.appbarTop = 0
			}else{
				this.appbarTop = -56
			}			
		}


		return this.removeAnimation(ev)

	 }, 

	 removeAnimation(ev){

		this.tabPage.classList.remove("tab-anime") 
		this.indicator.classList.remove("tab-anime")  
		this.tabBar.classList.remove("tab-anime")  
		this.page.classList.remove("tab-anime")  

		if(this.appbar != null){
			this.appbar.classList.remove("tab-anime")  			
		}
	 },

	 addAnimation(){

		this.tabPage.classList.add("tab-anime") 
		this.indicator.classList.add("tab-anime")  
		this.tabBar.classList.add("tab-anime")  
		this.page.classList.add("tab-anime")  
		if(this.appbar != null){
			this.appbar.classList.add("tab-anime")  			
		}

	 }, 

}

module.exports = {
	inf:inf
}