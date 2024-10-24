accounts.js//switch case for all the others elements
 
     function start( detail )

     switch (detail.elem)
       accounts-snack.js            > snack.js        > snack-generator.js 
       accounts-menu.js             > menu.js         > menu-generator.js 
       accounts-backdrop.js         > backdrop.js     > backdrop-generator.js 
       accounts-banner.js           > banner.js       > banner-generator.js 
       accounts-confirmation.js     > confirmation.js > confirmation-generator.js 
       accounts-dialog.js           > dialog.js       > dialog-generator.js 



////////////////////////////PAGE////////////////////////////////////////////////
accounts-page.js
       import accountsPage //page contain dt
       body.insertAdjacentHTML("beforeend", accountsPage)
       accountsDt.start()

////////////////////////////DT////////////////////////////////////////////////////
accounts-dt.js
       function loadBasic(detail)
       async function downloadMultiple(detail)

////////////////////////////FULLCONT//////////////////////////////////////////////
accounts-fullcont.js
        import accounts-fullcont.html
        function prepareAdd(detail)
        function load(detail)
        function hide(detail )
        function saveFromDialog(detail)
        function wasEdited(detail)
        function getOne(detail)
        function update(detail)

accounts-fullcont-form.js
        const form
        const formCopy

////////////////////////////FULLCONT STEPPER//////////////////////////////////////////
accounts-fullcont-stepper.js
        import accounts-fullcont-stepper.html
        function move(detail)
        function submit(detail)
        function show(detail)
        function init(detail)
        function hide(detail)
        function discard(detail)

accounts-fullcont-stepperform.js
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