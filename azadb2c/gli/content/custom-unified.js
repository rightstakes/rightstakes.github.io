$(function () {
  disableEnterbuttOnLogin();
  clicktoclose();
});

function disableEnterbuttOnLogin(){
  var isLoginPage=false;
  var href=window.location.href;
    if(href.indexOf("login.aposta1.com") != -1){
      //production
      isLoginPage=true;
    }
    else if(href.indexOf("login.seriea.fun") != -1){
      //Staging
      isLoginPage=true;
    }
    else if(href.indexOf("aposta1staging.b2clogin.com") != -1){
      //localhost
      isLoginPage=true;
    }
  if (isLoginPage) {
   setTimeout(function(){
     if($('.working').is(':visible')){
          $('#next').attr('disabled','disabled');
     }else{
        $('#next').removeAttr('disabled');
     }
     disableEnterbuttOnLogin();
   },100);
    
  } 
}
function clicktoclose(){
  $('#background_branding_container').click(function(e) {
      console.log('clicked1');
      if (e.target !== $('.panel-default')[0]) {
          console.log('clicked2');
          goBack();
      } 
  });
}