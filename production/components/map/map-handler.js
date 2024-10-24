
const googleKey   = 'AIzaSyByoOWZZ7yAt1Kr0rZQIm56MjivnhQn-rA'


export function searchMyCoor(detail, callback) {  //console.log('searchMyCoor>')
    
        navigator.geolocation.getCurrentPosition( (position)=>{ 
           
            const   ShortPosition  = {lat:position.coords.latitude, lng:position.coords.longitude} 
            
            callback(ShortPosition)

        }, (ERROR)=>{  callback('errorLoadingLocation')  })/*navigator*/

}/*searchCoor*/




//this function load one or multiple location to an map
export function loadLocation(detail) { //console.log('map loadLocation >', detail.position )

  if(detail.value === ''){ return }

  coorToNum(detail)

  const mapDest  = document.getElementById(detail.id)
  const body     = mapDest.querySelector('.body')
  const des      = mapDest.querySelector('.des')  

  const  options   = { center: {lat:detail.value.lat, lng:detail.value.lng}, zoom: 14, disableDefaultUI: true }

  const map = new google.maps.Map(body, options)

  const marker =  new google.maps.Marker({
        position: detail.value,
        map: map, 
        icon: { url: `./css/svg/map/${ detail.pin}.svg`, scaledSize: new google.maps.Size(50, 50) }
  }) 


  //add the coors to the html map data-coor
  mapDest.setAttribute('data-coor', JSON.stringify(detail.value) )

}/**/


//here we convert the coors to numbers
function coorToNum(detail){ console.log('coorToNum', typeof detail.value)

    //if is an string, convert to JSON
    if( typeof detail.value === 'string'){
       detail.value = JSON.parse( detail.value)
    }

    //convert to num, por si acaso
    detail.value.lat =  parseFloat(  detail.value.lat )
    detail.value.lng =  parseFloat(  detail.value.lng )
}



export function generateMap(detail, position) {  //console.log('map generateMap>>>>>>>>>>>>>>>>>>>>>', position)

  const mapDest = document.getElementById(detail.id)
  const body    = mapDest.querySelector('.body')
  const des     = mapDest.querySelector('.des')

  const  options   = { center: {lat:position.lat, lng:position.lng}, 
                        zoom: 14, disableDefaultUI: true }

  //add the coors to the html map data-coor
  mapDest.setAttribute('data-coor', JSON.stringify(position) )

  const map = new google.maps.Map(body, options)

  //create popupp windows on marker
  const contentString = `<p class='font-title-big' data-detail='{"click": [{"dest":"ripple" }] }'>
  ASD</br>
  FAS</br>
  DFA</br>
  SDF
  </p>`

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  ///////////testing

  //creeate the pin on the map
  const marker = new google.maps.Marker({
      position: position,
      map: map, 
      icon: { url: `./css/svg/map/${detail.pin}.svg`, scaledSize: new google.maps.Size(50, 50) }
  })


  marker.addListener('click', (ev)=>{ 
    infowindow.open(map, marker);
  });


  //set the address at the top of the map
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${googleKey}`).
   then( result => result.json()  ).
   then((result) =>{ 
       des.innerHTML = `${result.results[0].formatted_address} <span>This position isn't precise</span> `
       mapDest.setAttribute('data-address', JSON.stringify(result.results[0].formatted_address) )
   })

}/*export*/




function markerClicked(ev){

}




 //multiple location to an map
 export function loadLocationMultiple(detail) { console.log('loadLocationMultiple ##', detail)

  const mapDest = document.getElementById(detail.id)
  const body    = mapDest.querySelector('.body')
  const des     = mapDest.querySelector('.des')  

  //const  options   = { center: {lat:position[0].lat, lng:position[0].lng}, zoom: 14, disableDefaultUI: true }
  const  options   = { center: {lat:detail.position[0].lat, lng:detail.position[0].lng}, zoom: 14, disableDefaultUI: true }

  const map = new google.maps.Map(body, options)

  for(let i=0; i < detail.position.length; i++){

     let marker =  new google.maps.Marker({
          position: detail.position[i],
          map:      map, 
          icon:     { url: `./css/svg/map/${ detail.position[i].pin}.svg`, scaledSize: new google.maps.Size(50, 50) }
      }) 

     //save marker on the array for future manipulation
     detail.position[i].marker = marker
  }/*for*/

}/**/

