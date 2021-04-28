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
        input.className = "inputError";
    } else {
        input.className = "inputNoError";
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
        input.className = "inputError";
    } else {
        input.className = "inputNoError";
    }
}

function getImgPromise(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onload = function () {
            resolve({ aspectRatio: Math.round((img.naturalHeight / img.naturalWidth) * 100) / 100, imgComponent: img });
        }
    });
}


let viewData = [[], [], [], []];
let sumHeight = [0, 0, 0, 0];
let imagesData = [];

window.onload = () => {
    fetch("/jsonFiles/images.json")
        .then(response => {
            return response.json();
        })
        .then(data => {

            return new Promise((resolve) => {
                data.forEach(async (element, index) => {
                    imagesData.push({ ...element, ... await getImgPromise(element.image) });
                    if (index === data.length - 1) {
                        resolve(imagesData);
                    }
                });
            })
        }).then(imagesData => {
            //imagesData = imagesData.sort(() => Math.random() - 0.5);
            console.log(imagesData);

            imagesData.forEach((element) => {
                let min = sumHeight[0];
                let ind = 0;
                for (let i = 1; i < 4; i++) {
                    if (min > sumHeight[i]) {
                        min = sumHeight[i];
                        ind = i;
                    }
                }

                viewData[ind].push(element);
                sumHeight[ind] += element.aspectRatio;
            });

            return viewData;
        }).then(viewData => {
            viewData.forEach((element, index) => {
                let col = document.getElementById("col-" + index);
                col.innerHTML = '';
                element.forEach((image, index) => {
                    let contaner = document.createElement('div');
                    contaner.className = "imgContainer";

                    let img = image.imgComponent;
                    img.id = index;

                    if (document.title == "Gallery Admin") {
                        let edit = document.createElement('div');
                        edit.className = "edit";
                        edit.innerHTML = "EDIT";
                        img.setAttribute("onclick", "imageEditClick(event.target.id)");
                        contaner.appendChild(edit);
                    }
                    contaner.appendChild(image.imgComponent);

                    col.appendChild(contaner);

                });
            })
            console.log(viewData);
        });
}

function imageEditClick(id) {
    console.log(imagesData[id]);
}