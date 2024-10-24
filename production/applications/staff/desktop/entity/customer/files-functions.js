customer.js//switch case for all the others elements
 
     function start( detail )

     switch (detail.elem)
       customer-snack.js            > snack.js        > snack-generator.js 
       customer-menu.js             > menu.js         > menu-generator.js 
       customer-backdrop.js         > backdrop.js     > backdrop-generator.js 
       customer-banner.js           > banner.js       > banner-generator.js 
       customer-confirmation.js     > confirmation.js > confirmation-generator.js 
       customer-dialog.js           > dialog.js       > dialog-generator.js 



////////////////////////////PAGE////////////////////////////////////////////////
customer-page.js
       import customerPage //page contain dt
       body.insertAdjacentHTML("beforeend", customerPage)
       customerDt.start()

////////////////////////////DT////////////////////////////////////////////////////
customer-dt.js
       function loadBasic(detail)
       async function downloadMultiple(detail)

////////////////////////////FULLCONT//////////////////////////////////////////////
customer-fullcont.js
        import customer-fullcont.html
        function prepareAdd(detail)
        function load(detail)
        function hide(detail )
        function saveFromDialog(detail)
        function wasEdited(detail)
        function getOne(detail)
        function update(detail)

customer-fullcont-form.js
        const form
        const formCopy

////////////////////////////FULLCONT STEPPER//////////////////////////////////////////
customer-fullcont-stepper.js
        import customer-fullcont-stepper.html
        function move(detail)
        function submit(detail)
        function show(detail)
        function init(detail)
        function hide(detail)
        function discard(detail)

customer-fullcont-stepperform.js
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