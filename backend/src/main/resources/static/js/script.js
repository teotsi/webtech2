let baseUrl = "http://www.omdbapi.com/?apikey=1f2cce92&";
var doneTypingInterval = 1000;
var typingTimer;
let resultsContainer = document.querySelector(".results-container");
let search = document.querySelector("#search");
let searchResults = {};
const textDetails = document.querySelectorAll("div.movie-details span:not(.like-btn)");
const poster = document.querySelector("#poster");

let loggedInUser;
getLoggedInUser().then(value => {
  loggedInUser = value;

});

const more = document.querySelector("#more");

search.addEventListener('keyup', function () {
  clearTimeout(typingTimer);
  if (search.value.length) {
    typingTimer = setTimeout(showSearch, doneTypingInterval);
  }

});

search.addEventListener('keydown', function () {
  clearTimeout(typingTimer);
});


function toggleMore(element, title) {
  let plotSpan;
  let fullPlotSpan;

  if (!title) {
    title = search.value;
    plotSpan = document.querySelector("#plot-span");
    fullPlotSpan = document.querySelector("#full-plot-span");
  } else {
    plotSpan = element.parentElement.querySelector("#plot-span");
    fullPlotSpan = element.parentElement.querySelector("#full-plot-span");
  }
  let shortPlot = plotSpan.innerText;
  let anchor = plotSpan.parentElement.nextSibling.nextSibling;
  if (anchor.innerText === "Less") {
    anchor.innerText = "More";
    plotSpan.classList.toggle("hidden");
    fullPlotSpan.classList.toggle("hidden");
  } else {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        json = JSON.parse(request.responseText);
        let fullPlot = json["Plot"];
        fullPlotSpan.innerText = fullPlot;
        anchor.innerText = "Less"
        plotSpan.classList.toggle("hidden");
        fullPlotSpan.classList.toggle("hidden");
      }
    }
    request.open('Get', `${baseUrl}t=${title}&plot=full`);
    request.send();
  }

}


function showSearch() {
  search = document.querySelector("#search");
  console.log('searching!')
  fetch(`${baseUrl}t=${search.value}`)
    .then(response => response.json())
    .then(data => {
      if (!data.Error) {
        resultsContainer.classList.remove("hidden");
        searchResults = data;
        for (let i = 0; i < textDetails.length; i++) {
          let currentElement = textDetails[i];
          currentElement.innerText = searchResults[Object.keys(searchResults).find(key =>
            key.toLowerCase() === currentElement.parentElement.id.toLowerCase())];
        }
        poster.src = searchResults["Poster"];
        let anchor = document.querySelector("#plot-container a");
        let plotSpan = document.querySelector("#plot-span");
        let fullPlotSpan = document.querySelector("#full-plot-span");
        plotSpan.classList.remove("hidden");
        fullPlotSpan.classList.add("hidden");
        anchor.innerText = "More";
        if (loggedInUser.id) {
          let button = document.querySelector('.like-btn');
          getMovie(`${loggedInUser['links'][1]['href']}/${searchResults['imdbID']}`)
            .then(response => {
              if (response.status !== 404) {
                button.textContent = 'Saved \u2665';
              } else {
                button.textContent = 'Save \u2661';
              }
            });
        }
      }
    });
  console.log(`${baseUrl}t=${search.value}`);
}

function logIn(username, password) {
  if (!(username || password)) {
    username = document.querySelector('#login-email').value;
    password = document.querySelector('#login-password').value;
  }
  let formEncoded = `username=${username}&password=${password}`;
  fetch('http://localhost:8080/login', {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formEncoded
  }).then(response => {
    if (response.status == 200) {
      location.href = "/";
    } else {
      let email = document.querySelector('#login-email');
      email.parentElement.querySelector(':scope .feedback').classList.toggle("hidden");
    }
  })

}

function register() {
  let email = document.querySelector('#register-email')
  let password = document.querySelector('#register-password')
  let emailValue = email.value;
  let passwordValue = password.value;
  if (validateEmail(emailValue) && validateRegistration()) {

    let registerData = {
      "email": emailValue,
      "password": passwordValue
    }
    fetch('http://localhost:8080/user/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    }).then(response => {
      if (response.status == 200) {
        logIn(emailValue, passwordValue)
      }
    })
  } else {
    email.parentElement.querySelector(':scope .feedback').classList.toggle("hidden");
  }
}

function putMovie() {
  const request = new XMLHttpRequest();
  request.onload = () => {
    console.log(request.responseText);
  }


  let movieData = {
    "id": searchResults['imdbID'],
    "poster": searchResults['Poster']
  }
  request.open('put', `http://localhost:8080/user/${loggedInUser['id']}/movies`);
  request.withCredentials = true;
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(movieData));
}

function removeMovie(id = searchResults['imdbID']) {
  let link = loggedInUser['links'][1]
  console.log(`${link['href']}/${id}`);
  fetch(`${link['href']}/${id}`, {
    credentials: 'include',
    method: 'DELETE'
  }).then((response) => {
    if (!searchResults['imdbID']) {
      let container = document.querySelector(`#${id}`)
      container.parentNode.removeChild(container);
    }
  })
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
  if (id) {
    button = document.querySelector(`[id$="${id}"]`);
  } else {
    button = document.querySelector('.like-btn');
  }
  const like = button.textContent;
  if (loggedInUser.id) {
    if (like == whiteHeart) {
      button.textContent = blackHeart;
      putMovie();
    } else {
      button.textContent = whiteHeart;
      removeMovie(id);
    }
  } else {
    location.href = "/login/"
  }

}