function getValidationErrors() {

    let errors = 0;

    if (!document.getElementById('pop-url').value.match("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")) {
        document.getElementById('url-error').innerHTML = "provide a valid url"
        errors++;
    } else {
        document.getElementById('url-error').innerHTML = "";
    }

    if (document.getElementById('pop-name').value.length < 4) {
        document.getElementById('name-error').innerHTML = "atleast 5 characters"
        errors++;
    }
    else {
        document.getElementById('name-error').innerHTML = "";
    }

    if (document.getElementById('pop-information').value.length < 10) {
        document.getElementById('information-error').innerHTML = "atleast 10 characters"
        errors++;
    } else {
        document.getElementById('information-error').innerHTML = "";
    }

    if (!document.getElementById('pop-date').value) {
        document.getElementById('date-error').innerHTML = "cannot be empty"
        errors++;
    } else {
        document.getElementById('date-error').innerHTML = "";
    }

    return errors;
}

function setNoErrors() {
    document.getElementById('url-error').innerHTML = "";
    document.getElementById('name-error').innerHTML = "";
    document.getElementById('information-error').innerHTML = "";
    document.getElementById('date-error').innerHTML = "";
}

function getTodayDateForValidation() {
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    return year + '-' + month + '-' + day;
}