var timer;

let email_value = "";
let message_value = "";

function validateEmail(email) {
    if (email || email_value) {
        email_value = email;
        clearTimeout(timer);
        timer = setTimeout(emailTypingDone, 300);
    }
}

function emailTypingDone() {
    let input = document.getElementById("email-input");
    if (!email_value.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        input.className = "contact-input inputError";
    } else {
        input.className = "contact-input inputNoError";
    }
}

function validateMessage(message) {
    if (message || message_value) {
        message_value = message;
        clearTimeout(timer);
        timer = setTimeout(messageTypingDone, 300);
    }
}

function messageTypingDone() {
    let input = document.getElementById("message-input");
    if (message_value.length < 10) {
        input.className = "contact-input inputError";
    } else {
        input.className = "contact-input inputNoError";
    }
}