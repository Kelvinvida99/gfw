const snack = require('../../../../../components/snack/snack')

export function start( detail ){ //console.log('snack Type -> ', detail)
 
  snackBody[detail.id].start(detail)

  detail.html = snackBody[detail.id]
  snack.start(detail)

}

const snackBody = {

  totalQtyItems: { 
        title: '', 
        large: false, 
        btn: '',
        class:``,
        dataDetail:``,

        start: function(detail){  
          this.title   = 'There are ' +detail.value+ ' items left of this product'      //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  noItems: { 
        title: '', 
        large: false, 
        btn: '',
        class:``,
        dataDetail:``,

        start: function(detail){  
          this.title   = 'There are no items left for this product'      //language.start('inProgress')     
          this.btn     = ''        //language.start('inProgress')     
        }
  },

  insufficientQuantity: { 
    title: '', 
    btn: '',
    class:``,

      dataDetail:`data-detail='{
                      "click": [
                          {"dest":"ripple" },
                          {"dest":"snack", "act":"hide"}
      ]}'`,


    start: function(){  
      this.title   = 'You cannot return more items than those available'        //language.start('inProgress')     
      // this.btn     = 'Undo'        //language.start('inProgress')     

    }
  },


}