const resultsDiv = document.querySelector(".results")
const addressText = document.querySelector("#address")
const conditionText = document.querySelector("#condition")
const resultsImg = document.querySelector(".results__img")
const tempText = document.querySelector(".results__temp")
const celciusBtn = document.querySelector("#celcius")
const fahrenheitBtn = document.querySelector("#fahrenheit")
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
  humidityText.textContent = humidity + "%"
  precipText.textContent = precip + "%"

  resultsDiv.className = "results"
}

export default showInfo
