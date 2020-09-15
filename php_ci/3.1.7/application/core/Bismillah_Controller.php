<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Bismillah_Controller extends CI_Controller{
	public function __construct(){
		parent::__construct() ;
		$system_by 	= isset($this->input->request_headers()['sistem_by']) ? true : false;
		if(getsession($this,"username") == ""){
	        if($system_by){
	            echo('window.location.href = "'.base_url('toko/login').'" ;') ;
	        }else{
	            echo('<script>window.location.href = "'.base_url('toko/login').'" ;</script>') ;
	        }
	    }
		//jika direquest dari url masih bisa diakses
	}
}
 
