let baseUrl = "http://www.omdbapi.com/?apikey=1f2cce92&";
var doneTypingInterval = 2000;
var typingTimer;   
let resultsContainer = document.querySelector(".results-container");
let search = document.querySelector("#search");


search.addEventListener('keyup', function () {
    console.log("keyup")
    clearTimeout(typingTimer);
    typingTimer = setTimeout(showSearch, doneTypingInterval);
    
});

search.addEventListener('keydown', function () {
    console.log("keydown")
    clearTimeout(typingTimer);
  });

function showSearch(){
    console.log('searching!')
    var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
        if(request.readyState === 4) {
            resultsContainer.classList.remove("hidden");
            resultsContainer.textContent='';
            
            
            let json = JSON.parse(request.responseText);
            let results = json["Search"];
            for(let i=0;i<results.length;i++){
                let result = results[i];

                let movieDetails = document.createElement("div");
                movieDetails.classList.add("movie-details");
                
                let title = document.createElement("h3");
                title.innerText=result["Title"];
                movieDetails.appendChild(title);
                let year = document.createElement("p");
                year.innerText=result["Year"];
                movieDetails.appendChild(year);

                let type = document.createElement("p");
                type.innerText=result["Type"];
                movieDetails.appendChild(type);

                let img = document.createElement("img");
                img.src=result["Poster"];
                img.width="200";
                movieDetails.appendChild(img);
                resultsContainer.appendChild(movieDetails);
            }
        }
    }
    search = document.querySelector("#search");
    console.log( `${baseUrl}s=${search.value}`);
    request.open('Get', `${baseUrl}s=${search.value}`);
    
	request.send();

   
}