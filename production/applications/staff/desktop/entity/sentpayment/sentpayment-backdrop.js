const backdrop     = require ('../../../../../components/backdrop/backdrop')

export function start( detail ){ //console.log('Backdrop Type -> ', detail)
  
  const backdropElem = backdropBody[detail.id]

  //run the function for each of them, works for languaje
  for(let i=0; i< backdropElem.length; i++){
        backdropElem[i].start()
  }  

  detail.html = backdropElem
  backdrop.start(detail)
 
}

const backdropBody = {

    hellow: [

          
        {   text: '', //first element is always close
            svg:'', 
            class:`option`, //same name as the title test
            style:``,
            dataDetail:`data-detail='{
                            "click": [
                                {"dest":"ripple" },
                                {"dest":"backdrop", "id":"hellow", "act":"hide"}
            ]}'`,

            start: function(){}
        },

          
        {   text: 'closeElem', //first element is always close
            svg:'person', 
            class:`option`, //same name as the title test
            style:`circle circle-green`,
            dataDetail:`data-detail='{
                            "click": [
                                {"dest":"ripple" },
                                {"dest":"goku", "elem":"backdrop", "id":"hellow", "act":"hide"}
            ]}'`,

            start: function(){}
        },

          
        {   text: 'closeElem', //first element is always close
            svg:'person', 
            class:`option`, //same name as the title test
            style:`circle circle-red`,
            dataDetail:`data-detail='{
                            "click": [
                                {"dest":"ripple" },
                                {"dest":"goku", "elem":"backdrop", "id":"hellow", "act":"hide"}
            ]}'`,

            start: function(){}
        },

    ],

}