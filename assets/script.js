//declared variables
var city = "";
var url = "";
var APIkey = "";
var queryurl = "";
var currenturl = "";
var citiesDiv = document.getElementById("searched_cities_container");
// started with an empty array 
var cities = [];
init();


function init() {
    var savedCities = JSON.parse(localStorage.getItem("cities"));

    if (savedCities !== null) {
        cities = savedCities
    }

    renderButtons();
}


function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}


function renderButtons() {
    citiesDiv.innerHTML = "";
    if (cities == null) {
        return;
    }
    var unique_cities = [...new Set(cities)];
    for (var i = 0; i < unique_cities.length; i++) {
        var cityName = unique_cities[i];

        var buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "listbtn");

        citiesDiv.appendChild(buttonEl);

    }
}
//function for search history buttons

$(".listbtn").on("click", function (event) {
    console.log("anybody home?")
    event.preventDefault();
    console.log("hello?");
    city = $(this).text().trim();
    APIcalls();
})




//Function for main search 
function searchClicker() {
    city = $("#searchTerm").val().trim()
    console.log(city)


    if (cities.length > 8) {
        cities.shift()
    }

    if (city == "") {
        return;
    }
    APIcalls(city);
    cities.push(city);
    storeCities();
    renderButtons();
}

$("#searchBtn").on("click", function () {
    searchClicker()
})

//APIs calls for curent weather and other weather information. 
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
                var day_number = 0;
                console.log(response)
                for (var i = 0; i < response.daily.length; i++) {
                    console.log(response.daily[i])

                }
            });
        })
}

function getCurrentConditions(response) {

    // convert tempreture to F 
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();


    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // this for add to the page 
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

}


