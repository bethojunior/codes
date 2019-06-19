class DriverController {

    authenticate(user) {
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Driver/Authenticate', 'POST', user, resolve,reject);
        })
    }

    searchTrip(driverId, listTripsDenied,location) {
        return new Promise((resolve,reject ) =>{
            ConnectionServer.sendRequest('Driver/searchTrip', 'POST', {driverId, listTripsDenied,location}, resolve,reject);
        });
    }

    findWithAccountInfo(driverId) {
        return new Promise((resolve,reject ) =>{
            ConnectionServer.sendRequest('Driver/FindWithAccountInfo', 'POST', {driverId}, resolve,reject);
        });
    }
    defaultStation(driverId,stationId) {
        return new Promise((resolve,reject ) =>{
            ConnectionServer.sendRequest('Driver/DefaultStation', 'POST', {driverId,stationId}, resolve,reject);
        });
    }

    acceptTrip(tripReference, driverId) {
        return new Promise((resolve,reject) => {
            ConnectionServer.sendRequest('Driver/AcceptTrip', 'POST', {
                driverId: parseInt(driverId),
                tripReference
            }, resolve,reject);
        });
    }

    toggleStatus(driverId) {
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Driver/ToggleStatus', 'POST', {driverId}, resolve,reject);
        })
    }

    cancelTrip(cancelTrip) {
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Driver/CancelTrip', 'POST', cancelTrip,  resolve,reject);
        });
    }

    informArrival(tripReference) {
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Driver/InformArrival', 'POST', {tripReference}, resolve,reject);
        });
    }

    initTrip(tripReference) {
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Driver/InitTrip', 'POST', {tripReference}, resolve,reject);
        });
    }

    finishTrip(tripReference) {
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Driver/FinishTrip', 'POST', {tripReference}, resolve,reject,5000);
        });
    }

    finishTripOffline(tripReference,data) {
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Driver/FinishTrip', 'POST', {tripReference,data}, resolve,reject);
        });
    }

    find(driverId) {
        return new Promise((resolve,reject) => {
            ConnectionServer.sendRequest('Driver/Find', 'POST', {driverId}, resolve,reject);
        });
    }

    sendConfirmationCode(number) {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Driver/SendConfirmationCode', 'POST', {number}, resolve);
        })
    }

    refuseTrip(driverId, tripReference) {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Driver/RefuseTrip', 'POST', {driverId, tripReference},resolve);
        })
    }

    register(driver) {
        return new Promise(resolve => {
            const formData = new FormData();

            FileUpload.prepare(driver.image.CNH).then(file => {
                formData.append("CNH", file.data, file.name);
            });

            FileUpload.prepare(driver.image.CRLV).then(file => {
                formData.append("CRLV", file.data, file.name);
            });

            FileUpload.prepare(driver.image.ALVARA).then(file => {
                formData.append("ALVARA", file.data, file.name)
            });

            FileUpload.prepare(driver.image.PROFILE).then(file => {
                formData.append("PROFILE", file.data, file.name)
            });

            formData.append("stdObject",JSON.stringify(driver));

            setTimeout(function () {
                ConnectionServer.sendRequestWithFiles("Driver/Register", "POST", formData).then(resolve);
            }, 500);

        });
    }

    getTripsById(driverId , page , date = null , status = null){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Driver/GetTrips' , 'POST' , {driverId , page , date , status} , resolve)
        })
    }

    static getCodeVerify(email){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Driver/ForgotPassword' , 'POST' , {email} , resolve);
        });
    }

    static updatePasswordById(email , password){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Driver/ChangePassword' , 'POST' , {email , password} , resolve);
        });
    }

    static updateDataDriver(driverId , idUser , email , name , phone , password){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Driver/Edit' , 'POST' , {driverId , idUser , email , name , phone , password} , resolve);
        });
    }

    static updatePhoto(driverId , photo){

        return new Promise(resolve => {

            const formData = new FormData();

            FileUpload.prepare(photo).then(file => {

                formData.append("photo", file.data, file.name);
                formData.append("driverId",driverId);

                ConnectionServer.sendRequestWithFiles("Driver/EditProfileImage", "POST", formData).then(resolve);

            });

        });
    }

    /**
     *
     * @param email
     * @returns {Promise<any>}
     */
    checkEmail(email) {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Driver/CheckEmail', 'POST',{email},resolve);
        });
    }

    updateVersion(driverId,driverAppVersion){
        return new Promise((resolve,reject) => {
            ConnectionServer.sendRequest('Driver/UpdateVersion', 'POST', {driverId,driverAppVersion},resolve,reject,
                undefined,false);
        })
    }
}