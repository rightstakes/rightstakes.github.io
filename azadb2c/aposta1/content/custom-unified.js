$(function () {
  disableEnterbuttOnLogin();
  clicktoclose();
  addGTMScriptForAds();
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

function addGTMScriptForAds() {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  script.text = `
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], 
          j = d.createElement(s); 
      j.async = true;
      j.src = "https://gtm.aposta1.com/6adpbtfcyk.js?" + i;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'dema4ta=aWQ9R1RNLVQ1RkcyS0pD&page=1');
  `;

  document.head.appendChild(script);
}