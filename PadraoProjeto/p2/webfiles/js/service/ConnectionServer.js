class ConnectionServer {
    static Host() {
        return HOST_API;
    }

    /**
     * @param url
     * @param method
     * @param params
     * @param callback
     */
    static sendRequest(url, method = "GET", params = {}, callback = function (response) {
    }, reject, timeRequest) {

        const dataSent = params;

        if (!Array.isArray(params)) {
            params = [params];
        }

        const data = {
            method: method,
            body: JSON.stringify({stdObject: params}),
            headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'})
        };

        if (timeRequest !== undefined) {
            this.timeout(timeRequest, fetch(ConnectionServer.Host() + url, data))
                .then(result => result.json())
                .then(data => {
                    callback(data)
                })
                .catch((error) => {
                    Log.write(url + " " + error.message, level.SISTEMA, logType.PROCESS, dataSent);

                    if (reject !== undefined)
                        reject(error);
                });

            return;
        }

        fetch(ConnectionServer.Host() + url, data)
            .then(result => result.json())
            .then(data => {
                callback(data)
            })
            .catch(error => {

                Log.write(url + " " + error, level.SISTEMA, logType.PROCESS, dataSent);

                if (reject !== undefined)
                    reject();
            })
    }

    static timeout(ms, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("Problemas com conexão de internet"), true);
            }, ms);
            promise.then(resolve, reject)
        })
    }


    static sendRequestWithFiles(url, method = "GET", formData) {
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
}