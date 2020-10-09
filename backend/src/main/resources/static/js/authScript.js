const getLoggedInUser = async () => {
    const response = await fetch("http://localhost:8080/user/me", {
        credentials: 'include'
    });
    return await response.json();
};

const logout = () => {
    fetch("http://localhost:8080/logout", {
        credentials: "include"
    }).then(response => {
        location.href = "/login/"
    })
};

const validateRegistration = () => {
    const password = document.querySelector("#register-password");
    const repeatPassword = document.querySelector("#repeat-password");
    return password.value && password.value === repeatPassword.value

};

const checkPass = () => {
    const password = document.querySelector("#register-password");
    const repeatPassword = document.querySelector("#repeat-password");
    if (password.value !== repeatPassword.value) {
        repeatPassword.style.color = repeatPassword.style.borderColor = "red"
    } else {
        repeatPassword.style.color = "unset"
        repeatPassword.style.borderColor = "gray"

    }
};

const validateEmail = email => email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);