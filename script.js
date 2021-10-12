var userZipcodeField = document.getElementById("user-zipcode");
var zipcodeSearchBttn = document.getElementById("zipcode-search-bttn");
var movieCardSection = document.querySelector("#movie-card-section");
var userZipcode;
var modal = document.querySelector(".modal")

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
        var posterUrl = "https://wwfhc.org/wp-content/uploads/2020/12/provider-photo-placeholder-240x360-1.jpg"
        moviePosterImg.setAttribute("src", posterUrl);

        var movieCardHeader = document.createElement("div");
        movieCardHeader.setAttribute("class", "card-header");
        var movieCardHeaderTitle = document.createElement("div");
        movieCardHeaderTitle.setAttribute("class", "card-header-title");
        movieCardHeaderTitle.textContent = data[i].title;
        movieCard.appendChild(movieCardHeader);
        movieCardHeader.appendChild(movieCardHeaderTitle);

        var selectMovieButton = document.createElement("button");
        selectMovieButton.setAttribute("class", "button");
        selectMovieButton.classList.add("movie-select");
        selectMovieButton.innerHTML = "Pick this Movie!";
        movieCard.appendChild(selectMovieButton);

        var allSelectButtons = document.querySelectorAll(".movie-select");
        allSelectButtons[i].addEventListener('click', function(i) {
            console.log("you clicked element #" + i);
            openModal();
            document.querySelector(".modal-card-title").textContent = data[i].title;

        }.bind(null, i));
        // movieCardSection.children[i].onclick = function() {
        //     console.log(i);
        //     openModal();}  
    }

    var closeModalBttn = document.querySelector(".delete")
    closeModalBttn.addEventListener("click", function() {
       modal.classList.remove("is-active");
   })


}


function openModal() {
    console.log("hi");
    modal.classList.add("is-active");

}

function displayModalInfo() {
    for (var i = 0; i <movieCardAll.length; i++) {

    }
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
