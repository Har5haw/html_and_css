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

function loadImages(imagesData) {
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
    fetch("/jsonFiles/images.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            return new Promise((resolve) => {
                data.forEach(async (element, index) => {
                    let metaData = await getImgPromise(element.image);
                    imagesData.push({ ...element, ...metaData });
                    if (index == data.length - 1) {
                        resolve(imagesData);
                    }
                });
            })
        }).then(imagesData => {
            loadImages(imagesData);
        });
}

function getFormData() {
    return {
        imgComponent: document.getElementById('pop-img'),
        image: document.getElementById('pop-url').value,
        name: document.getElementById('pop-name').value,
        information: document.getElementById('pop-information').value,
        date: document.getElementById('pop-date').value
    }
}

function imageEditClick(id) {
    document.getElementById('pop-img').src = imagesData[id].image;

    let url = document.getElementById('pop-url');
    url.setAttribute("onkeyup", "changeImagePopup(event.target.value)")
    url.value = imagesData[id].image;

    document.getElementById('pop-name').value = imagesData[id].name;

    document.getElementById('pop-information').value = imagesData[id].information;

    document.getElementById('pop-date').value = imagesData[id].date;

    document.getElementById("popup-gallery").className = "popup-gallery";

    let button = document.getElementById("pop-button");
    button.id = id + "-button";
    button.setAttribute("onclick", "submitEdit(event.target.id)")

    document.getElementById("pop-close").id = id + "-close";
}

function clickAdd() {
    document.getElementById('pop-img').src = "";

    let url = document.getElementById('pop-url');
    url.setAttribute("onkeyup", "changeImagePopup(event.target.value)")
    url.value = "";

    document.getElementById('pop-name').value = "";

    document.getElementById('pop-information').value = "";

    document.getElementById('pop-date').value = "";

    getElementById("popup-gallery").className = "popup-gallery";

    document.getElementById("pop-button").setAttribute("onclick", "submitAdd()")
}

function changeImagePopup(url) {
    document.getElementById('pop-img').src = url;
}

async function submitEdit(id) {

    let formData = getFormData();

    let imageId = id.split("-")[0];
    console.log(imageId);

    let { aspectRatio, imgComponent } = await getImgPromise(formData.image);
    imagesData[imageId].image = formData.image;
    imagesData[imageId].aspectRatio = aspectRatio;
    imagesData[imageId].imgComponent = imgComponent;

    imagesData[imageId].name = formData.name;

    imagesData[imageId].information = formData.information;

    imagesData[imageId].date = formData.date;

    document.getElementById("popup-gallery").className = "popup-off";

    document.getElementById(id).id = "pop-button";

    document.getElementById(imageId + "-close").id = "pop-close";

    loadImages();
}

function submitAdd() {

    var newImage = getFormData();

    let img = document.getElementById('pop-img');

    let imageComponent = new Image();
    imageComponent.src = newImage.image;

    imagesData.push({ ...newImage, aspectRatio: Math.round((img.naturalHeight / img.naturalWidth) * 100) / 100, imgComponent: imageComponent });

    document.getElementById("popup-gallery").className = "popup-off";

    loadImages();
}

function closePop(id) {

    let imageId = id.split("-")[0];

    document.getElementById(imageId + "-button").id = "pop-button";

    document.getElementById(imageId + "-close").id = "pop-close";

    document.getElementById("popup-gallery").className = "popup-off";

}