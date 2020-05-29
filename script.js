let baseUrl = "http://www.omdbapi.com/?apikey=1f2cce92&";
var doneTypingInterval = 1000;
var typingTimer;   
let resultsContainer = document.querySelector(".results-container");
let search = document.querySelector("#search");

const textDetails=document.querySelectorAll("div.movie-details span:not(.like-btn)");

const poster = document.querySelector("#poster");

const more = document.querySelector("#more");

search.addEventListener('keyup', function () {
    console.log("keyup")
    clearTimeout(typingTimer);
    typingTimer = setTimeout(showSearch, doneTypingInterval);
    
});

search.addEventListener('keydown', function () {
    console.log("keydown")
    clearTimeout(typingTimer);
  });

more.addEventListener('click', function () {
    let plotSpan = document.querySelector("#plot-span");
    var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
        if(request.readyState === 4) {
            let json = JSON.parse(request.responseText);
            let fullPlot=json["Plot"];
            plotSpan.innerText=fullPlot;
        }
    }
    request.open('Get', `${baseUrl}t=${search.value}&plot=full`);
    
	request.send();
})

function showSearch(){
    console.log('searching!')
    var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
        if(request.readyState === 4) {
            resultsContainer.classList.remove("hidden");
            
            let json = JSON.parse(request.responseText);
            for(let i=0;i<textDetails.length;i++){
                let currentElement = textDetails[i];
                currentElement.innerText=json[Object.keys(json).find(key=>
                    key.toLowerCase()===currentElement.parentElement.id.toLowerCase())];
            }
                            poster.src=json["Poster"];

        }
    }
    search = document.querySelector("#search");
    console.log( `${baseUrl}t=${search.value}`);
    request.open('Get', `${baseUrl}t=${search.value}`);
    
	request.send();

   
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

const whiteHeart = 'Save \u2661';
const blackHeart = 'Saved \u2665';
const button = document.querySelector('.like-btn');

function toggle() {
  const like = button.textContent;
  if(like==whiteHeart) {
    button.textContent = blackHeart;
    // add to bookmarked movies
  } else {
    button.textContent = whiteHeart;
    // remove from bookmarked movies
  }
}