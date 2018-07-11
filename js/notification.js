document.addEventListener('DOMContentLoaded', function () {
 
    //Se não tiver suporte a Notification manda um alert para o usuário
                                Notification.requestPermission();
                                new Notification('Chat Geocorr', {
                                    icon: 'http://geocorrambiental.com.br/webfiles/images/logo.png',
                                    body: "Novo cliente abriu o chat",
                                });
       });
   
   