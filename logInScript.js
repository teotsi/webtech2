
async function getLoggedInUser(){
  
    const response = await fetch("http://localhost:8080/user/me",{
        credentials: 'include'
         });
    let data = await response.json()
    return data;
}

function logout(){
    fetch("http://localhost:8080/logout",{
        credentials:"include"
    }).then(response=>{
        location.href="login.html"
    })
}

function validateRegistration(){
    let password = document.querySelector("#register-password");
    let repeatPassword = document.querySelector("#repeat-password");

   return password.value && password.value===repeatPassword.value        
    
}