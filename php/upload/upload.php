<html>
  <head>
    <title>Envio de arquivo</title>
  </head>
  <body>
<?php
  /* $dir � o caminho da pasta onde voc� deseja que os arquivos sejam salvos.
   * Neste exemplo, supondo que esta p�gina esteja em public_html/upload/
   * os arquivos ser�o salvos em public_html/upload/imagens/
   * Obs.: Esta pasta de destino dos arquivos deve estar com as permiss�es de escrita habilitadas.
   */
  $dir = "imagens/";

  // recebendo o arquivo multipart
  $file = $_FILES["arquivo"];

  // Move o arquivo da pasta temporaria de upload para a pasta de destino
  if (move_uploaded_file($file["tmp_name"], "$dir/".$file["name"]))
  {
    echo "Arquivo enviado com sucesso!";
  }
  else
  {
    echo "Erro, o arquivo n�o pode ser enviado.";
  }
?>
  </body>
</html>