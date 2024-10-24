areas.js//switch case for all the others elements
 
     function start( detail )

     switch (detail.elem)
       areas-snack.js            > snack.js        > snack-generator.js 
       areas-menu.js             > menu.js         > menu-generator.js 
       areas-backdrop.js         > backdrop.js     > backdrop-generator.js 
       areas-banner.js           > banner.js       > banner-generator.js 
       areas-confirmation.js     > confirmation.js > confirmation-generator.js 
       areas-dialog.js           > dialog.js       > dialog-generator.js 



////////////////////////////PAGE////////////////////////////////////////////////
areas-page.js
       import areasPage //page contain dt
       body.insertAdjacentHTML("beforeend", areasPage)
       areasDt.start()

////////////////////////////DT////////////////////////////////////////////////////
areas-dt.js
       function loadBasic(detail)
       async function downloadMultiple(detail)

////////////////////////////FULLCONT//////////////////////////////////////////////
areas-fullcont.js
        import areas-fullcont.html
        function prepareAdd(detail)
        function load(detail)
        function hide(detail )
        function saveFromDialog(detail)
        function wasEdited(detail)
        function getOne(detail)
        function update(detail)

areas-fullcont-form.js
        const form
        const formCopy

////////////////////////////FULLCONT STEPPER//////////////////////////////////////////
areas-fullcont-stepper.js
        import areas-fullcont-stepper.html
        function move(detail)
        function submit(detail)
        function show(detail)
        function init(detail)
        function hide(detail)
        function discard(detail)

areas-fullcont-stepperform.js
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