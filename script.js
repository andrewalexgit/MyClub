function ldSignup() {
    $('#btnSignup').bind('click', function(e){
        e.preventDefault();
    })
}

function ldIndex() {

    // JSON
    $.getJSON("api/orgs.json", function(data) {

        var totalOrgs;

        $.each(data.orgs, function(i) {
            totalOrgs = i + 1;
        });

        $("#txtCurrentOrgCount").text("There are currently " + totalOrgs + " organizations registered on MyClub.");
    });
}

function signup() {

    var valid = 1;

    var password = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("newPasswordConfirm").value;
    var email = document.getElementById("newEmail").value;
    var name = document.getElementById("newOrgName").value;

    if (password == confirmPassword && valid == 1) {
        valid = 1;
    } else {
        alert("Please check that your passwords match");
        valid = 0;
    }

    if (password != "" && confirmPassword != "" && email != "" && name != "" && valid == 1) {
        valid = 1;
    } else {
        alert("Please check that you have completed all required fields.");
        valid = 0;
    }

    if (valid == 1) {
        alert("Success! Check your registered E-Mail on how to confirm your accounts authentication.");
        location.href = "index.html";
    } else {
        alert("Sing-up failed.");
    }

}

function signupCheck() {

    var password = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("newPasswordConfirm").value;

    if (password === confirmPassword) {
        document.getElementById("lblPassword").style.color = "#00ff00";
        document.getElementById("lblConfirmPassword").style.color = "#00ff00";
    } else {
        document.getElementById("lblPassword").style.color = "#ff0000";
        document.getElementById("lblConfirmPassword").style.color = "#ff0000";
    }
}

function signin() {
    var username = document.getElementById("signinEmail").value;
    var password = document.getElementById("signinPassword").value;
    sessionStorage.setItem("email", username);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        sessionStorage.setItem("location", "Invalid location");
    }

}

function savePosition(position) {
    var geo = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
    sessionStorage.setItem("location", geo);
    $("#txtSigninHeader").text("Welcome back " + sessionStorage.getItem("email") + " youre logged in at " + sessionStorage.getItem("location"));
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    $("#txtCAPTCHA").text("Thank you!");
    $('#btnSignup').unbind('click');
}