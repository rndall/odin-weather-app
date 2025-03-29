import "./assets/reset.css"
import key from "./key"

async function fetchWeatherData(location, isCelcius) {
  const base =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
  const url = `${base}${location}?key=${key}${
    isCelcius ? "&unitGroup=metric" : ""
  }`
  try {
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

fetchWeatherData("london", true)
