const environment = getEnvironment();


const IMAGE_DEFAULT   = environment.hosts.hostImageDefault;
const PATH_IMAGE      = environment.hosts.hostImage;
const HOST            =  environment.hosts.local;
const ID_FACEBOOK     = environment.hosts.idFacebook;
const HOST_PWA        = environment.hosts.hostPwa;
const HOST_SITE       = environment.hosts.hostSite;

/**
 *
 * @returns {*}
 */
function getEnvironment(){
    const environments = [
        {
            name: "localhost",
            hosts : {
                local: "/taxireturn-pwa/",
                hostPwa : "https://localhost/taxireturn-pwa",
                hostRequest: "https://apiteste.taxireturn.com.br/",
                hostSite: "https://beta.taxireturn.com.br/",
                idFacebook : "707301642965848",
                hostImage : "https://s3-sa-east-1.amazonaws.com/taxireturnteste/establishment/compressed/",
                hostImageDefault: "https://s3-sa-east-1.amazonaws.com/taxireturn/default.jpg"
            },
            socket : {
                test: true,
                keyTrip: "55d92b9e36d1bd828212",
                keyChat: "d972017e7893eac71c31"
            }
        },
        {
            name: "pwatest.taxireturn.com.br",
            hosts : {
                local: "/",
                hostPwa : "https://pwatest.taxireturn.com.br/",
                hostRequest: "https://apiteste.taxireturn.com.br/",
                hostSite: "https://beta.taxireturn.com.br/",
                idFacebook : "559943727752617",
                hostImage : "https://s3-sa-east-1.amazonaws.com/taxireturnteste/establishment/compressed/",
                hostImageDefault: "https://s3-sa-east-1.amazonaws.com/taxireturn/default.jpg"
            },
            socket : {
                test: true,
                keyTrip: "55d92b9e36d1bd828212",
                keyChat: "d972017e7893eac71c31"
            }
        },
        {
            name: "pwa.taxireturn.com.br",
            hosts : {
                local: "/",
                hostPwa : "https://pwa.taxireturn.com.br/",
                hostRequest: "https://api.taxireturn.com.br/",
                hostSite: "https://pwa.taxireturn.com.br/",
                idFacebook : "559943727752617",
                hostImage : "https://s3-sa-east-1.amazonaws.com/taxireturn/establishment/compressed/",
                hostImageDefault: "https://s3-sa-east-1.amazonaws.com/taxireturn/default.jpg"
            },
            socket : {
                test: false,
                keyTrip: "d18413a6f1df893db951",
                keyChat: "dda2d265e1ce9b51048f"
            }
        }
    ];

    return environments.filter(environment=>{
        return document.URL.includes(environment.name)
    })[0];
}