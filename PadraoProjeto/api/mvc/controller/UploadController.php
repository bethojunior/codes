<?php  


    class Upload {

        public function uploadFile($file , $titulo , $dir , $bool){
            $path = $dir;

            try {

                $ext = strtolower(substr($file,-4));
                $new_name = ($titulo);
                $up = move_uploaded_file($file, $dir.$new_name);
    
                if($bool != false){
                    //IMAGENS MEDIUM
                    $img = WideImage::load($dir.$new_name);
                    //REDIMENCIONAR IMAGEM
                    $red = $img->resize(300,300);
                    //SALVANDO EM QUALQUER FORMATO
                    $red->saveToFile($dir.'medium/'.$new_name);
                }
    
    
                if($up){
                    return true;
                }else {
                    return false;
                }
    
            }catch(Exception $e){
                return false;
            }
    
        }
    }


    