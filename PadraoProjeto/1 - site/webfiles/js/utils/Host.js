const IS_HOST_ENVIRONMENT_TEST = true;
var typeVersion;

if(IS_HOST_ENVIRONMENT_TEST){
    typeVersion = "Teste";
}

const HOST = '/driver/';

//----------------------------------------------------

const API_HOST_PRODUCTION = 'https://api.taxireturn.com.br/';
const API_HOST_TESTE = 'https://apiteste.taxireturn.com.br/';

const API_HOST = (IS_HOST_ENVIRONMENT_TEST) ? API_HOST_TESTE : API_HOST_PRODUCTION;

//---------------------------------------------------

const PWA_HOST_TEST = 'https://pwatest.taxireturn.com.br/';
const PWA_HOST_PRODUCTION = 'https://pwa.taxireturn.com.br/';

const CURRRENT_HOST_PWA = (IS_HOST_ENVIRONMENT_TEST) ? PWA_HOST_TEST : PWA_HOST_PRODUCTION;

//---------------------------------------------------

const SOCKET_HOST = 'ws://taxireturn.com.br:4444';

//----------------------------------------------------
const PATH_IMAGE_PRODUCTION = 'https://s3-sa-east-1.amazonaws.com/taxireturn/driver/profile/compressed/';
const PATH_IMAGE_TESTE = 'https://s3-sa-east-1.amazonaws.com/taxireturnteste/driver/profile/compressed/';

const PATH_IMAGE = (IS_HOST_ENVIRONMENT_TEST) ? PATH_IMAGE_TESTE : PATH_IMAGE_PRODUCTION;

// ---------------------------------------------------
const PATH_IMAGE_CLIENT_TEST  = "https://s3-sa-east-1.amazonaws.com/taxireturnteste/customer/profile/";

const PATH_IMAGE_CLIENT_PRODUCTION  = "https://s3-sa-east-1.amazonaws.com/taxireturn/customer/profile/";

const CLIENT_PROFILE = (IS_HOST_ENVIRONMENT_TEST) ? PATH_IMAGE_CLIENT_TEST : PATH_IMAGE_CLIENT_PRODUCTION;

//----------------------------------------------------
const HOST_HOSTEL = 'https://pwa.taxireturn.com.br/cliente/OpenHostel?hostel=';

const API_HOST_WHAT = 'https://api.whatsapp.com/';

//--------------------------------------------------

const HOST_SITE_TEST = "http://localhost/taxireturn/";

const HOST_SITE_PRODUCTION = "https://taxireturn.com.br/";

const HOST_SITE = (IS_HOST_ENVIRONMENT_TEST) ? HOST_SITE_TEST : HOST_SITE_PRODUCTION;
