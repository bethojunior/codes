function clickInputImage() {
    elementProperty
        .addEventInElement('.get-image', 'onchange', element => {

            const imageLabel = element.srcElement.previousElementSibling.firstChild
            const inputElement = element.srcElement

            getImages(inputElement, imageLabel)
        })
}

function getImages(input,imageElement) {

    if (input.files && input.files[0]) {

        const reader = new FileReader()

        reader.onload = function(e) {
            imageElement.setAttribute('src', e.target.result)
        }

        images.push(input.files[0])
        reader.readAsDataURL(input.files[0])
    }
}

function addImages() {
    elementProperty
        .addEventInElement('#btn-images-info', 'onclick', () => {
            if(images.length === 0) {
                swal('Adicione pelo menos uma imagem')
                return
            }

            renderAddEmployee()
        })
}