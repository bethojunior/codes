class Session {
    static get(name) {
        if (localStorage.getItem(name) === null) {
            return [];
        }

        return JSON.parse(localStorage.getItem(name));
    }


    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }

    static delete(name) {
        localStorage.removeItem(name);
    }

    static setAttribute(nameStorage, property, newValue) {

        const data = Session.get(nameStorage);

        if (Array.isArray(data)) {
            Session.set(nameStorage, data.map(object => {
                object[property] = newValue;
                return object;
            }));
            return;
        }

        data[property] = newValue;

        Session.set(nameStorage, data);
    }
}
