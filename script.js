// 591e3bc3294673531fa97e0a413eb2ca
console.clear();
$(document).ready(function() {
  function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }

  $(".current-date").text(getDate());
  //http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=591e3bc3294673531fa97e0a413eb2ca

  // Get geolocation from IP address
  function getGeolocation() {
    return $.ajax({
      url: 'http://ip-api.com/json',
      type: "GET",
      dataType: "JSON"
    });
  }

  var selectedCity;
  var selectedUnits = 'metric';
  $('#temp-units').on('click', function() {
    if (selectedUnits == 'metric') {
      selectedUnits = 'imperial';
      console.log($('#temp-units').text());
      // $('#temp-units').text($('#temp-units').text().replace("F", "C"));
      processData();
    } else {
      selectedUnits = 'metric';
      // $('#temp-units').text($('#temp-units').text().replace("C", "F"));
      processData();
    }
  });

  function getWeatherData() {
    console.log("into getWeatherData" + selectedCity);
    if ($("select option:selected").text() == "Current location" && (!$('#custom-city-input').val())) {
      return getGeolocation().then(function(response) {
        var longitude = response.lon;
        var latitude = response.lat;
        return $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=' + selectedUnits + '&appid=591e3bc3294673531fa97e0a413eb2ca',
          type: "GET",
          dataType: "JSON"
        });
      });
    } else {
      return $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + selectedCity + '&units=' + selectedUnits + '&appid=591e3bc3294673531fa97e0a413eb2ca',
        type: "GET",
        dataType: "JSON"
      });
    }
  }

  function processData() {
    getWeatherData().then(function(response) {
      console.log("into then");
      console.log(response);
      // $('.weather-graphic img').attr('src', `http://openweathermap.org/img/w/${response.list[0].weather[0].icon}.png`);
      // // console.log(response.list[0].main.temp_min + " - " + response.list[0].main.temp_max + '&deg;' + (selectedUnits == 'metric')?'C':'F');
      console.log(response.list[0].main.temp_max);
      var temp = Math.round(response.list[0].main.temp);
      var location = response.city.name + ", " + response.city.country;
      if (selectedUnits == 'metric') {
        $('.cdeg').css({
          'color': '#EC810D',
          'font-weight': 'bold'
        });
        $('.fdeg').css({
          'color': 'black',
          'font-weight': 'normal'
        });
      } else {
        $('.fdeg').css({
          'color': '#EC810D',
          'font-weight': 'bold'
        });
        $('.cdeg').css({
          'color': 'black',
          'font-weight': 'normal'
        });
      }
      $('#temp-text').html(temp);
      $('h3#current-city').text(location);
      var weatherDescription = response.list[0].weather[0].description.replace(/\b[a-z]/g, x => x.toUpperCase())
      $('.description').text(weatherDescription);
      var daytime = (response.list[0].weather[0].icon[2] == 'n') ? 'night' : 'day';
      var weatherCode = response.list[0].weather[0].id;
      $('.weather-graphic>i').removeClass();
      $('.weather-graphic>i').addClass('wi wi-owm-' + daytime + '-' + weatherCode);

    });
  };

  if ($("select option:selected").text() == "Current location") {
    processData();
  }

  // select city from dropdown list
  $('select').on('change', function() {
    selectedCity = this.value;
    processData();
  })

  // type city
  $('#custom-city-input').keyup(function(evt) {
    if (evt.which == 13) {
      selectedCity = this.value;
      console.log("just typed a city!");
      processData();
      this.value = '';
    }
  })

});