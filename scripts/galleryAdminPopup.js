function getFormData() {

    if (getValidationErrors() == 0) {
        return {
            imgComponent: document.getElementById('pop-img'),
            image: document.getElementById('pop-url').value,
            name: document.getElementById('pop-name').value,
            information: document.getElementById('pop-information').value,
            date: document.getElementById('pop-date').value
        }
    }
}

function imageEditClick(id) {

    setNoErrors();
    document.getElementById('pop-img').src = imagesData[id].image;

    let url = document.getElementById('pop-url');
    url.setAttribute("onkeyup", "changeImagePopup(event.target.value)")
    url.value = imagesData[id].image;

    document.getElementById('pop-name').value = imagesData[id].name;

    document.getElementById('pop-information').value = imagesData[id].information;

    let date = document.getElementById('pop-date');
    date.value = imagesData[id].date;
    date.max = getTodayDateForValidation();

    document.getElementById("popup-gallery").className = "popup-gallery";

    let button = document.getElementById("pop-button");
    button.id = id + "-button";
    button.setAttribute("onclick", "submitEdit(event.target.id)")

    document.getElementById("pop-delete").id = id + "-delete"

    document.getElementById("pop-close").id = id + "-close";
}

function clickAdd() {

    setNoErrors();
    document.getElementById('pop-img').src = "";

    let url = document.getElementById('pop-url');
    url.setAttribute("onkeyup", "changeImagePopup(event.target.value)")
    url.value = "";

    document.getElementById('pop-name').value = "";

    document.getElementById('pop-information').value = "";

    document.getElementById('pop-date').value = "";

    document.getElementById("popup-gallery").className = "popup-gallery";

    document.getElementById("pop-button").setAttribute("onclick", "submitAdd()")
}

function changeImagePopup(url) {

    let img = document.getElementById('pop-img');
    img.src = url;
    img.setAttribute("alt", "no Image in this url");

}

function deleteImage(id) {
    let imageId = id.split("-")[0];
    imagesData.splice(imageId, 1);
    console.log(id);

    document.getElementById("popup-gallery").className = "popup-off";

    loadImages();
}

async function submitEdit(id) {

    let formData = getFormData();
    if (formData == null) {
        return;
    }

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

    document.getElementById(imageId + "-delete").id = "pop-delete";

    loadImages();
}

function submitAdd() {

    var newImage = getFormData();
    if (newImage == null) {
        return;
    }

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

    document.getElementById(imageId + "-delete").id = "pop-delete";

    document.getElementById("popup-gallery").className = "popup-off";
}