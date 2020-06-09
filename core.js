/*
	l: location
	d: data
	o: Object
	m: Method
	v: value

	version: 1.0.0 - Beta
*/
if (typeof jQuery === "undefined") {
  throw new Error("We Are need jQuery");
}

$.fn.serializeobject = function(){
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

$.fn.sval	= function(val){
	if(val == undefined || val == '') val = {} ;
	var co 		= $(this);
	if(val !== {}){
		var cop = '', ci 	= [] ;
		$.each( val, function(i, o){
			cop += '<option value="' + o.id + '">' + o.text + '</option>' ;
			ci.push(o.id) ;
		}) ;
		co.empty().append(cop).val(ci).trigger('change') ;
	}else{
		co.empty() ;
	}
}

Number.prototype.numberformat 	= function(d, dc, uc){
	var nfn = this,
    nfc = isNaN(d = Math.abs(d)) ? 0 : d,
    nfd = dc == undefined ? "." : dc,
    nft = uc == undefined ? "," : uc,
    nfs = nfn < 0 ? "-" : "",
    nfi = String(parseInt(nfn = Math.abs(Number(nfn) || 0).toFixed(nfc))),
    nfj = (nfj = nfi.length) > 3 ? nfj % 3 : 0;
   return nfs + (nfj ? nfi.substr(0, nfj) + nft : "") +
   			nfi.substr(nfj).replace(/(\d{3})(?=\d)/g, "$1" + nft) +
   			(nfc ? nfd + Math.abs(nfn - nfi).toFixed(nfc).slice(2) : "") ;
}

var bos 		= {} ;
var bjs			= {
	loadpage	: function(id, p, d, isreport){
		if(d == undefined) d = "" ;
		if(d !== "") p += "&" + d ;
		$(id).load(p) ;
	},

	ajaxerr 	: function(r, s, e){
		console.log(r + " , " + s + " , " + e) ;
	},

	ajax 		: function(l, d, o){
		var l 	= base_url + l, co	= this ;

		$.ajax({
			type	    : "POST" ,
			headers		: { "sistem_by":"bismillahsuksesduniaakhirat"},
			url			: l,
	 		data	    : d,
			dataType 	: 'text' ,
			beforeSend	: function(){
				if(o !== undefined) $(o).button('loading') ;
			} ,
			error		: function(r, s, e){
				co.ajaxerr(r, s, e) ;
				if(o !== undefined) $(o).button('reset') ;
			} ,
			success		: function(r){
				eval(r) ;
				if(o !== undefined) $(o).button('reset') ;
			}
		}) ;
	},

	ajaxfile 	: function(l, d, o){
		var i 	= base_url + l, co	= this ;

		$.ajax({
			type	    : "POST" ,
			headers		: { "sistem_by":"bismillahsuksesduniaakhirat"},
			url			: l,
	 		data	    : d,
			cache		: false,
			processData	: false,
	        contentType	: false,
			beforeSend	: function(){
				if(o !== undefined) $(o).attr('readonly', true) ;
			} ,
			error		: function(r, s, e){
				co.ajaxerr(r, s, e) ;
				if(o !== undefined) $(o).attr('readonly', false) ;
			} ,
			success		: function(r){
				eval(r) ;
				if(o !== undefined) $(o).attr('readonly', false) ;
			}
		}) ;
	},

	ajaxng 		: function(o, l, d, m){

	},

	isvalidform	: function(o){
		var co_e 	= "", co_t 	= "", co_o 	= null ;
		$(o).find('input,textarea,select').filter('[required]')
		.each(function(i){
			co_v 	= true ;
			co_om 	= $(this) ;
			if( co_om.val() == "" || co_om.val() == null){
				co_v= false ;
			}
			//number
			if( co_om.hasClass("number") && co_om.val() == 0 ){
				co_v= false ;
			}
			if(!co_v){
				co_t 	= co_om.attr('placeholder') !== undefined ? co_om.attr('placeholder') : co_om.attr('data-placeholder') ;
				co_e   += co_t + " Empty! \n";
				if(co_o == null) co_o = co_om ;
				co_om.parent(".form-group").addClass('has-error') ;
			}else{
				co_om.parent(".form-group").removeClass('has-error') ;
			}
		}) ;

		if(co_e !== ""){
			alert(co_e) ;
			co_o.focus() ;
			return false;
		}else{
			return true;
		}
	},

	getdataform	: function(o){
		return $(o).serialize() ;
	},

	getdatajson	: function(){
		return $(o).serializeobject() ;
	},

	setopt 		: function(o, n, v){
		o.find("input[name='"+ n +"'][value='" + v + "']").prop('checked', true);
	},

	setcookie	: function(n, v, ex){

	},

	getcookie 	: function(n){

	},

	initenter	: function(o){
		o.find('input').on("keypress", function(e) {
      	/* ENTER PRESSED*/
      	if (e.keyCode == 13) {
	      	/* FOCUS ELEMENT */
	      	oi  = $(this).parents('form').eq(0).find(":input:visible:enabled:not([readonly])");
	      	i   = oi.index(this);
	      	if (i == oi.length - 1) {
               oi[0].select();
	      	} else {
	            oi[i + 1].focus(); //  handles submit buttons
	      	}
	      	return false;
      	}
		});
	},

	initdate	: function(o, lt){
		if(lt == undefined) lt = false ;
		$(o).datetimepicker({
		    language: 'en' ,
		    pickTime: lt
		}) ;
	},

	initselect	: function(p){
		var cp 	= {
			class 	: '.select2',
			url 	: 'admin/load',
			multi	: false,
			clear	: false,
			mininput: 0
		}
		$.extend(true, cp, p) ;

		$(cp.class).select2({
			multiple 	: cp.multi,
			allowClear	: cp.clear,
			minimumInputLength 	: cp.mininput,
			ajax:{
				url 	: function () { return base_url + cp.url + "/" + $(this).attr('data-sf'); } ,
				dataType: 'json',
		        data    : function (par) { return { q : par.term, p : par.page} ;  },
		        processResults	: function (data,page){  return { results: data }; }
		    }
		}) ;
	},

	initnumber	: function(o, d){
		if(d == undefined ) d = 0 ;
		$(o).number( true,d );
	},

	initprogress: function(o, s, e){
      var p = {} ;
      p.et  = parseFloat(100 / parseInt(e)) ;
      p.pr  = Math.min( parseFloat(p.et*s), 100) ;

      o.attr("aria-valuenow",p.pr) ;
      o.css("width",p.pr + "%") ;
      o.html('<span class="sr-only">'+parseInt(p.pr) +'%</span>') ;
	},

	form 		: function(par){//open form
		var f = {} ;
		f.par	= {
			module 		: "Utama" ,
			name 		: "oWeb" ,
			loc 		: "sys/about" ,
			data 		: "" ,
			obj			: "mirzaramadhany" ,
			nocontent	: false ,
			idcontent	: ".bwrapper" ,
			attr		: ""
		}

		$.extend(true,f.par,par) ;

		if(f.par.attr !== "") f.par.attr.replace("'",'"') ;

		if( $(f.par.idcontent).find(".bwrapper-content").length > 0 ){
			f.lid 	= $(f.par.idcontent).find(".bwrapper-content").attr("id") ;
			f.lobj	= $(f.par.idcontent).find(".bwrapper-content").attr("data-bobj") ;
			$("#"+f.lid).trigger("remove").remove() ;
			eval(" " + f.lobj+ " = null ; ") ;
		}
		$(f.par.idcontent).html("") ;

		/*Initialize*/
		f.par.obj 	= f.par.obj.replace(" ","") ;
		f.obj 		= "bos." + f.par.obj ;
		f.id 		= "bos-form-" + f.par.obj ;
		f.idload 	= f.id + "-wraper" ;
		f.idpreload	= f.id + "-wraper" ;
		if(f.par.nocontent){ f.idpreload	= f.id ; }

		f.html		 		= '' ;
		if(!f.par.nocontent){
			f.html		+= '<div id="'+ f.id +'" class="bwrapper-content" data-bobj="'+ f.obj +'" '+f.par.attr+'>' ;
			f.html		+= '<section class="content-header">' ;
			f.html		+= '	<h1>'+f.par.name+'</h1>' ;
			f.html		+= '	<ol class="breadcrumb">' ;
			f.html		+= '	<li><a href="#">'+f.par.module+'</a></li>' ;
			f.html		+= '	<li class="active">'+f.par.name+'</li>' ;
			f.html		+= '	</ol>' ;
			f.html		+= '</section>' ;
			f.html		+= '<section class="content" id="'+f.idload+'"></section>' ;
			f.html		+= '</div>' ;
		}

		f.html	   		+= '<script type="text/javascript">' ;
		f.html	   		+= 	' ' + f.obj +' = ({ ';
		f.html	   		+=		'id 		: "'+ f.id +'" , ';
		f.html	   		+=		'obj 		: $("#'+ f.id +'") , ';
		f.html	   		+=		'base_url: "'+ f.par.loc +'" , ';
		f.html	   		+=		'url 		: "'+ f.par.loc +'" , ';
		f.html	  		   +=		'reload	: function(){ bjs.loadpage("'+f.idpreload+'","'+f.par.loc+'") } ';
		f.html	   		+=	'}) ;  ' ;

		if(!f.par.nocontent){
			f.html	   	+=	' bjs.loadpage("#'+f.idload+'","'+f.par.loc+'","'+f.par.data+'") ; ' ;
			f.html	    += '</script>' ;
			$(f.par.idcontent).append(f.html) ;
		}else{
			f.html	   	+=	' bjs.loadpage("#'+f.id+'","'+f.par.loc+'","'+f.par.data+'") ; ' ;
			f.html	    += '</script>' ;
			$(f.par.idcontent).append('<div id="'+f.id+'" class="bwrapper-content" data-bobj="'+ f.obj +'" '+f.par.attr+'></div>'+f.html) ;
		}

		console.log("Name OBJECT FORM -> " + f.obj) ;
		console.log( eval(f.obj) ) ;
	},

	form_report	: function(l){
		var o 	= $("#rpt_modal_show") ;
		o.find("iframe").attr("src", l ) ;
		o.modal("show") ;
	}

}
