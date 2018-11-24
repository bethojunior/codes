$(document).ready(function () {
    const elementProperty = new ElementProperty();

    const userLogged     = Session.get('user');

    elementProperty.addEventInElement(".menu-close", 'onclick', optionOpenMenu);

    if(userLogged.profileImage !== null){
        elementProperty.getElement("#imageUserMenu" , data => {
            data.src = PATH_IMAGE_PROFILE + userLogged.profileImage
        });
    }

    function optionOpenMenu() {
        if (this.classList.contains("open")) {
            this.classList.remove("open");
            showMenu(false);
            return;
        }
        showMenu();
        this.classList.add("open");
        
    }

    function showMenu(result = true) {
        elementProperty.getElement(".container-menu-options", element => {
            if (result) {
                element.classList.add("active");
                return;
            }
            element.classList.remove("active");
        });
    }

    elementProperty.getElement("#menuOptionUser", element => {
        const list = element.getElementsByTagName("li");

        for (let i = 0; i < list.length; i++) {
            list[i].onclick = function () {
                if (this.classList.contains("active")) {
                    removeActiveList(element);
                    return;
                }
                removeActiveList(element);
                this.classList.add("active");
            };
        }


        function removeActiveList(element) {
            const list = element.getElementsByTagName("li");

            for (let i = 0; i < list.length; i++) {
                list[i].classList.remove("active");
            }
        }
    });

    elementProperty.addEventInElement("#logout", 'onclick', function () {
        Session.delete("user");
        location.href = HOST;
    });

    elementProperty.getElement("#nameUser", element => {
        element.innerHTML = userLogged.nickname;
    });

    elementProperty.getElement("#version",element=>{
        cordova.getAppVersion.getVersionNumber().then(function (version) {
            element.innerHTML = `VERSÃO: ${version}`;
            if(environment.name === "test"){
                element.innerHTML += " teste"
            }
        });
    });

    elementProperty.addEventInElement("#shareApp","onclick",function(){
        window.plugins.socialsharing.shareWithOptions({
            message: "Estou usando o TaxiReturn e tô te indicando o aplicativo pra você começar a receber novas corridas.\n",
            subject: 'TaxiReturn',
            url: `https://play.google.com/store/apps/details?id=br.com.taxireturn.driver`,
        }, (result)=>{}, (error)=>{});
    })

});