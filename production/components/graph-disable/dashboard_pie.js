



$( "[class^='pie']" ).mouseenter(function(event){
 $(this).attr('stroke-width', '11' );
});

$( "[class^='pie']" ).mouseleave(function(event){
 $(this).attr('stroke-width', '10' );
});

/*let pieItems=[ 
{cant:10, label:'ARN'},  
{cant:30, label:'CHHA'},  
{cant:20, label:'LPN'},  
{cant:40, label:'CNA'}  

];*/

function drawPie(pieCont,pieItems,qtyToltal){ 
    var deg=0;
    $(`#${pieCont} .header`).html("");
    for (var i = 0; i < pieItems.length; i++) {
             let percent = (pieItems[i].cant/qtyToltal)*100;
             let real_qty = 
            setPie(i+1, percent, deg, pieCont);
            deg = deg + percent;
            $(`#${pieCont} .header`).append(`
              <div class="cont legend-${i}" style="width: ${100/pieItems.length}%;" title="${percent.toFixed(2)}%">
                <span align="center" style="background-color: ${colors[i]}; color:white">${pieItems[i].cant}</span>
                <label>${pieItems[i].label} ${percent.toFixed(2)}%</label>
              </div>  
              `);
             $(`#${pieCont} .header .legend-${i}`).css('opacity', '1');
    }/*fpr*/
}/*simulate_activity*/  


function setPie(pieClass, size, deg, pieCont ){

 //console.log('id-'+pieClass+' size-'+size+' deg-'+deg)

            $('#'+pieCont+' .pie-'+pieClass).attr('stroke-dasharray',`calc(${size} * 31.42 / 100) 31.42`);
            $('#'+pieCont+' .pie-'+pieClass).attr('fill','white');
            $('#'+pieCont+' .pie-'+pieClass).attr('stroke', colors[pieClass-1] );
            $('#'+pieCont+' .pie-'+pieClass).css('transform',  `rotate(${((deg*36)/10)}deg)`)
            $('#'+pieCont+' .pie-'+pieClass).css('visibility', 'visible');
            $('#'+pieCont+' .pie-'+pieClass).css('opacity', '1');

              $('#'+pieCont+' .line-'+pieClass).css('transform',  `rotate(${((deg*36)/10)}deg)`)
              $('#'+pieCont+' .line-'+pieClass).css('visibility', 'visible');


}/*setPie*/

