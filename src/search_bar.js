
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

var colors = ["red", "blue", "green", "yellow", "pink", "orange", "purple"];


document.addEventListener('DOMContentLoaded', () => {
    const searchbar = document.getElementById('search');
    const earth = document.getElementById('globe');
    const links = document.querySelectorAll('.links');
    const line = document.querySelector('.line')

    searchbar.addEventListener("submit", (e) => {
        e.preventDefault()
        // console.log(returnedTarget)
        let query = document.getElementById('query');
        fetchData(query.value);

        let randColor = colors[Math.floor(Math.random() * colors.length)];

        earth.setAttribute("style", `filter: drop-shadow(0 0 0.75rem ${randColor.toString()}`);
        line.setAttribute("style", `filter: drop-shadow(0 0 0.75rem ${randColor.toString()}`);
        links.forEach(link => link.setAttribute("style", `filter: drop-shadow(1px 1px 1mm ${randColor.toString()}`));
    })

});

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
                    
                    let newdate = new Date(event.datetime);


                    return `
                        <div class="event-deets">
                            <div>${String(newdate).slice(4, 15)}<div>
                            <div>Location: ${event.venue.city} ${event.venue.region},${event.venue.country}</div>
                            <div>Venue: ${event.venue.name}</div>
                            <p>
                        </div> `
                }
            }).join('');
            
            document.getElementById('event-data')
                .insertAdjacentHTML("afterbegin", events);
        });
}







