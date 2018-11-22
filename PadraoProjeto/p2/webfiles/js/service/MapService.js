class MapService{
    importScriptWithPlaces(executeResolve = false) {
        const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzYKn0wp3Gl8dcoW3xhLNI7xtufpGIYXk&libraries=places";
        const id = "scriptMapLibraries";

        return new Promise(resolve => {
            if (document.getElementById(id) !== null) {
                if(executeResolve){
                    resolve();
                }
                return;
            }


            const my_awesome_script = document.createElement('script');

            my_awesome_script.setAttribute('src', url);

            my_awesome_script.setAttribute('id', id);

            my_awesome_script.async = true;

            my_awesome_script.defer = true;

            document.body.appendChild(my_awesome_script);


            my_awesome_script.addEventListener('load', resolve);
        });

    }
}