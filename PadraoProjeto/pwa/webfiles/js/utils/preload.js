
var optionPreload = {

    show : function(){
        document.getElementById("preloader").style.display = "block";
    },

    hidde : function(){
        document.getElementById("preloader").style.display = "none";
    },

    checkStatusPreload : function() {

        let that = document.getElementById("preloader").style.display;

        if(that === "block") {
            return false;
        }

        return true;

    },
};

