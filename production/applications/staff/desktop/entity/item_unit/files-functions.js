item_unit.js//switch case for all the others elements
 
     function start( detail )

     switch (detail.elem)
       item_unit-snack.js            > snack.js        > snack-generator.js 
       item_unit-menu.js             > menu.js         > menu-generator.js 
       item_unit-backdrop.js         > backdrop.js     > backdrop-generator.js 
       item_unit-banner.js           > banner.js       > banner-generator.js 
       item_unit-confirmation.js     > confirmation.js > confirmation-generator.js 
       item_unit-dialog.js           > dialog.js       > dialog-generator.js 



////////////////////////////PAGE////////////////////////////////////////////////
item_unit-page.js
       import item_unitPage //page contain dt
       body.insertAdjacentHTML("beforeend", item_unitPage)
       item_unitDt.start()

////////////////////////////DT////////////////////////////////////////////////////
item_unit-dt.js
       function loadBasic(detail)
       async function downloadMultiple(detail)

////////////////////////////FULLCONT//////////////////////////////////////////////
item_unit-fullcont.js
        import item_unit-fullcont.html
        function prepareAdd(detail)
        function load(detail)
        function hide(detail )
        function saveFromDialog(detail)
        function wasEdited(detail)
        function getOne(detail)
        function update(detail)

item_unit-fullcont-form.js
        const form
        const formCopy

////////////////////////////FULLCONT STEPPER//////////////////////////////////////////
item_unit-fullcont-stepper.js
        import item_unit-fullcont-stepper.html
        function move(detail)
        function submit(detail)
        function show(detail)
        function init(detail)
        function hide(detail)
        function discard(detail)

item_unit-fullcont-stepperform.js
        const form
        const formCopy


////////////////////////////FULLCONT GENERAL////////////////////////////////////////////
 fullcont.js    
        function show(detail)                  
        function hide(detail)                
        function pageMov(detail)                 
        
fullcontPageMove.js
        function start(detail)

 fullcontFormHandler.js  
        function fill(form)
        function clean(form) 
        function checkRequired(form)
        function getValues(form)
        function wasEdited(form, formCopy)
        function refreshFormCopy(form, formCopy)
        function cleanFromValues(form, formCopy)
        function addInfToDetail(form, formCopy, phpFile, detail)
        function loadDataToForm(form, data)

 fullcontHandler.js      
        function discard( detail, form, formCopy )
        function initHTML(htmlFullcont, form, formCopy, id)
        function prepareAdd(detail, form, formCopy)
        function prepareView(detail)
        function prepareEdit(detail)

 fullcontDbGeneral.js   
        function getOne(detail, callback)
        function addOne(detail, callback)
        function updateOne(detail, callback)
        async function downloadOne(detail)