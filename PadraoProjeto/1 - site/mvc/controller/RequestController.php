<?php   

    
    class RequestController{

        public function actionGetAllRequests(){

            $check = ValidateRequest::checkPermission($_POST);

            if($check){
                $requestDao = new RequestDao();
                $result = $requestDao->getAllRequestByStatus($status);

                echo $result;
                return $result;
            }

            echo ValidateRequest::AccessDenied();

        }

        public function actionFinishRequest(){

            $id         = $_POST['idClient'];
            $products   = implode("," , $_POST['requestProducts']);
            $valueTotal = $_POST['valueTotal'];
            $dataNow    = date('d-m-y-H-i-s');
            $dataReal   = date('Y-m-d');
            $status     = self::AGUARDANDO;

            $requestDao = new RequestDao();
            $insertRequest = $requestDao->initRequest($id , $products , $valueTotal , $dataNow , $dataReal , $status);

            echo $insertRequest;
            return $insertRequest;
        }

        public function actionGetLastRequestByClient(){
            $id     = $_POST['idClient'];
            $status = $_POST['status'];

            $requestDao = new RequestDao();
            $getRequest = $requestDao->getRequestByClient($id , $status);

            echo $getRequest;
            return $getRequest;
        }

        public function actiongetAllById(){
            $id = $_POST['idClient'];

            $requestDao = new RequestDao();
            $return = $requestDao->gettAllById($id);

            echo $return;
            return $return;
        }

        public function actionChangeStatusRequest(){
            $status = $_POST['status'];
            $id     = $_POST['id'];

            $requestDao = new RequestDao();
            $return = $requestDao->changeStatusRequest($status , $id);

            echo $return;
            return $return;
        }

        public function actionGetRequestByDay(){

            $today = date('Y-m-d');

            $requestDao = new RequestDao();
            $return = $requestDao->getRequestByDay($today);

            echo $return;
            return $return;
        }

        public function actionGetValueWeek(){
            $today = date('Y-m-d');
            $requestDao = new RequestDao();
            $return = $requestDao->getValueWeek($today);

            echo $return;
            return $return;

        }

        public function actiongetValueMonth(){
            $today = date('Y-m-d');
            $requestDao = new RequestDao();
            $return = $requestDao->getValueMonth($today);

            echo $return;
            return $return;
        }

        public function actiongetValueDay(){
            $today = date('Y-m-d');
            $requestDao = new RequestDao();
            $return = $requestDao->getValueDay($today);

            echo $return;
            return $return;
        }

    }