export function keyUpById(id){

        var ev = document.createEvent('Events');
        ev.initEvent('keyup', true, true);
        ev.keyCode = 13;
        ev.which = 13;
        ev.charCode = 13;
        ev.key = 'Enter';
        ev.code = 'Enter';
        var eventReturns = document.querySelector(`#${id}`).dispatchEvent(ev);    
        var Inputvalue = document.getElementById(`${id}`).value;

       // console.log({isdispatch: eventReturns, value: Inputvalue});         

}


export function keyUpByInput(input){ // console.log('keyUpByInput', input)

        var ev = document.createEvent('Events');
        ev.initEvent('keyup', true, true);
        ev.keyCode  = 13;
        ev.which    = 13;
        ev.charCode = 13;
        ev.key      = 'Enter';
        ev.code     = 'Enter';


        input.dispatchEvent(ev)    

}
