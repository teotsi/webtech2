async function getLoggedInUser() {

    const response = await fetch("http://localhost:8080/user/me", {
        credentials: 'include'
    });
    let data = await response.json()
    return data;
}

function logout() {
    fetch("http://localhost:8080/logout", {
        credentials: "include"
    }).then(response => {
        location.href = "/login/"
    })
}

function validateRegistration() {
    let password = document.querySelector("#register-password");
    let repeatPassword = document.querySelector("#repeat-password");

    return password.value && password.value === repeatPassword.value

}

function checkPass() {
    let password = document.querySelector("#register-password");
    let repeatPassword = document.querySelector("#repeat-password");
    if (password.value !== repeatPassword.value) {
        repeatPassword.style.color = repeatPassword.style.borderColor = "red"
    } else {
        repeatPassword.style.color = "unset"
        repeatPassword.style.borderColor = "gray"

    }
}

function validateEmail(email) {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

}