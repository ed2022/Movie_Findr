var userZipcodeField = document.getElementById("user-zipcode");
var zipcodeSearchBttn = document.getElementById("zipcode-search-bttn");
var movieCardSection = document.querySelector("#movie-card-section");
var userZipcode;

var currentDay = moment().format("YYYY-MM-DD");

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
        moviePosterImg = document.createElement("img");
        moviePoster.appendChild(moviePosterImg);
        var posterUrl = ""

        var movieCardHeader = document.createElement("div");
        movieCardHeader.setAttribute("class", "card-header");
        var movieCardHeaderTitle = document.createElement("div");
        movieCardHeaderTitle.setAttribute("class", "card-header-title");
        movieCardHeaderTitle.textContent = data[i].title;
        movieCard.appendChild(movieCardHeader);
        movieCardHeader.appendChild(movieCardHeaderTitle);
    }
}

function getApi() {
    getZipcode()
    var graceNoteUrl = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + currentDay + "&zip=" + userZipcode + "&radius=10&api_key=2h2a8gu4hfm3rwc3y963cmkm"

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