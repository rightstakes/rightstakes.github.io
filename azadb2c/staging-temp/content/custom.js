$(function () {
  waitUntilInputMaskLoaded();

  hideContinueButtonForResetPassword();

  setPopupForRegistration();

  fixContinueButtonServerResponse();

  fixEmailEnterForgotPassword();

  showhideCouponCode();

  autoFillDemoAccountDetail();

  iframeCheck();

  convertEmailToLowercase();

  //passwordplaceholder();

  //showContinueButtonAfterEmailVerify();

  readyTermsAndCondition();

  // addSendOTPButton();
});

// function passwordplaceholder(){
//   $('#newPassword').attr('placeholder', 'Senha: 8-16 caracteres, 1 maiúscula e 1 número (0-9).');
// }
function iframeCheck() {
  let isInIframe = false;
  try {
    isInIframe = window.self !== window.top;
  } catch (e) {
    isInIframe = true;
  }
  if (isInIframe) {
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
  emailInput.addEventListener("input", function (event) {
    // Get the entered text
    let enteredText = event.target.value;

    // Convert to lowercase
    let lowercaseText = enteredText.toLowerCase();

    // Update the input field value with lowercase text
    event.target.value = lowercaseText;
  });
}
function fixEmailEnterForgotPassword() {

  if (window.location.href.includes("claimsexchange=ForgotPasswordExchange")) {

    var emailTextbox = $("#email");
    if (emailTextbox.length > 0) {
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
    if (emailTextbox.length > 0) {
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
  if (window.location.href.includes("claimsexchange=ForgotPasswordExchange") || window.location.href.includes('B2C_1A_PASSWORDCHANGE') || window.location.href.includes('B2C_1A_signup_signin/api/CombinedSigninAndSignup')) {

    // Show the info message on the MFA reset and password reset
    document.getElementById("emailVerificationSSPRControlLoggedInUser_info_message").style.display = "block";

    var continueButton = $("#continue");
    continueButton.hide();

    $("#email_ver_but_verify").click(function () {
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
function getErrorMessageVisibility() {
  var targetNode = document.getElementById('emailVerificationSSPRControl_error_message');
  var observer = new MutationObserver(function () {
    if (targetNode.style.display != 'none') {
      $("#continue").hide();
    } else if(
      document.getElementById('emailVerificationSSPRControl_success_message').style.display != 'none' && 
      !document.getElementById('email').disabled 
    ){
      $("#continue").hide();
    }
    else {
      $("#continue").show();
      $("#continue").addClass('moveContinueButton');
    }
  });
  observer.observe(targetNode, { attributes: true, childList: true });
}

//End: #catching visibility of error message on code verification/

// #region Continue Button Reset flow

$("#emailVerificationSSPRControl_but_verify_code").click(function () {
  showContinueButtonAfterEmailVerify();
});

function showContinueButtonAfterEmailVerify() {
  console.log("Email Verfiy Test");
  if ($("#email").length > 0 && $('#email').prop('disabled') && !$("#emailVerificationSSPRControl_error_message").is(":visible")) {
    getErrorMessageVisibility();
    $("#continue").hide();
  }
  else if ($("#newPassword").length > 0) {
    $("#continue").show();
  }
  else {
    $("#continue").hide();
    $("#continue").removeClass('moveContinueButton');
  }
}

function waitUntilEmailVerified(continueButton) { 
  if ($element.verificationInfo?.email?.confirmation?.success) {
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
  var $bonusLink = $('<p class="newlink">Você tem um código de bônus?</p>');
  if (bonusCodePreload) {
    $("#bonus_code").show();
    //$(".newlink").hide();
    $("#bonus_code").val(bonusCodePreload);
  }
  else {
    $("#bonus_code").before($bonusLink);
    $("#bonus_code").hide();

    $(document).on("click", ".newlink", function () {
      $("#bonus_code").show();
      $(this).hide();
      $(this).before('<div class="close-bonus-btn">&#x2715;</div>');
    });

    $(document).on("click", ".close-bonus-btn", function () {
      $("#bonus_code").hide();
      $(".newlink").show();
      $(this).remove();
    });
  }
}

function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
//End Coupon Code

//#region create demo account
function autoFillDemoAccountDetail() {
  if (!isDemoAccount())
    return;

  $("#newPassword").val('Aposta2024@');
  $("#givenName").val('Alex');
  $("#surname").val('Smith');
  $("#dateOfBirth").val('12/12/2000');
  $("#phone").val('(11)942245177');
  $("#personalId").val(generateCPF());

}

function isDemoAccount() {
  var originUri = getUrlVars()["d"];
  if (originUri === 'demo')
    return true
  return false;
}

function generateCPF() {
  function randomDigit() {
    return Math.floor(Math.random() * 10);
  }

  function calculateCheckDigit(digits, weight) {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * (weight - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  // Generate the first nine digits
  const cpf = [];
  for (let i = 0; i < 9; i++) {
    cpf.push(randomDigit());
  }

  // Calculate the first check digit
  cpf.push(calculateCheckDigit(cpf, 10));

  // Calculate the second check digit
  cpf.push(calculateCheckDigit(cpf, 11));

  // Format the CPF as a string
  return cpf.join('');
}

//#endregion

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
  if (dd < 10) {
    dd = '0' + dd;
  }

  // Month.
  var mm = date.getMonth() + months + 1;
  if (mm < 10) {
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
    min: createDateString(0, 0, -100),
    max: createDateString(0, 0, -18),
    clearIncomplete: true
  });

  $("#personalId").inputmask({
    mask: "999.999.999-99",
    keepStatic: true
  });

  $("#phone").inputmask({
    mask: "(89) 49999-9999",
    definitions: { '8': { validator: "[1-9]" }, '4': { validator: "[5-9]" } },
    keepStatic: true
  });

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
}

function readyTermsAndCondition() {

  disableRegisterButtonIfTermsAndCondtionNotAccepted();
  //terms and condition text and behaviur update
  let termsNConditions = $(".termsNconditions_li #_option");
  termsNConditions.attr("for", "");
  termsNConditions.html(`Tenho pelo menos 18 anos e aceito os <a> Termos e Condições. </a>`);
  termsNConditions.removeAttr("onclick");
  termsNConditions.attr("data-toggle", "modal").attr("data-target", "#terms-modal");

  // show custome error message
  let termsRequiredErrorMesage = $(".termsNconditions_li .error");
  termsRequiredErrorMesage?.on('DOMSubtreeModified', function () {
    if (termsRequiredErrorMesage?.text() === 'Essas informações são necessárias.') {
      termsRequiredErrorMesage.html('Por favor, leia e concorde com os termos e condições.')
    }
  });
  getTermsAndConditionAPI();
}

function getTermsAndConditionAPI() {
  fetch(`https://www.aposta1.com/papi/log/api/c/seo/slug/lp/termos-condicoes`, {
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
  body.innerHTML = (`${terms?.body}  <br>  ${terms?.seoContent}`) || '';
}

function disableRegisterButtonIfTermsAndCondtionNotAccepted() {
  var termsNcondtionCheck = document.getElementById('termsNconditions_');
  var register = document.getElementById('continue');

  if (termsNcondtionCheck) {
    register.disabled = true;
    termsNcondtionCheck.onchange = function () {
      register.disabled = !this.checked;
    };
  }
}

function addSendOTPButton() {
  var div = document.createElement('div');
  div.id = 'send-otp-wrapper'
  div.classList.add('send-otp-wrapper');


  var button = document.createElement('button');
  button.id = 'send-otp-api-button';
  button.textContent = 'Send OTP Code';
  button.classList.add('btn-send-otp');

  div.appendChild(button);
  // Append the button to the body or another container element
  document.getElementsByClassName('TextBox email_li')[0].appendChild(div);

  // Add an event listener to the button
  button.addEventListener('click', function () {
    sendOtpMessageAPI();
  });
}


function sendOtpMessageAPI() {
  removeOTPError();

  let button = document.getElementById('send-otp-api-button');
  if (button) button.setAttribute("disabled", "disabled");

  const email = document.getElementById('email').value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(email);
  console.log(!(email && isValid))
  if (!(email && isValid)) {
    addOtpError('Please enter a valid email.');
    return;
  }

  const credentials = btoa(`UaXtxs1lB:ykX6gyU8X2Au93cFuPTExNpxe9`);
  fetch(`https://otp-master.free.beeceptor.com`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`
    },
    body: JSON.stringify({ email })
  })
    .then(data => {
      console.log('Success:', data);
      if (data?.status === 200) {
        removeOTPError();
        resendOtpWait();
      } else {
        addOtpError();
      }
    })
    .catch((error) => {
      console.error(error);
      addOtpError();
    });
}

/*
*** Remove the API send-otp-api-button and replace it with cound down text
**/
function resendOtpWait() {
  // disable API call button
  let button = document.getElementById('send-otp-api-button');
  if (button) button.setAttribute("disabled", "disabled");

  // Add Cound Down text div
  let coundDownTimer = 40;
  var countdowndiv = document.createElement('div');
  countdowndiv.id = 'resend-countdown';
  countdowndiv.textContent = `Request a new OTP in ${coundDownTimer} seconds.`;
  countdowndiv.classList.add('resend-otp');
  document.getElementById('send-otp-wrapper').appendChild(countdowndiv);

  var timer = setInterval(() => {
    coundDownTimer--;
    document.getElementById('resend-countdown').textContent = `Request a new OTP in ${coundDownTimer} seconds.`;
    // add send otp button after countdown reachs 0
    if (!coundDownTimer) {
      clearInterval(timer);
      countdowndiv.remove();
      removeOTPError();
      button.removeAttribute("disabled");
    }
  }, 1000);
}

function addOtpError(error) {

  let button = document.getElementById('send-otp-api-button');
  button?.removeAttribute("disabled");

  var errorDiv = document.createElement('div');
  errorDiv.id = 'error-otp';
  if (error) {
    errorDiv.textContent = error;
  } else {
    errorDiv.textContent = 'Something Went Wrong. Please Try Again.';
  }
  errorDiv.classList.add('error-otp');
  document.getElementById('send-otp-wrapper').appendChild(errorDiv);
}

function removeOTPError() {
  document.getElementById('error-otp')?.remove();
}


// #endregion
