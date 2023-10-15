const apikey = "3141b8052df97924c6f3c86f40270deb";

const weatherDataEL = document.getElementById("weather-data");

const cityInputEL = document.getElementById("city-input");


const formEL = document.querySelector("form");

formEL.addEventListener("submit", (event)=>{
  event.preventDefault();
  const cityValue = cityInputEL.value;
  getWeatherData(cityValue);
  });

async function getWeatherData(cityValue){
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

    if(!response.ok){
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    const temperature = Math.round(data.main.temp)

    const description = data.weather[0].description

    const icon = data.weather[0].icon

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ]

    weatherDataEL.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png"
    alt="weather icon">`;
    weatherDataEL.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEL.querySelector(".description").textContent = description;

    weatherDataEL.querySelector(".details").innerHTML = details.map((detail)=>
    `<div>${detail}</div>`)
    .join("");
    }catch (error) {

  }
}