var mymap = L.map('mapid').setView([64.8678199983269, 27.67511714732133], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
tileSize: 512,
maxZoom: 9,
minZoom: 5,
zoomOffset: -1,
id: 'mapbox/streets-v11',
accessToken: '<accesstoken>'
}).addTo(mymap);

var hikeIcon = L.icon({
    iconUrl: 'kuvat/hiking.png',                                
    iconSize:     [32, 32], // size
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor:  [-32, -32] // point from which the popup should open relative to the iconAnchor
});

async function getParks() {
    let url = 'kanspuistot.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderParks() {
    let puistot = await getParks();
    console.log(puistot);

    puistot.forEach(puisto => {
        
        let marker = L.marker([puisto.lat, puisto.lng], {icon: hikeIcon}).addTo(mymap);

        var popup = L.popup();

        function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent(`<h2>${puisto.nimi}</h2><b><p>Reitit:</b> ${puisto.reitit}</p><b><p>Aktiviteetit:</b> ${puisto.aktiviteetti}<br><b>Osoite:</b> ${puisto.osoite}<br><b>Web:</b> <a href=${puisto.web}>${puisto.web}</a>`)
            .openOn(mymap);            
        };

        marker.on('click', onMapClick);
        
    });
};
    
renderParks(); 