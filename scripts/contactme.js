var timer;

let emailValueField = "";
let messageValueField = "";

function validateEmail(email) {
    if (email || emailValueField) {
        emailValueField = email;
        clearTimeout(timer);
        timer = setTimeout(emailTypingDone, 300);
    }
}

function emailTypingDone() {
    let input = document.getElementById("email-input");
    let error = document.getElementById("email-error");
    if (!emailValueField.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        input.className = "contact-input inputError";
        error.innerHTML = "Invalid Email";
    } else {
        input.className = "contact-input inputNoError";
        error.innerHTML = "";
    }
}

function validateMessage(message) {
    if (message || messageValueField) {
        messageValueField = message;
        clearTimeout(timer);
        timer = setTimeout(messageTypingDone, 300);
    }
}

function messageTypingDone() {
    let input = document.getElementById("message-input");
    let error = document.getElementById("message-error");
    if (messageValueField.length < 10) {
        input.className = "contact-input inputError";
        error.innerHTML = "Atleast 10 characters";
    } else {
        input.className = "contact-input inputNoError";
        error.innerHTML = "";
    }
}