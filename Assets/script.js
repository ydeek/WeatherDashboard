
let city = "";
let url = "";
let APIkey = "";
let queryurl = "";
let currenturl = "";
let citiesDiv = document.getElementById("searched_cities_container");
//start with empty array
let cities = [];
init();


//run function to pull saved cities from local storage and fill array with it
function init() {
    let savedCities = JSON.parse(localStorage.getItem("cities"));

    if (savedCities !== null) {
        cities = savedCities
    }

    renderButtons();
}

//sets localstorage item to cities array 
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}


//render buttons for each element in cities array as a search history for user
function renderButtons() {
    citiesDiv.innerHTML = "";
    if (cities == null) {
        return;
    }
    let unique_cities = [...new Set(cities)];
    for (let i = 0; i < unique_cities.length; i++) {
        let cityName = unique_cities[i];

        let buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "listbtn");

        citiesDiv.appendChild(buttonEl);

    }
}
//on click function for search history buttons

$(".listbtn").on("click", function (event) {
    console.log("anybody home?")
    event.preventDefault();
    console.log("hello?");
    city = $(this).text().trim();
    APIcalls();
})




//on click function for main search bar
function searchClicker() {
    city = $("#searchTerm").val().trim()
    console.log(city)
    //push the city user entered into cities array 
    cities.push(city);
    //make sure cities array.length is never more than 8 
    if (cities.length > 8) {
        cities.shift()
    }
    //return from function early if form is blank
    if (city == "") {
        return;
    }
    APIcalls(city);
    storeCities();
    renderButtons();
}

$("#searchBtn").on("click", function () {
    searchClicker()
})

//runs  API calls, one for current weather data and one for five-day forecast, then populates text areas
const APIcalls = (city) => {

    APIkey = "e003e884a673c8994a9d786afd4dcdc8"
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
    })
        .then(function (locationInfo) {
            console.log(locationInfo)

            full_url = `https://api.openweathermap.org/data/2.5/onecall?&lat=${locationInfo.coord.lat}&lon=${locationInfo.coord.lon}&appid=${APIkey}`
            console.log(full_url)
            $("#name_of_city").text("Today's Weather in " + city);
            $.ajax({
                method: "GET",
                url: full_url,
            }).then(function (response) {
                let day_number = 0;
                console.log(response)
                //iterate through the 40 weather data sets
                for (let i = 0; i < response.daily.length; i++) {
                    console.log(response.daily[i]) //look at movie activity 6-10 (movie)

                }
            });
        })
}

function getCurrentConditions(response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // get and set the content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

}


