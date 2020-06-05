let baseUrl = "http://www.omdbapi.com/?apikey=1f2cce92&";
var doneTypingInterval = 1000;
var typingTimer;   
let resultsContainer = document.querySelector(".results-container");
let search = document.querySelector("#search");
let searchResults = {};
const textDetails=document.querySelectorAll("div.movie-details span:not(.like-btn)");
const poster = document.querySelector("#poster");

let loggedInUser;
getLoggedInUser().then(value=>{
  loggedInUser = value;

});

const more = document.querySelector("#more");

search.addEventListener('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(showSearch, doneTypingInterval);
    
});

search.addEventListener('keydown', function () {
    clearTimeout(typingTimer);
  });


function showMore(element, title){
  let plotSpan;
  if(!title){
    title = search.value;
    plotSpan = document.querySelector("#plot-span");
  }else{
    plotSpan = element.parentElement.querySelector("#plot-span");
    console.log(plotSpan);
  }

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if(request.readyState === 4) {
          json = JSON.parse(request.responseText);
          let fullPlot=json["Plot"];
          plotSpan.innerText=fullPlot;
      }
  }
  request.open('Get', `${baseUrl}t=${title}&plot=full`);
  request.send();
}

function showSearch(){
    console.log('searching!')
    var request = new XMLHttpRequest();
    fetch(`${baseUrl}t=${search.value}`)
    .then(response=>response.json())
    .then(data=>{
      resultsContainer.classList.remove("hidden");      
      searchResults =data;
      for(let i=0;i<textDetails.length;i++){
          let currentElement = textDetails[i];
          currentElement.innerText=searchResults[Object.keys(searchResults).find(key=>
              key.toLowerCase()===currentElement.parentElement.id.toLowerCase())];
      }
      poster.src=searchResults["Poster"];
      
      if(loggedInUser){
        let button = document.querySelector('.like-btn');
        getMovie(`${loggedInUser['links'][1]['href']}/${searchResults['imdbID']}`)
          .then(response =>{
            if(response.status!==404){
              button.textContent = 'Saved \u2665';
            }else{
              console.log(response.status)

              button.textContent = 'Save \u2661';

            }
          });
      }
    });
	
    search = document.querySelector("#search");
    console.log( `${baseUrl}t=${search.value}`);

   
}

function logIn(username, password){
  const request = new XMLHttpRequest();
  request.onload = () =>{
    if(request.status == 200){
      location.href = "index.html";
    }
    console.log(request.responseText);
  }

  if(!(username  || password)){
      username = document.querySelector('#login-email').value;
      password = document.querySelector('#login-password').value;
  }
  let formEncoded = `username=${username}&password=${password}`;
  request.open('post','http://localhost:8080/login');
  request.withCredentials = true;
  request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  request.send(formEncoded);
}

function register(){
  const request = new XMLHttpRequest();
  request.onload = () =>{
    if(request.status == 200){
      logIn(email, password)
    }
    console.log(request.responseText);
  }

  let email = document.querySelector('#register-email').value;
  let password = document.querySelector('#register-password').value;

  let registerData = {
    "email":email,
    "password":password
  }
  
  request.open('put','http://localhost:8080/user/');
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(registerData));
}

function putMovie(){
  const request = new XMLHttpRequest();
  request.onload = () =>{
    console.log(request.responseText);
  }


  let movieData = {
    "id": searchResults['imdbID'],
    "poster":searchResults['Poster']
  }
  
  request.open('put',`http://localhost:8080/user/${loggedInUser['id']}/movies` );
  request.withCredentials = true;
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(movieData));
}

async function removeMovie(id=searchResults['imdbID']){
  let link = loggedInUser['links'][1]
  console.log(`${link['href']}/${id}`);
  const response = await fetch(`${link['href']}/${id}`,{
    credentials: 'include',
    method:'DELETE'
     });
    
    }

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.toggle("active");
}



function toggle(id) {
  const whiteHeart = 'Save \u2661';
const blackHeart = 'Saved \u2665';
let button;
if(id){
   button = document.querySelector(`[id$="${id}"]`);
}else{
  button = document.querySelector('.like-btn');
}
  const like = button.textContent;
  if(like==whiteHeart) {
    button.textContent = blackHeart;
    putMovie();
  } else {
    button.textContent = whiteHeart;
    removeMovie(id);
  }
}
