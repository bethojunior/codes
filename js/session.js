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


class SessionCookie{
    static getCookie(name) {
        $.cookie.json = true;
        return $.cookie(name);
    }


    static setCookie(name, value) {
        $.cookie.json = true;
        $.cookie(name,value, { path: '/' });
    }

    static deleteCookie(name) {
        $.removeCookie('user', { path: '/' });
    }


    static getValueInSession(id,attribute){
        const session = Session.getCookie(id);

        if(!session)
            return false;

        if(Array.isArray(session))
            return session.map(item => {
                return item[attribute];
            });

        return session[attribute];

    }

    static setAttribute(nameCookie, property, newValue) {
        let data = Session.getCookie(nameCookie);

        if (Array.isArray(data)) {
            Session.setCookie(nameCookie, data.map(object => {
                object[property] = newValue;
                return object;
            }));
            return;
        }

        data[property] = newValue;

        Session.setCookie(nameCookie, data);
    }

}
