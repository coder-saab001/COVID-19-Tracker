function updateMap(){
    fetch("https://www.trackcorona.live/api/countries")
    .then(response=>response.json())
    .then(rsp=>{
        // console.log(rsp.data);
        rsp.data.forEach(element => {
            latitude=element.latitude;
            longitude=element.longitude;
            cases=element.confirmed;
            if(cases>10000000) color=255;
            else if(cases>1000000) color=200;
            else if(cases>100000) color=170;
            else color=0+(cases/100000)*170;

            const tex=`<div class="pop"><pre><h1>${element.location}</h1>
            <img id="flag" src="https://www.countryflags.io/${element.country_code}/flat/48.png">
<span id="confirmed">Confirmed: ${cases.toLocaleString()}</span>
<span id="dead">Dead          : ${element.dead.toLocaleString()}</span>
<span id="recovered">Recovered: ${element.recovered.toLocaleString()}</span></pre></div>`;
            //Mark on the map
            const marker=new mapboxgl.Marker({
                color: `rgb(${color}, 0, 0)`
            })
            .setLngLat([longitude, latitude])
            .addTo(map)
            .setPopup(new mapboxgl.Popup().setHTML(tex));
            // marker.togglePopup();
        });
    })
}

let interval=200000;
setInterval(updateMap, interval);
updateMap();
