import { fetchWeatherData } from "."
import { lastLocationInput } from "."

const resultsDiv = document.querySelector(".results")
const addressText = document.querySelector("#address")
const conditionText = document.querySelector("#condition")
const resultsImg = document.querySelector(".results__img")
const tempText = document.querySelector(".results__temp")
const unitToggle = document.querySelector(".unit-toggle")
const buttons = [...unitToggle.children]
const tempHighText = document.querySelector("#high")
const tempLowText = document.querySelector("#low")
const feelsText = document.querySelector("#feels")
const humidityText = document.querySelector("#humidity")
const precipText = document.querySelector("#precip")

async function showInfo({
  resolvedAddress,
  temp,
  tempmax,
  tempmin,
  feelslike,
  humidity,
  precip,
  conditions,
  icon,
}) {
  addressText.textContent = resolvedAddress
  conditionText.textContent = conditions
  const imageSrc = await import(`./assets/icons/${icon}.svg`)
  resultsImg.src = imageSrc.default
  tempText.textContent = temp + "°"
  tempHighText.textContent = tempmax + "°"
  tempLowText.textContent = tempmin + "°"
  feelsText.textContent = feelslike + "°"
  humidityText.textContent = `${humidity ?? "0"}%`
  precipText.textContent = `${precip ?? "0"}%`

  resultsDiv.className = "results"
}

function getIsCelciius() {
  for (const button of buttons) {
    return (
      button.classList.contains("button--active") && button.value === "true"
    )
  }
}

async function changeUnit(isCelcius) {
  const weatherData = await fetchWeatherData(lastLocationInput, isCelcius)
  showInfo(weatherData)
}

unitToggle.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    if (e.target.classList.contains("button--active")) return

    buttons.forEach((el) => {
      el.classList.remove("button--active")
    })
    e.target.classList.add("button--active")
    changeUnit(e.target.value === "true")
  }
})

export { showInfo, getIsCelciius }
