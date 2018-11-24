class ConnectionServer {
    static Host() {
        return environment.hosts.hostRequest;
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

        //const data = ConnectionServer.prepareData(method, params, isStdObject);
        /*requestApi(ConnectionServer.Host() + url, data).then(response => {

            ConnectionServer.saveRequest(response);

            if (response.status === 401) {
                SwalCustom.messageDialog("Sessão expirada", "Ops", () => {
                    Session.delete("user");
                    location.reload();
                }, "info");
                return;
            }

            if (!response.ok)
                throw Error(JSON.stringify({request: true}));

            return response.json()
        })
            .then(data => {
            if (callback)
                callback(data)
        }).catch(error => {
            try {
                JSON.parse(error);
                if (failCallback)
                    failCallback(error);
            } catch (e) {
                if (failCallback)
                    failCallback("Sem conexão com internet",true);
            }
        })*/

        const request = new XMLHttpRequest();

        request.onreadystatechange = function () {//Call a function when the state changes.
            if (request.readyState === 4) {
                switch (request.status) {
                    case 401 : {
                        ConnectionServer.sessionExpired();
                        break;
                    }
                    case 200 : {
                        if (callback)
                            callback(JSON.parse(this.responseText));
                        break;
                    }
                    default : {
                        if (failCallback)
                            failCallback();
                    }
                }
            }
        };
        request.open(method, ConnectionServer.Host() + url);

        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        request.setRequestHeader('token', Session.getValueInSession('user', 'api_token'));
        request.setRequestHeader('userid', Session.getValueInSession('user', 'idUser'));
        request.send(ConnectionServer.prepareRequest(params, isStdObject));

    }

    static sessionExpired() {
        SwalCustom.messageDialog("Sessão expirada", "Ops", () => {
            Session.delete("user");
            location.reload();
        }, "info");
    }

    static prepareData(method, params, isStdObject) {
        const headers = method !== "GET" ? {
            'Content-type': 'application/json',
            'token': Session.getValueInSession('user', 'api_token'),
            'userid': Session.getValueInSession('user', 'idUser')
        } : {
            'Content-type': 'application/x-www-form-urlencoded',
            'token': Session.getValueInSession('user', 'api_token'),
            'userid': Session.getValueInSession('user', 'idUser')
        };

        const data = {
            method: method,
            headers: new Headers(headers)
        };

        if (method === "POST")
            data.body = ConnectionServer.prepareRequest(params, isStdObject);

        return data;
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
            request.setRequestHeader('token', Session.getValueInSession('user', 'api_token'));
            request.setRequestHeader('userid', Session.getValueInSession('user', 'idUser'));
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

    static saveRequest({url, ok, status, statusText}) {
        Session.addHistory({url, ok, status, statusText});
    }
}

async function requestApi(url, data) {
    return await fetch(url, data);
}