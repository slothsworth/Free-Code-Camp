$(document).ready(function() {

  // find user geolocation
  $.get("http://ipinfo.io", function(response) {
    console.log(response.ip, response.country);
    var city = response.city;
    var country = response.country;

    //change temp from k to f or c
    if (country === "US") {
      var units = "imperial";
      var code = "F°";
      var speed = "mph";
    } else {
      var units = "metric";
      var code = "C°";
      var speed = "meters per second";
    }

    // create GET for weather response
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=" + units, function(data) {

      // define variables after receiving JSON data. 
      // var required: location, temp, icon, description, wind speed & direction
      var weatherIcon = data.weather[0].icon;
      var temp = data.main.temp;
      var location = data.name;
      var description = data.weather[0].description;
      var windSpeed = data.wind.speed;
      var windDeg = data.wind.deg;

      //change temperature 
      $("#temp").text(temp + code);

      //change location on button 1
      $("#location").text(location);

      //change description on button 2
      $("#description").text(description);

      //direction of wind
      if (windDeg >= 0 && windDeg < 20) {
        windDeg = "N"
      } else if (windDeg >= 20 && windDeg < 70) {
        windDeg = "NE";
      } else if (windDeg >= 70 && windDeg < 110) {
        windDeg = "E";
      } else if (windDeg >= 110 && windDeg < 160) {
        windDeg = "SE";
      } else if (windDeg >= 160 && windDeg < 200) {
        windDeg = "S";
      } else if (windDeg >= 200 && windDeg < 250) {
        windDeg = "SW";
      } else if (windDeg >= 250 && windDeg < 290) {
        windDeg = "W";
      } else if (windDeg >= 290 && windDeg < 340) {
        windDeg = "NW";
      } else {
        windDeg = "N";
      }

      //change wind on button 3
      $("#wind").text("Winds: " + windSpeed + " " + speed + " " + windDeg);

      //Responsive background image depending on user location.
      var bg = "url('https://41.media.tumblr.com/caf73cb2c4ed1ec5783cd954dee286ce/tumblr_nklusmFnOI1t7xuqto1_1280.jpg')";
      
     
      $("body").css("background", bg);

      //Responsive weather icon image depending on weather API response (weatherStatus var)
      $("#weather_icon").attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");
    });
  }, "jsonp");
});