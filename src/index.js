import "./assets/css/reset.css"
import "./assets/css/style.css"
import key from "./key"
import { showInfo, getIsCelciius } from "./weather-card"

const form = document.querySelector("form")
const locationInput = document.querySelector("#location")
const resultsDiv = document.querySelector(".results")
const loading = document.querySelector(".loading")
let lastLocationInput

function showLoading() {
  resultsDiv.classList.add("results--hidden")
  loading.classList.remove("loading--hidden")
}

function removeLoading() {
  resultsDiv.classList.remove("results--hidden")
  loading.classList.add("loading--hidden")
}

async function fetchWeatherData(location, isCelcius) {
  const base =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
  const url = `${base}${location}?key=${key}${
    isCelcius ? "&unitGroup=metric" : ""
  }`
  try {
    showLoading()
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const data = await response.json()
    const weatherData = getWeatherData(data)
    return weatherData
  } catch (err) {
    console.error(err)
  } finally {
    removeLoading()
  }
}

function getWeatherData(data) {
  const { resolvedAddress, currentConditions, days } = data
  const { temp, feelslike, humidity, precip, conditions, icon } =
    currentConditions
  const { tempmax, tempmin } = days[0]
  return {
    resolvedAddress,
    temp,
    tempmax,
    tempmin,
    feelslike,
    humidity,
    precip,
    conditions,
    icon,
  }
}

async function submitForm(e) {
  e.preventDefault()

  if (!locationInput.value) return
  const weatherData = await fetchWeatherData(
    locationInput.value.trim(),
    getIsCelciius()
  )
  showInfo(weatherData)
  lastLocationInput = locationInput.value
  form.reset()
}
form.addEventListener("submit", submitForm)

export { lastLocationInput, fetchWeatherData }
