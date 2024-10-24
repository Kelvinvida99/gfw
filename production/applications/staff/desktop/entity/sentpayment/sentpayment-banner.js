const banner       = require ('../../components/banner/banner')

export function start( detail ){ //console.log('Type', detail)
  
  bannerBody[detail.id].start() 
  
  detail.html = bannerBody[detail.id]
  banner.start(detail)

}

const bannerBody = {

  hellow: { 
    id: 'goku-banner-hellow',
    des:  '',
    svg: 'person',

    primary: {
      text:'',
      class:'button ',
      dataDetail:`data-detail='{
                      "click": [
                          {"dest":"ripple" },
                          {"dest":"banner",  "act":"hide"}
      ]}'`,

    },      //contenct

    secondary: {
      text:'',
      class:'button button-plain',
      dataDetail:`data-detail='{
                      "click": [
                          {"dest":"ripple" },
                          {"dest":"banner",  "act":"hide"}
      ]}'`,





    },      //contenct


    start: function(){

      this.des            = '1. Banner description'
      this.primary.text   = 'btn 111'
      this.secondary.text = 'btn 222'           

    }

  },
}