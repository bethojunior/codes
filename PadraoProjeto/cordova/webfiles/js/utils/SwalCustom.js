class SwalCustom {
    static dialogConfirm(title, message,icon) {
        return new Promise((resolve, reject) => {
            swal({
                    title: title,
                    text: message,
                    icon: icon,
                    buttons: {
                        yes: {
                            text: "SIM!",
                            value: true,
                        },
                        no: {
                            text: "NÃO!",
                            value: false,
                        },
                    },
                }
            ).then(value=>{
                if(value){
                    resolve();
                    return;
                }
                reject();
            })
        });
    }

    static messageDialog(message, title, callback = function () {
    }, icon = "info") {
        swal({
            title: title,
            text: message,
            icon: icon
        }).then(value => {
            if (callback)
                callback();
        });
    }
}