function getImgPromise(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onload = function () {
            resolve({ aspectRatio: Math.round((img.naturalHeight / img.naturalWidth) * 100) / 100, imgComponent: img });
        }
    });
}

let viewDataGrid = [[], [], [], []];
let sumHeightColumn = [0, 0, 0, 0];
let imagesData = [];

function loadImages(imagesData) {
    viewDataGrid = [[], [], [], []];
    sumHeightColumn = [0, 0, 0, 0];
    imagesData.forEach((element, index) => {
        element.id = index;
        let minHeight = sumHeightColumn[0];
        let indexOfMinHeight = 0;
        for (let i = 1; i < 4; i++) {
            if (minHeight > sumHeightColumn[i]) {
                minHeight = sumHeightColumn[i];
                indexOfMinHeight = i;
            }
        }

        viewDataGrid[indexOfMinHeight].push(element);
        sumHeightColumn[indexOfMinHeight] += element.aspectRatio;
    });

    viewDataGrid.forEach((element, index) => {
        let column = document.getElementById("col-" + index);
        column.innerHTML = '';
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

            column.appendChild(contaner);

        });
    })
    console.log(viewDataGrid);
}

window.onload = () => {
    fetch("/jsonFiles/images.json")
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            return new Promise((resolve) => {
                responseData.forEach(async (element, index) => {
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