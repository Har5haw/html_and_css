

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

function loadImages() {
    viewData = [[], [], [], []];
    sumHeight = [0, 0, 0, 0];
    imagesData.forEach((element, index) => {
        element.id = index;
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

    viewData.forEach((element, index) => {
        let col = document.getElementById("col-" + index);
        col.innerHTML = '';
        element.forEach((image) => {
            let contaner = document.createElement('div');
            contaner.className = "imgContainer";

            let img = image.imgComponent;
            img.id = image.id;

            if (document.title == "Gallery Admin") {
                let edit = document.createElement('div');
                edit.className = "edit";
                edit.innerHTML = "<code>Click to Edit</code>";
                img.setAttribute("onclick", "imageEditClick(event.target.id)");
                contaner.appendChild(edit);
            }
            contaner.appendChild(image.imgComponent);

            col.appendChild(contaner);

        });
    })
    console.log(viewData);
}

window.onload = () => {
    if (imagesData.length != 0) {
        loadImages();
        return;
    }
    let countLoaded = 0;
    fetch("/jsonFiles/images.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            return new Promise((resolve) => {
                data.forEach(async (element) => {
                    getImgPromise(element.image).then((meta) => {
                        countLoaded++;
                        imagesData.push({ ...element, ...meta });
                        if (countLoaded === data.length) {
                            resolve(imagesData);
                        }
                    });
                });
            })
        }).then(imagesData => {
            console.log(imagesData.length);
            loadImages();
        });
}

function imageEditClick(id) {
    let img = document.getElementById('pop-img');
    img.src = imagesData[id].image;

    let url = document.getElementById('pop-url');
    url.setAttribute("onkeyup", "changeImagePopup(event.target.value)")
    url.value = imagesData[id].image;

    let name = document.getElementById('pop-name');
    name.value = imagesData[id].name;

    let information = document.getElementById('pop-information');
    information.value = imagesData[id].information;

    let date = document.getElementById('pop-date');
    date.value = imagesData[id].date;

    let popup = document.getElementById("popup-gallery");
    popup.className = "popup-gallery";

    let button = document.getElementById("pop-button");
    button.id = id + "-button";
    button.setAttribute("onclick", "submitEdit(event.target.id)")

    let close = document.getElementById("pop-close");
    close.id = id + "-close";
}

function clickAdd() {
    let img = document.getElementById('pop-img');
    img.src = "";

    let url = document.getElementById('pop-url');
    url.setAttribute("onkeyup", "changeImagePopup(event.target.value)")
    url.value = "";

    let name = document.getElementById('pop-name');
    name.value = "";

    let information = document.getElementById('pop-information');
    information.value = "";

    let date = document.getElementById('pop-date');
    date.value = "";

    let popup = document.getElementById("popup-gallery");
    popup.className = "popup-gallery";

    let button = document.getElementById("pop-button");
    button.setAttribute("onclick", "submitAdd()")
}

function changeImagePopup(url) {
    let img = document.getElementById('pop-img');
    img.src = url;
}

async function submitEdit(id) {

    let imageId = id.split("-")[0];
    console.log(imageId);

    let url = document.getElementById('pop-url');
    imagesData[imageId].image = url.value;
    let { aspectRatio, imgComponent } = await getImgPromise(url.value);
    imagesData[imageId].aspectRatio = aspectRatio;
    imagesData[imageId].imgComponent = imgComponent;

    let name = document.getElementById('pop-name');
    imagesData[imageId].name = name.value;

    let information = document.getElementById('pop-information');
    imagesData[imageId].information = information.value;

    let date = document.getElementById('pop-date');
    imagesData[imageId].date = date.value;

    let popup = document.getElementById("popup-gallery");
    popup.className = "popup-off";

    let button = document.getElementById(id);
    button.setAttribute("id", "pop-button");

    let close = document.getElementById(imageId + "-close");
    close.setAttribute("id", "pop-close");

    loadImages();

    console.log(imagesData);
}

function submitAdd() {

    var newImage = {

    }

    let img = document.getElementById('pop-img');

    let url = document.getElementById('pop-url');
    newImage.image = url.value;

    let name = document.getElementById('pop-name');
    newImage.name = name.value;

    let information = document.getElementById('pop-information');
    newImage.information = information.value;

    let date = document.getElementById('pop-date');
    newImage.date = date.value;

    let imageComponent = new Image();
    imageComponent.src = url.value;

    imagesData.push({ ...newImage, aspectRatio: Math.round((img.naturalHeight / img.naturalWidth) * 100) / 100, imgComponent: imageComponent });

    let popup = document.getElementById("popup-gallery");
    popup.className = "popup-off";

    loadImages();
}

function closePop(id) {

    let imageId = id.split("-")[0];

    let button = document.getElementById(imageId + "-button");
    button.id = "pop-button";

    let close = document.getElementById(imageId + "-close");
    close.id = "pop-close";

    let popup = document.getElementById("popup-gallery");
    popup.className = "popup-off";

}