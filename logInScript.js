
async function getLoggedInUser(){
  
    const response = await fetch("http://localhost:8080/user/me",{
        credentials: 'include'
         });
    let data = await response.json()
    return data;
}


