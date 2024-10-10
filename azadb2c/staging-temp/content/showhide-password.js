showHidePassword();

function showHidePassword() {

    // append css
    // for (let index = 1; index < 5; index++) {
    //     $(`
    //     <style>
        
    //     </style>
    //     `);  
        
    // }
    $(`
        <style>
            .newPassword_li #password-entry-item1.toggle-hide-password, #password-entry-item1.toggle-show-password, .oldPassword_li #password-entry-item1.toggle-hide-password, .reenterPassword_li #password-entry-item1.toggle-hide-password,
            .newPassword_li #password-entry-item2.toggle-hide-password, #password-entry-item2.toggle-show-password, .oldPassword_li #password-entry-item2.toggle-hide-password, .reenterPassword_li #password-entry-item2.toggle-hide-password,
            .newPassword_li #password-entry-item3.toggle-hide-password, #password-entry-item3.toggle-show-password, .oldPassword_li #password-entry-item3.toggle-hide-password, .reenterPassword_li #password-entry-item3.toggle-hide-password, 
            .newPassword_li #password-entry-item4.toggle-hide-password, #password-entry-item4.toggle-show-password, .oldPassword_li #password-entry-item4.toggle-hide-password, .reenterPassword_li #password-entry-item4.toggle-hide-password
            {
                position: relative
            }

            .newPassword_li #password-entry-item1.toggle-hide-password::after, .oldPassword_li #password-entry-item1.toggle-hide-password::after, .reenterPassword_li #password-entry-item1.toggle-hide-password::after,
            .newPassword_li #password-entry-item2.toggle-hide-password::after, .oldPassword_li #password-entry-item2.toggle-hide-password::after, .reenterPassword_li #password-entry-item2.toggle-hide-password::after,
            .newPassword_li #password-entry-item3.toggle-hide-password::after, .oldPassword_li #password-entry-item3.toggle-hide-password::after, .reenterPassword_li #password-entry-item3.toggle-hide-password::after,
            .newPassword_li #password-entry-item4.toggle-hide-password::after, .oldPassword_li #password-entry-item4.toggle-hide-password::after, .reenterPassword_li #password-entry-item4.toggle-hide-password::after
            {
                content: '';
                background-image: url("https://rightstakes.github.io/azadb2c/staging-temp/content/feather-eye-off.svg");
                background-size: cover;
                position: relative;
                bottom: 19px !important;
                top: auto !important;
                right: 13px;
                display: inline-block;
                width: 18px!important;
                height: 18px!important;
                max-width: 18px!important;
                max-height: 18px!important;
                pointer-events: none;
                position: absolute;
                z-index: 999;
            }

            .newPassword_li #password-entry-item1.toggle-show-password::after, .oldPassword_li #password-entry-item1.toggle-show-password::after, .reenterPassword_li #password-entry-item1.toggle-show-password::after,
            .newPassword_li #password-entry-item2.toggle-show-password::after, .oldPassword_li #password-entry-item2.toggle-show-password::after, .reenterPassword_li #password-entry-item2.toggle-show-password::after,
            .newPassword_li #password-entry-item3.toggle-show-password::after, .oldPassword_li #password-entry-item3.toggle-show-password::after, .reenterPassword_li #password-entry-item3.toggle-show-password::after,
            .newPassword_li #password-entry-item4.toggle-show-password::after, .oldPassword_li #password-entry-item4.toggle-show-password::after, .reenterPassword_li #password-entry-item4.toggle-show-password::after
            {
                content: '';
                background-image: url("https://rightstakes.github.io/azadb2c/staging-temp/content/feather-eye.svg");
                background-size: cover;
                position: relative;
                bottom: 19px !important;
                top: auto !important;
                right: 13px;
                display: inline-block;
                width: 18px!important;
                height: 18px!important;
                max-width: 18px!important;
                max-height: 18px!important;
                pointer-events: none;
                position: absolute;
                z-index: 999;
            }

            .newPassword_li #password, .oldPassword_li #password, .reenterPassword_li #password {
                padding-right: 50px!important;
            }



            #password-entry-item1.toggle-hide-password, #password-entry-item2.toggle-hide-password, #password-entry-item3.toggle-hide-password, #password-entry-item4.toggle-hide-password {
                position: relative
            }
            #password-entry-item1.toggle-show-password, #password-entry-item2.toggle-show-password, #password-entry-item3.toggle-show-password, #password-entry-item4.toggle-show-password{
                position: relative
            }

            #password-entry-item1.toggle-hide-password::after, #password-entry-item2.toggle-hide-password::after, #password-entry-item3.toggle-hide-password::after, #password-entry-item4.toggle-hide-password::after {
                content: '';
                background-image: url("https://rightstakes.github.io/azadb2c/staging-temp/content/feather-eye-off.svg");
                background-size: cover;
                position: relative;
                top: 41px;
                right: 13px;
                display: inline-block;
                width: 18px!important;
                height: 18px!important;
                max-width: 18px!important;
                max-height: 18px!important;
                pointer-events: none;
                position: absolute;
                z-index: 999;
            }

            #password-entry-item1.toggle-show-password::after, #password-entry-item2.toggle-show-password::after, #password-entry-item3.toggle-show-password::after, #password-entry-item4.toggle-show-password::after {
                content: '';
                background-image: url("https://rightstakes.github.io/azadb2c/staging-temp/content/feather-eye.svg");
                background-size: cover;
                position: relative;
                top: 41px;
                right: 13px;
                display: inline-block;
                width: 18px!important;
                height: 18px!important;
                max-width: 18px!important;
                max-height: 18px!important;
                pointer-events: none;
                position: absolute;
                z-index: 999;
            }

            #password {
                padding-right: 50px!important;
            }
        </style>
        
    `).appendTo('head');

    let passwordId = '#password,#oldPassword,#newPassword,#reenterPassword';

    //if (document.querySelector('#oldPassword') && document.querySelector('#newPassword') && document.querySelector('#reenterPassword')) {
     //   passwordId = '#oldPassword,#newPassword,#reenterPassword';
    //}

    // get password parent div and add id
    passwordId.split(',').forEach(function(pId,i){
        const passwordField = document.querySelector(pId);
        if(passwordField) {
            const entryItem = passwordField.parentElement;
            const entryItemId="password-entry-item"+(i+1);
            entryItem.setAttribute("id", entryItemId);
    
            // add ::after pseudo
            $('#'+entryItemId).toggleClass('toggle-show-password');
    
            // handle user click
            $(pId).on('click', function (e) {
                const passwdInput = e.target;
                if (e.offsetX > (passwdInput.clientWidth - 50)) {
                    switchVisibility(pId,entryItemId);
                }
            });
    
            
        }

    })
    
    function switchVisibility(id,entryItemId) {
        if ($(id).attr('type') === 'password') {
            $('#'+entryItemId).removeClass('toggle-show-password');
            $('#'+entryItemId).addClass('toggle-hide-password');
            $(id).attr('type', 'text');
        }
        else {
            $('#'+entryItemId).removeClass('toggle-hide-password');
            $('#'+entryItemId).addClass('toggle-show-password');
            $(id).attr('type', 'password');
        }
    }
};