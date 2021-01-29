
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
    
    fetch(`https://rest.bandsintown.com/artists/${query}/events/?app_id=88d19a898ccecc016e8e00885e4e7df9&date=2010-01-01%2C2021-01-01`)
    .then(res => {
        if (!res.ok) {
            throw Error("artist does not exist")
        }
        return res.json()
    }).then(data => {
            // console.log(geojson["features"])
            // returnedTarget["features"]
            returnedTarget["features"] = returnedTarget["features"].slice(0,127)
            
            var events = Object.values(data).map(event=> {
                // console.log(event)
                if(`${event.datetime}`.startsWith(currentyear)){
                    
                    var eventLat = event.venue.latitude
                    var eventLong = event.venue.longitude
                    // var myStyle = {
                    //     "color": "#ff7800",
                    //     "weight": 5,
                    //     "opacity": 0.65
                    // };

                    feature = {}
                    feature['type'] = 'Feature'
                    feature['geometry'] = {
                        'type': 'Point',
                        'coordinates': [eventLong, eventLat],
                        
                    }
                    feature['style'] = {
                        'fill': '#ff7800'  
                    }
                    feature['class']= {
                        "baseVal": "geo_point",
                        "stroke-width": "3",
                        "fill-opacity": 0.6
                    }
                    // returnedTarget["features"] = returnedTarget["features"].slice(0, 126)
                    returnedTarget['features'].push(feature)  
                    console.log(returnedTarget)

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
    // console.log(search);
    const searchbar = document.getElementById('search');

    searchbar.addEventListener("submit", (e) => {
        
        // returnedTarget["features"] = returnedTarget["features"].slice(0, 127)
        e.preventDefault()
        // console.log(returnedTarget)
        console.log(returnedTarget)
        let query = document.getElementById('query');

        let results = fetchData(query.value);

    })

});





// <div>Venue: ${event.venue.name}</div>
{/* <div>Lineup:${event.lineup}<div></div> */}
//                         <div>Location: ${event.venue.city} ${event.venue.region},${event.venue.country}</div>
//                         <div>Latitude: ${event.venue.latitude}</div>
//                         <div>Longitude: ${event.venue.longitude}</div>