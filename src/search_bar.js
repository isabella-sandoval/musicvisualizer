
// import {returnedTarget} from "globe.js"
let rangeInput = document.querySelector(".range-input input");
let rangeValue = document.querySelector(".range-input .value div");
let returnedTarget = document.querySelector(".globe-content canvas")

rangeValue.innerHTML = rangeInput.value

rangeInput.onChange 

rangeInput.oninput = function(){
    let list = document.getElementById("event-data")
    while(list.lastChild){
        list.removeChild(list.lastChild)
    }
    rangeValue.innerHTML = this.value
    currentyear = rangeValue.innerHTML
}


function fetchData(query) {
    fetch(`https://rest.bandsintown.com/artists/${query}/events/?app_id=ebdae322684828c0dd45547f79fc27df&date=2010-01-01%2C2021-01-01`)
        .then(res => {
            if (!res.ok) {
                throw Error("artist does not exist")
            }
            return res.json()
        }).then(data => {
            returnedTarget["features"] = returnedTarget["features"].slice(0, 127)

            var events = Object.values(data).map(event => {
                if (`${event.datetime}`.startsWith(currentyear)) {

                    var eventLat = event.venue.latitude
                    var eventLong = event.venue.longitude
                    var venueName = event.venue.name

                    feature = {}
                    feature['type'] = 'Feature'

                    feature["properties"] = {
                        'title': venueName,
                    }
                
                    feature['geometry'] = {
                        'type': 'Point',
                        'coordinates': [eventLong, eventLat],
                    }

                    returnedTarget['features'].push(feature)

                    return `
                    <div class="event-deets">
                        <div>Date:${event.datetime}<div>
                        <div>Venue: ${event.venue.name}</div>
                        <div>Location: ${event.venue.city} ${event.venue.region},${event.venue.country}</div>
                        <div>Lineup:${event.lineup}<div></div>
                        
                        <p>
                       
                    </div> `

                }
            }).join('');
            document.getElementById('event-data')
                .insertAdjacentHTML("afterbegin", events);
        })
}





document.addEventListener('DOMContentLoaded', () => {
    const searchbar = document.getElementById('search');

    searchbar.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(returnedTarget)
        let query = document.getElementById('query');

        let results = fetchData(query.value);

    })

});

