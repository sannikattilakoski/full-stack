const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const api_key = '24c095de824800f129ede8e30b09e5b9'

getWeatherData()
function getWeatherData () {

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=60.29296&lon=24.55741&exclude=hourly,minutely&lang=fi&units=metric&appid=${api_key}`).then(res => res.json()).then(data =>{

        console.log(data)
        showWeatherData(data)
        })
    
    }

    function showWeatherData (data) {

    moment.locale('fi');

    let otherDayforecast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0) {
            currentTempEl.innerHTML = `
            <div class="other">
                <div class="day">Tänään</div>                                 
                <div class="temp">${day.temp.day}&#176;C</div>
                <div class="desc">${day.weather[0].description}</div> 
            </div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
            alt="weather icon" class="w-icon">
            `
        }else{
            otherDayforecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                alt="weather icon" class="w-icon">                 
                <div class="temp">${day.temp.day}&#176;C</div>
                
            </div> 
            `
        }
    })

    weatherForecastEl.innerHTML = otherDayforecast;

}

//tästä alkaa palaute

function init() {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Ladataan palautteita palvelimelta, odota...'
    loadPalautteet()
  }

async function loadPalautteet() {
  let response = await fetch('http://localhost:3000/palautteet')
  let palautteet = await response.json()
    console.log(palautteet)
  showPalautteet(palautteet)
}

function showPalautteet(palautteet) {
    let palauteList = document.getElementById('palauteList')
    let infoText = document.getElementById('infoText')
    if (palautteet.length === 0) {
      infoText.innerHTML = 'Ei palautteita'
    } else {    
      palautteet.forEach(palaute => {
          if(palaute.title === 'Nuuksio'){
          let li = createPalauteListItem(palaute)        
          //palauteList.appendChild(li)
          palauteList.insertBefore(li, palauteList.childNodes[0]);
      }})
      infoText.innerHTML = ''
    }
}

function createPalauteListItem(palaute) {
    // luodaan uusia elementtejä
    let p = document.createElement('p')
    let par = document.createElement('p')    
    let div = document.createElement('div') 
    let div2 = document.createElement('div') 
    let hr = document.createElement('hr')
      // luodaan uusia id-attribuutteja
    let p_attr = document.createAttribute('id')
    let par_attr = document.createAttribute('id') 
    let div_attr = document.createAttribute('id')
    let div2_attr = document.createAttribute('id') 
      // kiinnitetään palautteen id:n arvo luotuun attribuuttiin 
    p_attr.value= palaute._id
    // kiinnitetään id:n arvo luotuun attribuuttiin 
    par_attr.value="nickname"
    div_attr.value="feedback"
    div2_attr.value="time"
      // kiinnitetään attribuutit elementeihin
    p.setAttributeNode(p_attr)
    par.setAttributeNode(par_attr)
    div.setAttributeNode(div_attr)
    div2.setAttributeNode(div2_attr)
      // luodaan uusia tekstisolmuja, joka sisältävät palautteen tekstit
    let text = document.createTextNode(palaute.text)
    let name = document.createTextNode(palaute.name) 
    let title = document.createTextNode(palaute.title) 
    let date = document.createTextNode(palaute.date) 
      // lisätään teksti LI-elementtiin
    p.appendChild(text)
    par.appendChild(name)  
    div2.appendChild(date) 
    // lisätään elementit DIV-elementtin    
    div.appendChild(hr) 
    div.appendChild(p)
    div.appendChild(par)  
    div.appendChild(div2)  
    // palautetaan luotu DIV-elementti
    return div
}