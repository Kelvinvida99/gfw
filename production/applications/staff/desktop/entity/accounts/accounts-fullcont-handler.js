const fullcontEntity = require('../../../../../components/fullcont/fullcont-entity')
const snack          = require('../../../../../components/snack/snack')

export function validate(detail, htmlFc) {

      let mode = ""
      if (htmlFc.fullcontHTML.classList.contains('mode-add')) {
            mode = "add";
      } else {
            mode = "update";
      }

      switch (mode) {
            case "add":
                  fullcontEntity.addOne(detail, htmlFc);
                  break;

            case "update":
                  if (parseInt(htmlFc.fullcontHTML.getAttribute('data-DBid')) > 99) {
                        fullcontEntity.update(detail, htmlFc);
                  } else {
                        snack.start({ act: 'show', id: 'accountidisless', });
                  }
                  break;

            default:
                  break;
      }

}