const btn = document.querySelector(".btn");
const locationInfo = document.querySelector(".locationInfo");
const APIkey = "31af3ad47b414743a46100602211504";
async function fetchData() {
  let city = locationInfo.value;
  let url =
    "https://api.weatherapi.com/v1/current.json?key=" +
    APIkey +
    "&q=" +
    city +
    "&aqi=yes";
  let response = await fetch(url);
  let rdata = await response.json();

  if (rdata.hasOwnProperty("error")) {
    //handle error
    document.querySelector(".info").classList.add("hidden");
    document.querySelector(".error h1").innerHTML = rdata.error.message
    document.querySelector(".error").classList.remove("hidden");
  } else {
    console.log(rdata)
    let airQuality = rdata.current.air_quality.pm10.toFixed(2);
    let icon = "";
    if (airQuality <= 50) icon = "😁";
    else if (airQuality <= 100) icon = "😊";
    else if (airQuality <= 150) icon = "😐";
    else if (airQuality <= 200) icon = "😷";
    else if (airQuality <= 300) icon = "🤢";
    else icon = "💀";
    document.querySelector(".error").classList.add("hidden");
    document.querySelector(".cityName").innerHTML = rdata.location.name +", "+rdata.location.country
    document.querySelector(".temp").innerHTML = "Temperature: " + rdata.current.temp_c + " °C"
    document.querySelector(".aqi").innerHTML = "Air Quality: "+rdata.current.air_quality.pm10.toFixed(2)+"pm " + icon
    document.querySelector(".info").classList.remove("hidden");
  }
}

btn.addEventListener("click", fetchData);
locationInfo.addEventListener("change", ()=>{
    document.querySelector(".error").classList.add("hidden");
    document.querySelector(".info").classList.add("hidden");
});
