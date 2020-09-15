<?php
   defined('BASEPATH') OR exit('No direct script access allowed') ;
   function dir_create($dir){
      @mkdir($dir,0777,true) ;
   }

   function dir_delete($dir){
      $files = array_diff(scandir($dir), array('.','..'));
       foreach ($files as $file) {
         (is_dir($dir . "/" . $file)) ? dir_delete($dir . "/" . $file) : unlink($dir . "/" . $file);
       }
       return rmdir($dir);
   }
?>
