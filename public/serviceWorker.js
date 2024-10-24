

const staticCacheName = 'site-static-v2.123';

	// './',
const assets = [

	'./index.html',
	'./js/bundle.js',		
	'./css/style.css',
	'./css/svg.svg',		

	'./css/svg/file/doc.svg',
	'./css/svg/file/exel.svg',
	'./css/svg/file/folder.svg',
	'./css/svg/file/folder-empty.svg',
	'./css/svg/file/img.svg',
	'./css/svg/file/nophoto.svg',
	'./css/svg/file/pdf.svg',
	'./css/svg/file/unknow.svg',


	// './css/svg/illustrations/gosive-logo-gradiente.svg',
	// './css/svg/illustrations/gosive-logo-white.svg',

	// './css/svg/map/no-internet.svg',
	// './css/svg/map/no-location.svg',
	// './css/svg/map/pin.svg',

	// './css/svg/status/away.svg',
	// './css/svg/status/busy.svg',
	// './css/svg/status/online.svg',	

	// './css/svg/block.svg',
	// './css/svg/check.svg',
	// './css/svg/check-dark.svg',
	// './css/svg/down.svg',
	// './css/svg/down-white.svg',
	// './css/svg/gesture.svg',
	// './css/svg/right.svg',
	// './css/svg/touch.svg',
	// './css/svg/view.svg',
]


//install service worker asdf asdf
self.addEventListener('install', (ev) =>{ console.log('ServiceWorker>Installed')

	ev.waitUntil(
		caches.open(staticCacheName)//open cache
		.then((cache)=>{ console.log('cache assets>>>>')
			//save files on the cache storage
			cache.addAll(assets) 
			///is working witn serviceWorker-version(), skeip waiting and reload page
			self.skipWaiting()  
		})
	)

})

//activate service workerxx
self.addEventListener('activate', (ev) =>{ console.log('ServiceWorker>Activate')
	//remove all the previous versions of cache
	ev.waitUntil(
		caches.keys()
		.then( keys => {
			return Promise.all(keys
				.filter(key => key  !== staticCacheName)
				.map(key => caches.delete(key))
			)
		})
	)
})

//fetch event
self.addEventListener('fetch', (ev) =>{ ///console.log('@@@@@@@@@@@@@ Fetch ev', ev)
	//verify if we have the fetch on cache storage
	ev.respondWith(
		caches.match(ev.request)
		.then((cacheRes)=>{ //console.log('we don have it local', ev.request)
			//if we don't have, process with the fetch
			return cacheRes || fetch(ev.request)
		})
	)

})

