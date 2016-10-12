# weather_app

### Scope

- Create a weather app that shows the current weather at the user's location or at any other requested place around the globe.

- Track current user location based on ip address using the IP API.

- Fetch weather data using the OpenWeatherMap API and build app using jQuery and [weather icons by Erik Flowers](https://erikflowers.github.io/weather-icons/). 

- Show temperature in Celsius or Fahrenheit degrees.

###### *Notes*

-App deployed on gh-pages but doesn't work properly as github is served on https connection and openweathermap API is served on http connection (service on https only for professional accounts).

-As of recently, the Geolocation object that gives Web content access to the location of the device through the browser is not applicable on http connections but only on secure https connections. There are other available APIs that can track location based on IP address (similarly to the API used in this project). 

-This project is part of the FreeCodeCamp front-end course. 
