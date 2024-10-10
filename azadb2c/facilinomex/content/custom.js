$(function () {
  waitUntilInputMaskLoaded();

  hideContinueButtonForResetPassword();

  setPopupForRegistration();

  fixContinueButtonServerResponse();

  fixEmailEnterForgotPassword();

  showhideCouponCode();

  autoFillDemoAccountDetail();

  newPhoneMask();

  //passwordplaceholder();

  iframeCheck();

  //showContinueButtonAfterEmailVerify();

  convertEmailToLowercase();

  readyTermsAndCondition();

});

// function passwordplaceholder(){
//   $('#newPassword').attr('placeholder', 'Contrasena: 8-16 caracteres con al menos una letra mayúscula y un número del 0 al 9.');
// }
function iframeCheck(){
  let isInIframe = false;
  try {
  isInIframe = window.self !== window.top;
  } catch (e) {
  isInIframe = true;
  }
  if(isInIframe){
    document.body.classList.add('iframe-loaded');
    
    if (window.location.href.includes("b2c_1a_passwordchange")) {
      document.body.classList.add('iframe-changepass');
    }
  }
}
// Function to convert email input to lowercase
function convertEmailToLowercase() {
  // Get the input field
  let emailInput = document.getElementById("email");

  // Add event listener for input event
  emailInput.addEventListener("input", function(event) {
      // Get the entered text
      let enteredText = event.target.value;
      
      // Convert to lowercase
      let lowercaseText = enteredText.toLowerCase();
      
      // Update the input field value with lowercase text
      event.target.value = lowercaseText;
  });
}
function fixEmailEnterForgotPassword(){
  
  if (window.location.href.includes("claimsexchange=ForgotPasswordExchange")) {
   
    var emailTextbox = $("#email");
    if(emailTextbox.length>0){
      emailTextbox.keypress(function (ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode == '13') {
          ev.preventDefault();
          $('#email_ver_but_send').click();
          waitUntilForgetPasswordEmailVerified();
          ev.stopPropagation();
        }
    }) 
  } 
  var emailTextbox = $("#email_ver_input");
    if(emailTextbox.length>0){
      emailTextbox.keypress(function (ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode == '13') {
          ev.preventDefault();
          $('#email_ver_but_verify').click();
          waitUntilForgetPasswordEmailVerified();
          ev.stopPropagation();
        }
    }) 
  } 
  }
}
function waitUntilForgetPasswordEmailVerified() {
  
    setTimeout(function () {
      const serverText = $("#claimVerificationServerError").text();
      if (serverText) {
        $(".modal-backdrop.in").hide(); 
        $("#claimVerificationServerError").text("");
      } else {
        waitUntilForgetPasswordEmailVerified();
      } 
    }, 300);
}
// #region Continue Button Reset flow
function hideContinueButtonForResetPassword() {
  if (window.location.href.includes("claimsexchange=ForgotPasswordExchange")  || window.location.href.includes('B2C_1A_PASSWORDCHANGE')  || window.location.href.includes('B2C_1A_signup_signin/api/CombinedSigninAndSignup')) {
   
    // Show the info message on the MFA reset and password reset
    document.getElementById("emailVerificationSSPRControlLoggedInUser_info_message").style.display = "block";

    var continueButton = $("#continue");
    continueButton.hide();

    $("#email_ver_but_verify").click(function(){
      waitUntilEmailVerified(continueButton);
    });    

    $("#emailVerificationSSPRControlLoggedInUser_but_verify_code").click(function () {
      waitUntilEmailVerified(continueButton);
    });

    $("#emailVerificationSSPRControl_but_send_new_code").click(function () {
      continueButton.hide();
    });

  }
}

//Start: #catching visibility of error message on code verification
function getErrorMessageVisibility(){
  var targetNode = document.getElementById('emailVerificationSSPRControl_error_message');
  var observer = new MutationObserver(function(){
    if(targetNode.style.display != 'none'){
        $("#continue").hide();
    } else if(
      document.getElementById('emailVerificationSSPRControl_success_message').style.display != 'none' && 
      !document.getElementById('email').disabled 
    ){
      $("#continue").hide();
    }
    else{
      $("#continue").show();
      $("#continue").addClass('moveContinueButton');
    }
  });
  observer.observe(targetNode, { attributes: true, childList: true });
}

//End: #catching visibility of error message on code verification/

// #region Continue Button Reset flow

$("#emailVerificationSSPRControl_but_verify_code").click(function(){
  showContinueButtonAfterEmailVerify();
  console.log("Email Verfiy Test");
}); 
function showContinueButtonAfterEmailVerify() {
  console.log("Email Verfiy Test");
  if ($("#email").length > 0 && $('#email').prop('disabled') && !$("#emailVerificationSSPRControl_error_message").is(":visible")) {
    getErrorMessageVisibility();
    $("#continue").hide();
  }
  else if($("#newPassword").length > 0){
    $("#continue").show();
  }
  else{
    $("#continue").hide();
    $("#continue").removeClass('moveContinueButton');
  }
}

function waitUntilEmailVerified(continueButton) {
  continueButton.hide();
  if ($element.verificationInfo?.email?.confirmation?.success) {
    console.log("Wait Verfiy Test");
    continueButton.show();
    return;
  }
  if ($element.verificationInfo?.emailVerificationSSPRControlLoggedInUser) {
    continueButton.show();
    $('#emailVerificationSSPRControlLoggedInUser_but_change_claims').hide();
    return;
  }
  setTimeout(function () {
    waitUntilEmailVerified(continueButton);
  }, 150);
}

// #endregion

function setPopupForRegistration() {
  // NOTE: this js file is called only from selfAsserted.html and is used for registration and reset password
  if (!window.location.href.includes("claimsexchange=ForgotPasswordExchange")) {
    //
    if (!window.location.href.includes("SelfAsserted/confirmed?")) {
    let cancelRegistration = $("#cancel-registration");
    cancelRegistration.removeAttr("onclick");
    cancelRegistration
    .attr("data-toggle", "modal")
    .attr("data-target", "#cancel-modal");
   } 
  }
  //Commented due to close button functionality on reset password screen it was openning registration popup
}

// #region Continue Button Blocked

function fixContinueButtonServerResponse() {
  var continueTimerStarted = false;
  $("#continue").click(function () {
    if (!continueTimerStarted) {
      $(".modal-backdrop.in").show();
      waitUntilContinueServerResponse();
    }
  });
}

function waitUntilContinueServerResponse() {
  setTimeout(function () {
    const serverText = $("#claimVerificationServerError").text();
    if (serverText) {
      $(".modal-backdrop.in").hide();
      $("#verifying_blurb").text("");
    } else {
      waitUntilContinueServerResponse();
    }
  }, 1000);
}

// #endregion
// #Coupon Code
function showhideCouponCode() {
  $("#bonus_code").hide();
  var bonusCodePreload = getUrlVars()["b"];
  var $bonusLink = $('<p class="newlink">¿Tienes un código promocional?</p>');
  if(bonusCodePreload){
    $("#bonus_code").show();
    //$(".newlink").hide();
    $("#bonus_code").val(bonusCodePreload);
  }
  else{
    $("#bonus_code").before($bonusLink);
    $("#bonus_code").hide();

    $(document).on("click", ".newlink", function() {
      $("#bonus_code").show();
      $(this).hide();
      $(this).before('<div class="close-bonus-btn">&#x2715;</div>');
    });

    $(document).on("click", ".close-bonus-btn", function() {
      $("#bonus_code").hide();
      $(".newlink").show();
      $(this).remove();
    });
  }
}

//#region create demo account
function autoFillDemoAccountDetail() {
	if(!isDemoAccount())
		return;
  
  $("#newPassword").val(generatePassword());
  $("#givenName").val('Alex');
  $("#surname").val('Smith');
  $("#dateOfBirth").val('12/12/2000');
  $("#phone").val('5580297098');
  $("#personalId").val(generateCURP());
  
}

function isDemoAccount(){
	var originUri = getUrlVars()["d"];
	if(originUri === 'demo')
		return true
	return false;
}

function generatePassword() {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialChars = '@#$%^&*\\-_+=\\[\\]{}|\\:\'",?/`~"();!';
  const allChars = lowerCase + upperCase + digits + specialChars;

  function getRandomChar(charSet) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet[randomIndex];
  }

  function shuffleString(string) {
      return string.split('').sort(() => 0.5 - Math.random()).join('');
  }

  let password = '';
  password += getRandomChar(lowerCase);
  password += getRandomChar(upperCase);
  password += getRandomChar(digits);
  password += getRandomChar(specialChars);

  for (let i = 4; i < 8 + Math.floor(Math.random() * 9); i++) {
      password += getRandomChar(allChars);
  }

  password = shuffleString(password);

  const regex = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&*\-_+=[\]{}|\\:',?/`~"();!]|\.(?!@)){8,16}$/;
  if (!regex.test(password)) {
      return generatePassword();
  }

  return password;
}

function generateCURP() {
     // Minimum year for CURP generation (adjust as needed)
     const minYear = 1900;
     // Maximum allowed year (consider current year)
     const maxYear = new Date().getFullYear() - 18; // Ensures individuals are at least 18 years old
     
     var randomDay = Math.floor(Math.random() * (31 - 1 + 1)) + 1; // Random day between 1 and 31
     var randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear; // Random year within valid range

     let persona = curp.getPersona();
       persona.nombre = 'Andrew Manuel';
       persona.apellidoPaterno = 'Lopes';
       persona.apellidoMaterno = 'Obrador';
       persona.genero = curp.GENERO.MASCULINO;
       persona.fechaNacimiento = (randomDay < 10 ? '0' : '') + randomDay + '-11-' + randomYear;
       persona.estado = curp.ESTADO.TABASCO;
       
       return curp.generar(persona);
  }

//#endregion


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//End Coupon Code
// #region Input mask
function waitUntilInputMaskLoaded() {
  setTimeout(function () {
    const isLoaded = isInputMaskLoaded();
    if (isLoaded) {
      enableInputMasks();
    } else {
      waitUntilInputMaskLoaded();
    }
  }, 150);
}
function newPhoneMask(){
  $("#phone").on("input", function() {
    var mexphone = $(this).val();
    //var mexphone = mexphone1.replaceAll('_','');
    //alert(mexphone);
    if(mexphone.length < 3){
        return;
      }
      //$("#phone").inputmask("remove");
      if (/^33|55|56|57|58|59|33\d{8}$/.test(mexphone)) {
        //alert("hello_if");
        $("#phone").inputmask({
          mask: "99 9999 9999",
          //definitions: {'9': {validator: "[1-9]"}, '4': {validator: "[5-9]"}},
          keepStatic: true,
          removeMaskOnSubmit: true
        });
      } else{
        //alert("hello");
        $("#phone").inputmask({
          mask: "999 9999 999",
          //definitions: {'9': {validator: "[1-9]"}, '4': {validator: "[5-9]"}},
          keepStatic: true,
          removeMaskOnSubmit: true
        });
      }
  });
}
function isInputMaskLoaded() {
  try {
    var input = Inputmask;
    return input != null;
  } catch (error) {
    return false;
  }
}

function createDateString(days, months, years) {
  var date = new Date(); 

  // Day.
  var dd = date.getDate() + days;
  if(dd<10) 
  {
      dd = '0' + dd;
  }
  
  // Month.
  var mm = date.getMonth() + months + 1;
  if(mm < 10) 
  {
    mm = '0' + mm;
  }

  // Year.
  var yyyy = date.getFullYear() + years;

  return dd + "/" + mm + "/" + yyyy;
}

function enableInputMasks() {
  $("#dateOfBirth").inputmask({
    alias: "datetime",
    inputFormat: "dd/mm/yyyy",
    "placeholder": "dd/mm/aaaa",
    min: createDateString(0, 0, -100),
    max: createDateString(0, 0, -18),
    clearIncomplete: true
  });

  $("#cpf").inputmask({
    mask: "999.999.999-99",
    keepStatic: true
  });
  $("#personalId_").inputmask({
    //mask: "AAAA 999999 AAAAAA 99",
    //definitions: {'8': {validator: "[A-Z]"}, '9': {validator: "[0-9]", '7': {validator: "[A-Z]", '6': {validator: "[0-9]"}},
    //keepStatic: true,
  });
  // $("#phone").inputmask({
  //     mask: "99-9999-9999",
  //     definitions: {'8': {validator: "[1-9]"}, '4': {validator: "[5-9]"}},
  //     keepStatic: true
  //   });

    

  $("#givenName").inputmask({
    mask: "d{*}",
    definitions: {
      'd': {
        validator: "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ '-]"
      }
    }
  });

  $("#surname").inputmask({
    mask: "d{*}",
    definitions: {
      'd': {
        validator: "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ '-]"
      }
    }
  });

  // this is to make the phone number inputmode to numeric on mobile so the numeric keyboard showsup.
  $("#phone")[0] ? ($("#phone")[0].inputMode = "numeric") : '';
}

function readyTermsAndCondition() {

  disableRegisterButtonIfTermsAndCondtionNotAccepted();
  //terms and condition text and behaviur update
  let termsNConditions = $(".termsNconditions_li #_option");
  termsNConditions.attr("for", "");
  termsNConditions.html(`Tengo al menos 18 años y acepto <a> Términos y Condiciones </a>`);
  termsNConditions.removeAttr("onclick");
  termsNConditions.attr("data-toggle", "modal").attr("data-target", "#terms-modal");

  // show custome error message
  let termsRequiredErrorMesage = $(".termsNconditions_li .error");
  termsRequiredErrorMesage?.on('DOMSubtreeModified', function () {
    if (termsRequiredErrorMesage?.text() === 'Esta información es necesaria.') {
      termsRequiredErrorMesage.html('Por favor lea y acepte los términos y condiciones.');
    }
  });
  getTermsAndConditionAPI();
}

function getTermsAndConditionAPI() {
  fetch(`https://mx.facilino.com/papi/log/api/c/seo/slug/lp/terminos-y-condiciones`, {
    method: 'GET'
  })
    .then(response => {
      // Check if the response status is 200
      if (response.status === 200) {
        // Parse the JSON data
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      populateTermsNConditions(data);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

function populateTermsNConditions(terms) {
  let body = document.getElementById('terms-modal-body');
  body.innerHTML = ( `${terms?.body}  <br>  ${terms?.seoContent}` ) || '';
}

function disableRegisterButtonIfTermsAndCondtionNotAccepted() {
  var termsNcondtionCheck = document.getElementById('termsNconditions_');
  var register = document.getElementById('continue');

  if(termsNcondtionCheck){
    register.disabled = true;
    termsNcondtionCheck.onchange = function () {
      register.disabled = !this.checked;
    };
  }
}

// #endregion
