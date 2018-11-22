
class ConnectionServer {
    static Host() {
        return getEnvironment().hosts.hostRequest;
    }

    /**
     *
     * @param url
     * @param method
     * @param params
     * @param callback
     * @param failCallback
     * @param isStdObject
     */
    static sendRequest(url, method = "GET", params = {}, callback, failCallback, isStdObject = true) {

        const data = ConnectionServer.prepareData(method,params,isStdObject);

        fetch(ConnectionServer.Host() + url, data)
            .then(result =>{
                if(result.status === 401){
                    SwalCustom.messageDialog("Sessão expirada","Ops",()=>{
                        Session.deleteCookie("user");
                        location.reload();
                    },"info");
                    return;
                }

                return result.json()
            })
            .then(data => {
                if (callback)
                    callback(data)
            })
            .catch(error => {
                if (failCallback)
                    failCallback(error);
            })
    }

    static prepareData(method,params,isStdObject){
        const headers = method !== "GET" ? {
            'Content-Type': 'application/json',
            'token': Session.getValueInSession('user','api_token'),
            'userid': Session.getValueInSession('user','idUser'),

        } : {
            'Content-type': 'application/x-www-form-urlencoded',
            'token': Session.getValueInSession('user','api_token'),
            'userid': Session.getValueInSession('user','idUser'),
        };

        const data = {
            method: method,
            headers:  new Headers(headers),

        };

        if(method === "POST")
            data.body = ConnectionServer.prepareRequest(params, isStdObject);

        return data;
    }

    static sendSimpleRequest(url, method = 'GET', params = {}, callback = function (response) {
    }) {
        if (!Array.isArray(params)) {
            params = [params];
        }

        const data = ConnectionServer.prepareData(method,params,false);


        fetch(ConnectionServer.Host() + url, data)
            .then(result =>{
                if(result.status === 401){
                    SwalCustom.messageDialog("Sessão expirada","Ops",()=>{
                        Session.deleteCookie("user");
                        location.reload();
                    },"info");
                    return;
                }

                return result.json()
            })
            .then(data => {
                callback(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    static sendFile(url, method = "GET", formData) {

        return new Promise(resolve => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(this.responseText));
                }
            };
            request.open(method, ConnectionServer.Host() + url, true);
            request.send(formData);
        });
    }



    static prepareRequest(params, isStdObject) {
        if (!isStdObject)
            return JSON.stringify(params);

        if (!Array.isArray(params)) {
            params = [params];
        }
        return JSON.stringify({stdObject: params});
    }

}