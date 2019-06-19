class Position {
    static getPosition(callback){
            navigator.geolocation.watchPosition(callback,undefined,
                {
                    maximumAge:0,
                    enableHighAccuracy:false
                });

    }
}