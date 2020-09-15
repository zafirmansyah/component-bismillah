<?php
   defined('BASEPATH') OR exit('No direct script access allowed') ;
   function date_2s($date, $ltime=false){
      $re     = $date ;
      $vdate  = explode(" ", $date) ;
      if($ltime){
           $vdate_d= explode("-", $vdate[0]) ;
           $re     = $vdate_d[2] . "-" . $vdate_d[1] . "-" . $vdate_d[0] . " " . $vdate[1] ;
      }else{
           $vdate_d= explode("-", $vdate[0]) ;
           $re     = $vdate_d[2] . "-" . $vdate_d[1] . "-" . $vdate_d[0] ;
      }
      return $re ;
   }

   function date_eom(){

   }

   function date_bom(){

   }

   function date_set($lt=false){
      $cf	= 'DD-MM-YYYY' ;
      if($lt)
         $cf .= ' HH:mm:ss' ;
      return 'data-date-format="'.$cf.'"' ;
   }

   function date_day($v){
      $va  = array("Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu") ;
      return strtoupper($va[$v]) ;
   }

   function date_month($v){
      $va  = array("Januari","Februari","Maret","April","Mei","Juni","Juli",
                  "Agustus","September","Oktober","November","Desember") ;
      return strtoupper($va[$v]) ;
   }

   function date_2b($date=''){
      //date 2 bahasa
      $vad = getdate(strtotime($date)) ;
      $va  = array("d"=>$vad['mday'],"day"=> date_day($vad['wday']),
                  "m"=> date_month($vad['mon']-1),"y"=>$vad['year']) ;
      return $va ;
   }
?>
