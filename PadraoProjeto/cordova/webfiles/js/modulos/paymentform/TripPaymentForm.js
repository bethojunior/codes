function getPaymentFormSelect(element) {

    Session.set("paymentForm", JSON.parse(element.getAttribute("payment")));

    closePaymentForm();
    showPaymentForm();

    viewController.elementProperty.getElement(".payment-form-trip", element => {
        element.classList.remove("active");
    });

    element.classList.add("active");

    return parseInt(element.getAttribute("value"));
}



function openPaymentForm() {
    viewController.elementProperty.getElement(".footer-payment-form", element =>
        element.classList.add("active"));
}

function closePaymentForm() {
    viewController.elementProperty.getElement(".footer-payment-form", element =>
        element.classList.remove("active"));
}

function showPaymentForm() {
    const paymentForm = Session.get("paymentForm");
    if (paymentForm.length !== 0) {
        viewController.elementProperty.getElement("#namePaymentForm", element => {
            element.innerHTML = paymentForm.name;
        });

        return paymentForm.idTripPaymentForm;
    }

    return null;
}
