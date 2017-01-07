var loginListener = function(){
    $('.logInOut').live('click', function(){
        if (!loggedIn){
            $('.signUp').show();
            $('.signUpBG').show();
        }
        else{
            loggedIn = false;
            $('.logInOut').html ("Login / Signup");
        }			
    });
    $('.LoginButton').live('click', function(){
        var user = $('.loginUsername').val();
        var pass = $('.loginPassword').val();
        if ((user != "")&&(pass != "")){
            Login(user, pass);
        }
    });
    $('.RegisterButton').live('click', function(){
        var name = $('.regName').val();
        var user = $('.regUsername').val();
        var email = $('.regEmail').val();
        var pass = $('.regPass').val();
        var confirm = $('.regConfirm').val();
        if ((user != "")&&(pass != "")&&(email != "")&&(confirm != "")&&(name != "")){
            if (pass == confirm){
                siAPI.Register(name, user, email, pass);
            }
            else {
                console.log("user pass not same");
            }
        }
        else {
                console.log("fill in all");
            }
    });
}

var Login = function(){};
var loggedIn = false;