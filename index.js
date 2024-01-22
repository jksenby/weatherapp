const form = document.querySelector("#cityForm");
const weatherInfo = document.querySelector("#weatherInfo");
const cityName = document.querySelector("#cityName");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherInfo.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const getResource = async () => {
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${
        cityName.value
      },&limit=${5}&appid=${_apiKey}`;
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const getData = async () => {
    const data = await getResource();
    return data;
  };

  getData().then((res) => {
    const astana = res[0];
    const getResource = async () => {
      try {
        const url = `api.openweathermap.org/data/2.5/forecast/daily?lat=${astana.lat}&lon=${astana.lon}&cnt=7&appid=${_apiKey}`;
        const response = await fetch(url, options);
        if (!response.ok)
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("The name of the city is wrong");
      }
    };
    const getData = async () => {
      const data = await getResource();
      return data;
    };
    getData().then((res) => {
      console.log(res);
      function formatTimeDifference(timeDifferenceInSeconds) {
        let timeDifferenceInMillis = timeDifferenceInSeconds * 1000;

        let currentDate = new Date();

        currentDate.setTime(currentDate.getTime() + timeDifferenceInMillis);

        let day = currentDate.getUTCDate();
        let month = currentDate.getUTCMonth();
        let hours = currentDate.getUTCHours();
        let minutes = currentDate.getUTCMinutes();

        day = day < 10 ? "0" + day : day;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        var monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        return day + " " + monthNames[month] + " " + hours + ":" + minutes;
      }

      const time = formatTimeDifference(res.timezone);

      weatherInfo.innerHTML = res
        ? /*html*/ `
        <img src="https://openweathermap.org/img/wn/${
          res.weather[0].icon
        }@2x.png" alt="weather icon">
        <h2>${res.name}</h2>
        <h3>${res.weather[0].main}</h3>
        <h4>${res.weather[0].description}</h4>
        <h5>${time}</h5>
        <p>Temperature: ${(+res.main.temp - 273.15).toFixed(1)}°C</p>
        <p>Feels like: ${(+res.main.feels_like - 273.15).toFixed(1)}°C</p>
        <p>Humidity: ${+res.main.humidity}%</p>
    `
        : /*html*/ `<h2>We couldn't find such place. Maybe you have mistaken</h2>`;
    });
  });
});
