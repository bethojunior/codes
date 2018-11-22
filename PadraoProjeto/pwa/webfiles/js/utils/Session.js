class Session{
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
}