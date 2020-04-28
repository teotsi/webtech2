let baseUrl = "http://www.omdbapi.com/?apikey=1f2cce92&";
var doneTypingInterval = 1000;
var typingTimer;   
let resultsContainer = document.querySelector(".results-container");
let search = document.querySelector("#search");

const textDetails=document.querySelectorAll("div.movie-details span");

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
                poster.src=json["Poster"];
            }
        }
    }
    search = document.querySelector("#search");
    console.log( `${baseUrl}t=${search.value}`);
    request.open('Get', `${baseUrl}t=${search.value}`);
    
	request.send();

   
}