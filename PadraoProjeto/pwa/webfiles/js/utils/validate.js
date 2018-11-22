const lenghtResidencialNumber = 14
let statusValidate = false

function validatePhone(elementsPhone) {

    Object.keys(elementsPhone).map(index => {
        if(elementsPhone[index].value.length < lenghtResidencialNumber) {
            swal('Número de telefone inválido','','warning')
            elementsPhone[index].focus()
            statusValidate = false
            return statusValidate
        }

        statusValidate = true
    })

    return statusValidate
    
}

function validatePhoneValue(phone) {

    if(phone.length < lenghtResidencialNumber) {
        swal('Número de telefone inválido','','warning')
        statusValidate = false
        return false
    }

    return true

}

