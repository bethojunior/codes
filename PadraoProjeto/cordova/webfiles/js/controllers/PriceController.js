class PriceController {
    getPrice(origin,destiny) {
        return new Promise((resolve,reject) =>
            ConnectionServer.
                sendRequest('Price/Calculate', 'POST', { origin, destiny }, resolve,reject,false))
    }
    calculateAll(origin,destiny) {
        return new Promise((resolve,reject) =>
            ConnectionServer.
                sendRequest('Price/CalculateAll', 'POST', { origin, destiny }, resolve,reject,false))
    }
}