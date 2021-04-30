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
    if (!emailValueField.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        input.className = "contact-input inputError";
    } else {
        input.className = "contact-input inputNoError";
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
    if (messageValueField.length < 10) {
        input.className = "contact-input inputError";
    } else {
        input.className = "contact-input inputNoError";
    }
}