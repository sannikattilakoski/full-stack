function createDate() {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const hour = time.getHours();
    const minutes =(time.getMinutes()<10?'0':'') + time.getMinutes(); //kun minuutit ovat alle 10,lisätään eteen 0.   
    const year = time.getFullYear();

    return `${date}.${month + 1}.${year} klo ${hour}.${minutes}`
}

async function addPalaute() {
    let newPalaute = document.getElementById('newPalaute')
    let newName = document.getElementById('newName')
    let newPuisto = document.getElementById('newPuisto')
    const data = { 'text': newPalaute.value, 'name': newName.value, 'puisto': newPuisto.value, 'date': createDate()}
    const response = await fetch('http://localhost:3000/palautteet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let palaute = await response.json()
    let palauteList = document.getElementById('palauteList')
    let li = createPalauteListItem(palaute)   
    palauteList.insertBefore(li, palauteList.childNodes[0]); // lisää ensimmäiseksi
  
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = ''
    newPalaute.value = ''
  }

