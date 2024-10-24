
//this browser support service worker
if('serviceWorker' in navigator){
	//register the service worker on the browser
	navigator.serviceWorker.register('./serviceWorker.js')
	.then ((reg)=> console.log('ServiceWorker>Registerd')       )
	.catch((err)=> console.log('ServiceWorker>Registerd-ERROR') )

}




