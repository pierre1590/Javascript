
// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const feelElement = document.querySelector(".feel p");
const pressureElement = document.querySelector(".pressure span");
const humidityElement = document.querySelector(".humidity span");
const windSpeedElement = document.querySelector(".wind_speed span ");
const windDegElement = document.querySelector(".wind_deg span");
const descrElement = document.querySelector(".descr");
const notificationElement = document.querySelector(".notification");
const tempMax = document.querySelector(".tempMax span");
const tempMin = document.querySelector(".tempMin span");
const cF = document.querySelector(".celsfar input");
const sunRise = document.querySelector(".sunrise span ");
const sunSet = document.querySelector(".sunset span");
const timeCity = document.querySelector(".timeCity");



// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
};


// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = '0fcc183ed08bd13e496e5445fc167de6';

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
    cb(latitude, longitude);
  
}

    

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}




// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
   
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.temp_max =Math.floor (data.main.temp_max - KELVIN);
            weather.temp_min =Math.floor (data.main.temp_min - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.pressure = data.main.pressure;
            weather.humidity = data.main.humidity;
            weather.wind_speed =Math.floor(data.wind.speed*3.6);
            weather.wind_deg = data.wind.deg;
            weather.sunrise = data.sys.sunrise;
            weather.sunset = data.sys.sunset;
            weather.timezone = data.timezone;
            
           
           
        })
        .then(function(){
            
            let tz = (weather.timezone)/3600;
            let snrise = weather.sunrise;
            let snset = weather.sunset; 
            let dt = moment().utc().add(tz,'hours').format("dddd, MMMM Do YYYY");
            let date = document.querySelector('.date');
            let t = moment.utc().add(tz,'hours').format('hh:mm A '+tz+ ' z');       
            sunSet.innerHTML = snset ? moment.unix(snset).format('hh:mm A') : 'Not Available';
            sunRise.innerHTML = snrise ? moment.unix(snrise).format('hh:mm A') : 'Not Available';
            timeCity.innerHTML = t; 
            date.textContent = dt;
            displayWeather();
            cb();
        });
        
    }



    
        
    
    


// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="/public/icons/${weather.iconId}.png"/>`;
    feelElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descrElement.innerHTML = weather.description;
    cityElement.style.color = 'black';
    cityElement.innerHTML  = `${weather.city} , ${weather.country}`;
    pressureElement.innerHTML = `${weather.pressure}<span> hPa</span>`;
    humidityElement.innerHTML = `${weather.humidity}<span> %</span>`;
    windSpeedElement.innerHTML = `${weather.wind_speed}<span> Km/h</span>`;
    windDegElement.innerHTML = `${weather.wind_deg}<span>° ${nameWind()}</span>`;
    tempMax.innerHTML = `${weather.temp_max}<span>°C</span>`;
    tempMin.innerHTML = `${weather.temp_min}<span>°C</span>`;
   
    
    
    
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

function kmtoMph(wind_speed){
    return (wind_speed/1.609344);
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
cF.addEventListener("click", function(){
    if((weather.temperature.value)  === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        let fahrenheit1 = celsiusToFahrenheit(weather.temp_max);
        let fahrenheit2 = celsiusToFahrenheit(weather.temp_min);
        let mph = kmtoMph(weather.wind_speed);
        
        fahrenheit = Math.floor(fahrenheit);
        fahrenheit1 = Math.floor(fahrenheit1);
        fahrenheit2 = Math.floor(fahrenheit2);
        mph = Math.floor(mph);

        
        feelElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        tempMax.innerHTML = `${fahrenheit1}°<span>F</span>`;
        tempMin.innerHTML = `${fahrenheit2}°<span>F</span>`;
        windSpeedElement.innerHTML = `${mph}<span> mph</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        feelElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        tempMax.innerHTML = `${weather.temp_max}°<span>C</span>`;
        tempMin.innerHTML = `${weather.temp_min}°<span>C</span>`;
        windSpeedElement.innerHTML = `${weather.wind_speed}<span> km/h</span>`;
        weather.temperature.unit = "celsius"
    }
});







// SHOW TIME
   function Clock (){
    let time = document.querySelector('.time span');
    let hour = new Date();
    time.textContent =  getHour(hour)+':'+ getMinute(hour)+amPm(hour);
    setTimeout('Clock()',1000);
   }
  
   function amPm(time){
       if (getHour(time)<12){
           return " AM";
       }else{
           return " PM";
       }
   }

   function getHour(time) {
       let h = ("0" + time.getHours()).slice(-2);
       return h;

   }

    function getMinute(time){
    let min = ("0" + time.getMinutes()).slice(-2);
    return min;

}


// GET WEATHER FROM SEARCH BAR

 btn_search.onclick = function() {
     
    let city = document.getElementById('city').value;
   
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;


   
   
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
   
    .then(function(data){
        
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.temp_max = Math.floor(data.main.temp_max - KELVIN);
        weather.temp_min = Math.floor(data.main.temp_min - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.pressure = data.main.pressure;
        weather.humidity = data.main.humidity;
        weather.wind_speed = Math.floor(data.wind.speed*3.6);
        weather.wind_deg = data.wind.deg;
        weather.timezone = data.timezone;
        weather.dt = data.dt;
        weather.sunrise = data.sys.sunrise;
        weather.sunset = data.sys.sunset;
    })
    .then(function(){ 
        let tz = (weather.timezone)/3600;
        let snrise = weather.sunrise;
        let snset = weather.sunset; 
        let dt = moment().utc().add(tz,'hours').format("dddd, MMMM Do YYYY");
        let date = document.querySelector('.date');
        let t = moment.utc().add(tz,'hours').format('hh:mm A '+tz+ ' z');       
        sunSet.innerHTML = snset ? moment.unix(snset).utc().add(tz,'hours').format('hh:mm A') : 'Not Available';
        sunRise.innerHTML = snrise ? moment.unix(snrise).utc().add(tz,'hours').format('hh:mm A') : 'Not Available';
        timeCity.innerHTML = t; 
        date.textContent = dt;
        displayWeather();
    })
       .catch(error => {
       let nameCity = ('Ops, the city has not been found. Try again');
       cityElement.style.color='red';
       cityElement.innerHTML = nameCity;
       iconElement.innerHTML = `<img src="/public/icons/unknown.png"/>`;;
       feelElement.innerHTML =  `<span>-</span> `;
       descrElement.innerHTML =  `<span>-</span> `;
       pressureElement.innerHTML =  `<span>-</span> `;
       humidityElement.innerHTML =  `<span>-</span> `;
       windSpeedElement.innerHTML =  `<span> Km/h</span> `;
       windDegElement.innerHTML =  `<span>-</span> `;
       tempMax.innerHTML = `°<span>C</span>`;
       tempMin.innerHTML = `°<span>C</span>`;
       sunRise.innerHTML = `<span>-</span>`;
       sunSet.innerHTML = `<span>-</span>`;
       timeCity.innerHTML = `<p>-</p>`; 
})
}




function getLocation() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
       latitude = position.coords.latitude;
       longitude = position.coords.longitude;
       
       getWeather(latitude, longitude);
       cb(latitude, longitude,display_name);
       
    });
 } else {
      console.log("Geolocation is not supported by this browser.");
    }
}

function nameWind(){
    if (weather.wind_deg === 0) {
        return "N Tramontana";
    }else{
        if ((weather.wind_deg > 0) && (weather.wind_deg <= 22.5)){
            return "NNE Bora";
        }else{
            if ((weather.wind_deg > 22.5) && (weather.wind_deg <= 45)){
                return "NE Grecale";
            }else{
                if((weather.wind_deg > 45) && (weather.wind_deg <= 67.5)){
                    return "ENE Slave";
                }else{
                    if ((weather.wind_deg > 67.5)&& (weather.wind_deg <= 90)){
                        return "E Levant";
                    }else{
                        if((weather.wind_deg > 90) && (weather.wind_deg <=112.5)){
                            return "ESE Solano";
                        }else{
                            if ((weather.wind_deg > 112.5) && (weather.wind_deg <= 135)){
                                return "SE Sirocco";
                            }else{
                                if((weather.wind_deg > 135) &&(weather.wind_deg <= 157.5)){
                                    return "SSE Africo";
                                }else{
                                    if((weather.wind_deg > 157.5) && (weather.wind_deg <= 180)){
                                        return "S Ostro";
                                    }else{
                                        if ((weather.wind_deg > 180) &&(weather.wind_deg <= 202.5)){
                                            return "SSW Gauro";
                                        }else{
                                            if((weather.wind_deg > 202.5) && (weather.wind_deg <= 225)){
                                                return "SW Libeccio";
                                            }else{
                                                if((weather.wind_deg > 225) && (weather.wind_deg <= 247.5)){
                                                    return "WSW Ethesia";
                                                }else {
                                                    if((weather.wind_deg > 247.5) && (weather.wind_deg <= 270)){
                                                        return "W Ponente";
                                                    }else{
                                                        if((weather.wind_deg > 270) && (weather.wind_deg <= 292.5)){
                                                            return  "WNW Traversone";
                                                        }else{
                                                            if((weather.wind_deg > 292.5) && (weather.wind_deg <= 315)){
                                                                return  "NW Mistral";
                                                            }else{
                                                                if((weather.wind_deg > 315) && (weather.wind_deg <=337.5)){
                                                                    return "NNW Zephyr"; 
                                                                }else{
                                                                    if((weather.wind_deg >337.5) && (weather.wind_deg <=360)){
                                                                        return "N Tramontana";
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } 
                    }
                }
            }
    }
    }
}

// center, zoom, and maxZoom of the map
var center = [0, 0],
  zoom = 4,
  moreZoom = 12,
  maxZoom = 22

// get location using the Geolocation interface
var geoLocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
}

var myLat, myLng,  display_name, myMarker

function cb(data) {
    
  if(data.display_name){
      display_name = data.display_name;
  }
  myMarker.addTo(map)
    .bindPopup(`<b>Your location</b><br/>
                   Lat: ${convertLatDecToDMS(myLat)}<br/> 
                   Long: ${convertLongDecToDMS(myLng)}<br/> 
                Your address:<br>
                   ${display_name} <br>
                    
                 `).openPopup()

}

function success(position) {

  myLat = position.coords.latitude.toFixed(6);
  myLng = position.coords.longitude.toFixed(6);
  
  latLng = [myLat, myLng];
  map.setZoom(moreZoom);
  map.panTo(latLng);

  var script = document.createElement('script')
  script.id = 'nominatim'
  script.async = true // This is required for asynchronous execution
  script.src = 'https://nominatim.openstreetmap.org/reverse?json_callback=cb&format=json&lat=' + myLat + '&lon=' +
    myLng + '&zoom=27&addressdetails=1'
  document.body.appendChild(script)
  myMarker = L.marker(latLng)
  document.body.removeChild(script)
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}

navigator.geolocation.getCurrentPosition(success, error, geoLocationOptions)



// create the map
var map = L.map('map', {
  contextmenu: true,
  contextmenuWidth: 140,
  contextmenuItems: [{
      text: 'Center map here',
      callback: centerMap
    },
    {
      text: 'Add marker here',
      callback: addMarker
    }
  ]
}).setView(center, zoom)


// set up the OSM layer
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoom
  }).addTo(map)


// function to center map
function centerMap(e) {
  map.panTo(e.latlng)
}

// function to add marker
function addMarker(e) {
  L.marker(e.latlng).addTo(map)
}


function convertLatDecToDMS(myLat) {
  let latAbs = Math.abs(myLat);
  let degrees = Math.floor(latAbs);
  let minutes = Math.floor((latAbs - degrees) * 60);
  let seconds = ((((latAbs - degrees) * 60) - minutes) * 60);
  let cardinalDir = ((myLat >= 0) ? 'N' : 'S');
  return `${degrees}° ${minutes}' ${seconds.toFixed(3)}" ${cardinalDir}`;
}

function convertLongDecToDMS(myLng) {
    let longAbs = Math.abs(myLng);
    let degrees = Math.floor(longAbs);
    let minutes = Math.floor((longAbs - degrees) * 60);
    let seconds = ((((longAbs - degrees) * 60) - minutes) * 60);
    let cardinalDir = ((myLng >= 0) ? 'E' : 'W');
    return `${degrees}° ${minutes}' ${seconds.toFixed(3)}" ${cardinalDir}`;
  }

 