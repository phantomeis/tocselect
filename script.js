
 
 jQuery(document).ready(function() {
     var toc_title =  jQuery("span.tocsel_title").html();
     jQuery( "#selectoc_btn" ).click(function() { 
       var file = this.form.selectoc_id.value;      
         if(file.match(/:\*$/)) {
            jQuery("span.tocsel_title").html('Index');
        }   
        else
             {
                 jQuery("span.tocsel_title").html(toc_title); 
             }     
        var params = "seltoc_val=" +  encodeURIComponent(file);   
        params += '&call=tocselect';     
     
        jQuery.post( DOKU_BASE + 'lib/exe/ajax.php',  params,
                function (data) {  
                if(!data) {
                        document.getElementById("setctoc_out").innerHTML = "";                                           
                }
                 else {                      
                     document.getElementById("setctoc_out").innerHTML = data;                           
                 }
                    },
                'html'
            );      
          jQuery( "#tocseltoggle img").click(function() {  
                     jQuery("#setctoc_out").toggle();                                        
                     var dir = DOKU_BASE + 'lib/plugins/tocselect/';
                      var curSrc = jQuery(this).attr('src');
                      if (curSrc.match(/open/)) {
                          jQuery(this).attr('src', dir +'closed.png');
                      }
                      if (curSrc.match(/closed/)) {
                          jQuery(this).attr('src', dir +'open.png ');
                      }
                     
          });
          jQuery( "#tocseltoggle img" ).css( 'cursor', 'pointer' );    
   }); 
      var dom = document.getElementById("selectoc_id");      
      if(dom && dom.value.match(/curID/)) {         
         dom.value = JSINFO['id'];  
         jQuery( "#tocseltoggle img" ).css( 'cursor', 'pointer' );    
          jQuery( "#selectoc_btn" ).click();
      }
     else {
         var cval = tocsel_getCookie('tocselect');
     if(cval && document.getElementById("selectoc_id")) {
         cval = cval.replace(/%3A/g,':');
        document.getElementById("selectoc_id").value = cval;
        jQuery( "#selectoc_btn" ).click();
     }
     }  
 });
 

 function  tocsel_updatetoc(name) {
        var dom = document.getElementById("selectoc_id");
        dom.value = name;
        jQuery( "#tocseltoggle img" ).css( 'cursor', 'pointer' );    
        jQuery( "#selectoc_btn" ).click();
 }
 
 function tocsel_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
} 