

const handler  = require('./purchase-key-handler')



export function start(detail) {
    obj[detail.act].start(detail)
}/**/



export const obj = {
    add_line_item:      { start: (detail)=>{  handler.add_line_item(detail)                     }},

}