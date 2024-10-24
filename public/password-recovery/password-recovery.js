

let token = '';

function process_email() {
    const email = document.getElementById("email").value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
        alert("The email provided is invalid");
        return;
    }

    const infNewData = getFormData({ email: email }) //object > FormData()

    //Timeout Controller
    const controller = new AbortController()
    const timeout = setTimeout(() => { controller.abort() }, 30000)

    let options = { method: 'POST', body: infNewData, signal: controller.signal, credentials: 'same-origin' }


    fetch(`./verifyemail.php`, options)
        .then(result => {
            return result.json()
        })
        .then((result) => {

            switch (result.code) {
                case 300:
                    alert("The email provided does not exist")
                    break;
                case 400:
                    alert("An error occurred while sending the email. Recharge")
                    break;

                default:
                    sendmail({ email: email, name: result.name, last_name: result.last_name, type: "password_recovery" });
                    break;
            }


        })
        .catch((error) => { // 

            console.log('result 3', 'ERRORRRRRRRR');

        })

};


function getFormData(object) {
    const formData = new FormData()
    Object.keys(object).forEach(key => formData.append(key, object[key]))
    return formData
}


function sendmail(data) {
    const infNewData = getFormData(data) //object > FormData()

    const title = document.getElementById("title_send");
    let formemail = document.getElementById("password_recovery");
    let title_send = document.getElementById("title_send");

    formemail.classList.add("dn");
    title_send.classList.remove("dn");

    title.textContent = "Mail is being sent";

    //Timeout Controller
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort() }, 30000);

    let options = { method: 'POST', body: infNewData, signal: controller.signal, credentials: 'same-origin' };

    fetch(`../server/php/send-emails/sendEmail.php`, options)
        .then(result => {
            return result.json()
        })
        .then((result) => {

            if (result.code == 400) {
                alert("An error occurred while sending the email. Recharge")
            } else {
                title.textContent = "An email has been sent to reset the password";
            }
        })
        .catch((error) => { // 
            console.log('result 3', 'ERRORRRRRRRR');
        })

}


document.addEventListener("DOMContentLoaded", function () {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    var parameter = urlParams.get('token');

    if (parameter != null) {
        let formemail = document.getElementById("password_recovery");
        let formpassword = document.getElementById("reset_password");
        formemail.classList.add("dn");
        formpassword.classList.remove("dn");

        token = parameter;
    }

});

function process_password() {


    const password = document.getElementById("password");
    const password_copy = document.getElementById("password_copy");


    //const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;



    let validate_result_password = passIsStrong_ismatch(password, password.value);
    let validate_result_password_copy = passIsStrong_ismatch(password_copy, password_copy.value);


    if (validate_result_password == false || validate_result_password_copy == false) {
        let parent = validate_result_password != true ? password.parentElement : password_copy.parentElement;
        parent.classList.add("a-shake");
        setTimeout(function () {
            parent.classList.remove("a-shake");
        }, 1000);
        return;
    }

    // if (!regex.test(password)) {
    //     alert("The password provided must have a minimum of 5 characters, at least 1 uppercase letter and 1 number");
    //     return;
    // }

    // if (password != password_copy) {
    //     alert("Passwords do not match");
    //     return;
    // }

    const infNewData = getFormData({ token: token, password: password.value, password_copy: password_copy.value });

    const controller = new AbortController()
    const timeout = setTimeout(() => { controller.abort() }, 30000);

    let options = { method: 'POST', body: infNewData, signal: controller.signal, credentials: 'same-origin' };


    fetch(`./setpassword.php`, options)
        .then(result => {
            return result.json()
        })
        .then((result) => {

            switch (result.code) {
                case 300:
                    alert("The password reset process expired.")
                    break;
                case 400:
                    alert("An error occurred with password validation. Recharge")
                    break;

                default:
                    let formpassword = document.getElementById("reset_password");
                    let password_update = document.getElementById("password_update");
                    formpassword.classList.add("dn");
                    password_update.classList.remove("dn");
                    break;
            }


        })
        .catch((error) => { // 

            console.log('result 3', 'ERRORRRRRRRR');

        })

};


function start_page () {
    window.location.href = "http://demo.gosive.com/gosivefw/public/#";
};

document.addEventListener("keyup", function (ev) {

    if (ev.target.tagName === "INPUT"  && ev.target.type !== "email") {

        passIsStrong_ismatch(ev.target, ev.target.value)


    }

});

function getDetail(ev) {
    return JSON.parse(ev.target.getAttribute('data-detail'))
}

function passIsStrong_ismatch(ev, value) { console.log('passIsStrong>>>>')

    //const parent = ev.target.parentElement

    let mess = "";
    if (ev.id == "password") {
        mess = isStrong_isMatch(value, false);
    } else {
        let password
        mess = isStrong_isMatch(value, true, document.getElementById("password").value,
            document.getElementById("password_copy").value);
    }

    // if (mess === 'empty') {
    //     parent.classList.remove('textfield-error')
    //     parent.classList.remove('textfield-completed')
    //     return false;
    // }
    if (mess != true) {
        incomplete(ev, mess);
        return false
    }
    else {
        completed(ev);
        return true
    }

}/**/

function incomplete(ev, mess) { // console.log('Incomplete')

    const parent = ev.parentElement
    const helper = parent.querySelector('.helper')
    const trailing = parent.querySelector('.trailing')
    const isPassword = parent.classList.contains('textfield-password')

    parent.classList.add('textfield-error')
    parent.classList.remove('textfield-completed')



    //date input don't have trailing/password don't change it
    if (trailing != undefined && isPassword === false) {
        changeSVG(trailing, 'error')
    }

    //date input don't have trailing/password don't change it
    if (helper != undefined) {
        if (mess === undefined) { helper.innerHTML = 'Incomplete' }
        else { helper.innerHTML = mess }
    }

}/**/

function completed(ev) {    //console.log('completed')

    const parent = ev.parentElement
    const helper = parent.querySelector('.helper')
    const trailing = parent.querySelector('.trailing')
    const isPassword = parent.classList.contains('textfield-password')

    parent.classList.add('textfield-completed')
    parent.classList.remove('textfield-error')
    if (helper != undefined) { helper.innerHTML = 'Completed' }

    //date input don't have trailing/password don't change it
    if (trailing != undefined && isPassword === false) {
        changeSVG(trailing, 'check-round')
    }


}/**/

function isStrong_isMatch(value, match, passowrd, password_copy) {


    if (!match) {

        if (value.length === 0) {
            return "To complete"
        }

        if (value.indexOf(' ') >= 0) {
            return "No spaces allowed"
        }

        if (!value.match(/[a-z]+/)) {
            return "At least one letter lowercase"
        }

        if (!value.match(/[A-Z]+/)) {
            return "At least one capital"
        }

        if (!value.match(/[0-9]+/)) {
            return "At least one number"
        }

        if (value.length < 7) {
            return "Minimum is 7"
        }

        if (value.length > 20) {
            return "Maximum is 20"
        }

        return true

    } else {

        if (password_copy == "") {
            return "To complete"
        }
        if (passowrd !== password_copy) {
            return "Passwords do not match";
        }

        return true;

    }


}

document.querySelectorAll(".trailing").forEach(function (svg) {
    svg.addEventListener("click", function (ev) {
        showHide(ev);

    });
});



function showHide(ev) {

    const elem = ev.target
    const parent = elem.parentElement //textfield div
    const input = parent.querySelector('input') //textfield div


    if (parent.classList.toggle("password-noview")) {

        changeSVG(parent.querySelector('.trailing'), 'eye')
        input.type = 'password'

    } else {

        changeSVG(parent.querySelector('.trailing'), 'eye-no')
        input.type = 'text'
    }


}/**/


function changeSVG(parent, icon) {
    //console.log('changeSVG parent', parent)
    parent.querySelector('svg use').setAttribute("xlink:href", `./css/svg.svg#${icon}`);

}


document.querySelectorAll(".button").forEach(function (button) {
    button.addEventListener("click", function (ev) {
        show(ev);
        switch (ev.target.id) {
            case "process_password":
                process_password();
                break;

            case "process_email":
                process_email();
                break;

            case "start_page":
                start_page();
                break;


            default:
                break;
        }

    });
});



function show(ev) { //console.log('on Lc_ripple')

    const circle = document.createElement('span');
    ev.target.appendChild(circle)
    circle.classList.add('ripple')

    //get the largest dimention of the element
    const dimentions = Math.max(ev.target.clientWidth, ev.target.clientHeight)

    circle.style.width = circle.style.height = dimentions + 'px';

    circle.style.top = ev.clientY - ev.target.getBoundingClientRect().top - dimentions / 2 + "px";
    circle.style.left = ev.pageX - ev.target.getBoundingClientRect().left - dimentions / 2 + "px";


    remove(circle, (circle) => {
        circle.remove();
    })

}

function remove(circle, callback) {
    setTimeout(() => {
        callback(circle)
    }, 700)
}
