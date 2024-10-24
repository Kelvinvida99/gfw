

export function start( detail ){ //console.log('Type', detail)

  bannerBody[detail.id].start() 
  return bannerBody[detail.id]

}

const bannerBody = {

  test: { 
    pageId:'page-1-primary',    

    des:  '',
    svg: 'person',

    primary: {
      text:'',
      class:'button primary',
          dataDetail:``,
    },      //contenct

    secondary: {
      text:``  ,
      class:'button secondary  button-plain',
          dataDetail:``,
    },      //contenct



    start: function(){

      this.des     = '1. Banner description   Banner description   Banner description   Banner description   Banner description '
      this.primary.text   = 'Ok'
      this.secondary.text = ''           

      this.primary.dataDetail   =`data-detail='{
                                 "click": [ {"dest":"ripple" }, {"dest":"banner", "act":"hide"} ]}'`
          
      this.secondary.dataDetail   =`data-detail='{
                                 "click": [ {"dest":"ripple" }, {"dest":"banner", "act":"hide"} ]}'`

    }

  },





}



