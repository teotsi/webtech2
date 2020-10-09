const setEmailInProfile = () => {
    getLoggedInUser().then(value => {
        const email_header = document.getElementById("email_header");
        email_header.innerHTML = `Email: ${value.email}`;
    })
};
const getMovie = async movie => await (await fetch(movie, {
    credentials: 'include'
})).json();

const createMovieDetails = movie => {
    fetch(`${baseUrl}i=${movie['id']}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('movie-details', 'results-container')
            containerDiv.id = data['imdbID']
            containerDiv.innerHTML = `
        <p id="title"><span>${data['Title']}</span></p>
                <div class="flex-container">
                    <div class="mini-flex">
                        <img id="poster" src="${data['Poster']}" width=200 alt="poster" onerror="if (this.src !== 'no-image.jpg') this.src = 'no-image.jpg';">
                    </div>
                 
                    <div class="data">
                        <div id="rating-flex">
                            <div>
                                <p id="imdbRating" style="font-size: 2rem;">&#x2605;<span>${data['imdbRating']}</span>/10</p>
                            </div>
                            <button id="like-btn-${data['imdbID']}" class="like-btn" onclick="toggle('${data['imdbID']}')">Unsave &#x2665;</button>
                        </div>
                        <p id="type">Type: <span>${data['Type']}</span></p>
                        <p id="actors">Cast: <span>${data['Actors']}</span></p>
                        <p id="released">Year: <span>${data['Year']}</span></p>
                    </div>
                </div>
                <div id="plot-container">
                <p id="plot">Plot: <span id="plot-span">${data['Plot']}</span><span id="full-plot-span" class="hidden"></span></p>
                    <a id="more-${data['imdbID']}" onclick="toggleMore(this,'${data['Title']}')">More</a>
                </div>
        `;
            document.getElementById('bookmark-tab').appendChild(containerDiv);
        })
};

const setBookmarks = () => {
    fetch(loggedInUser.links[1]['href'], {
        credentials: 'include'
    }).then(response => response.json())
        .then(data => {
            for (const entry of data) {
                getMovie(entry['links'][0]['href'])
                    .then(response => createMovieDetails(response));
            }
        });
};

const loadData = () => {

    getLoggedInUser()
        .then(response => {
            console.log(response);
            if (response.status) {
                console.log(response);
                location.href = "/login/"
            } else {
                setEmailInProfile();
                setBookmarks();
            }
        });
};
