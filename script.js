var userZipcodeField = document.getElementById("user-zipcode");
var zipcodeSearchBttn = document.getElementById("zipcode-search-bttn");
var movieCardSection = document.querySelector("#movie-card-section");
var userZipcode;
var modal = document.querySelector(".modal")
var searchQueryArray = []

var currentDay = moment().format("YYYY-MM-DD");
var movieShowtimeTable = document.getElementById("movie-showtime-info");
var moviePosterArray = document.getElementsByTagName("img");
var movieImgPathArray = []

console.log(currentDay)

function getZipcode() {
    userZipcode = userZipcodeField.value
    console.log(userZipcode);
}

function displayData(data){
    for (var i = 0; i < data.length; i++) {
        var movieCard = document.createElement("div");
        movieCard.setAttribute("class", "card");
        movieCardSection.appendChild(movieCard)
        
        moviePoster = document.createElement("figure");
        movieCard.appendChild(moviePoster);
        moviePoster.classList.add("image",  "is-240x360");
        moviePosterImg = document.createElement("img");
    


        // moviePoster.appendChild(moviePosterImg);
        

        var movieCardHeader = document.createElement("div");
        movieCardHeader.setAttribute("class", "card-header");
        var movieCardHeaderTitle = document.createElement("div");
        movieCardHeaderTitle.setAttribute("class", "card-header-title");
        movieCardHeaderTitle.classList.add("is-centered")
        movieCardHeaderTitle.textContent = data[i].title;
        movieCard.appendChild(movieCardHeader);
        movieCardHeader.appendChild(movieCardHeaderTitle);
        var movieCardFooter = document.createElement("div");
        movieCardFooter.classList.add("card-footer");
        movieCard.appendChild(movieCardFooter);

        var selectMovieButton = document.createElement("button");
        selectMovieButton.setAttribute("class", "button");
        selectMovieButton.classList.add("movie-select");
        selectMovieButton.innerHTML = "Pick this Movie!";
        movieCardFooter.appendChild(selectMovieButton);

        var allSelectButtons = document.querySelectorAll(".movie-select");

        allSelectButtons[i].addEventListener('click', function(i) {

            console.log("you clicked element #" + i);
            openModal();
            for (var j = 0; j < data[i].showtimes.length; i++){
                var tableRow = document.createElement("tr");
                movieShowtimeTable.appendChild(tableRow);
                var selectedTheater = document.createElement("th");
                var movieShowtime = document.createElement("th");

                tableRow.appendChild(selectedTheater);
                tableRow.appendChild(movieShowtime);

                selectedTheater.textContent = data[i].showtimes[j].theatre.name;
                movieShowtime.textContent = moment(data[i].showtimes[j].dateTime).format("h:mma");
                }
            document.querySelector(".modal-card-title").textContent = data[i].title; 
        }.bind(null, i));



        var headerArray = document.querySelectorAll(".card-header")
        var movieSearchQuery = headerArray[i].textContent
        searchQueryArray.push(movieSearchQuery);
        movieSearchUrl = "https://api.themoviedb.org/3/search/movie?api_key=9fb4cfc619ac245c369683b5ddd346ed&language=en-US&query=" + searchQueryArray[i] + "&page=1&include_adult=false"
        

        
        
        var tmdbCall = fetch(movieSearchUrl)
            .then (function (response) {
                return response.json()
            })
            .then (function (data) {
                return data.results[0].poster_path
            })
        var tmdbObject = async (i) => {
            var path = await tmdbCall
            var posterUrl = "https://image.tmdb.org/t/p/original/" + path;
            if (posterUrl === "undefined") {
                posterUrl = "https://wwfhc.org/wp-content/uploads/2020/12/provider-photo-placeholder-240x360-1.jpg.webp"
                movieImgPathArray.push(posterUrl)
                console.log(movieImgPathArray[i])
            } else {
            movieImgPathArray.push(posterUrl)
            console.log(movieImgPathArray[i])
            } 
            moviePosterArray[i].setAttribute("src", movieImgPathArray[i]);
            
            
        }
        tmdbObject(i)
        moviePoster.appendChild(moviePosterImg);
            

    }
    console.log(searchQueryArray)
    var closeModalBttn = document.querySelector(".delete")
    closeModalBttn.addEventListener("click", function() {
       modal.classList.remove("is-active");
   })


}

function openModal() {
    console.log("hi");
    modal.classList.add("is-active");

}

function getApi() {
    getZipcode()
    var graceNoteUrl = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + currentDay + "&zip=" + userZipcode + "&radius=10&api_key=nsptwt2vhe2syy8gx8n53fup"

    fetch(graceNoteUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)

        displayData(data)
    })
}




zipcodeSearchBttn.addEventListener("click", getApi);