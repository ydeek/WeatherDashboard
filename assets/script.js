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
const input = document.getElementById('city');
const button = document.getElementById('submit');

button.addEventListener('click', () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&APPID=8c58cdf09921e64f4e1a85cf405d8398&units=metric')
        .then(resp => resp.json())
        .then(data => {

            let div = document.createElement('div');
            let weather1 = document.querySelector('#result-api');
            weather1.innerHTML = '';
            div.innerHTML = '<p>' + 'City: ' + '<span>' + data.name + '</span>' + '</p>' +
                '<p>' + 'Country: ' + '<span>' + data.sys.country + '</span>' + '</p>' +
                '<p>' + 'Temperature: ' + '<span>' + data.main.temp + '&#8451;' + '</span>' + '</p>' +
                '<p>' + 'Humidity: ' + '<span>' + data.main.humidity + '</span>' + '</p>' +
                '<p>' + 'Weather: ' + '<span>' + data.weather[0].main + '</span>' + '</p>' +
                '<p>' + 'Description: ' + '<span>' + data.weather[0].description + '</span>' + '</p>';


            weather1.appendChild(div).style.border = '1px solid lightblue';
        })
        .catch(err => document.getElementById('result-api').innerHTML = "error!")
})


