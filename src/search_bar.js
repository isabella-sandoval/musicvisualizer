
// import {returnedTarget} from "globe.js"
let rangeInput = document.querySelector(".range-input input");
let rangeValue = document.querySelector(".range-input .value div");


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
            var events = Object.values(data).map(event=> {
                // console.log(event)
               
                if(`${event.datetime}`.startsWith(currentyear)){
                    // var eventLat = event.venue.latitude
                    // var eventLong = event.venue.longitude

                    
                    // var dat = returnedTarget.features.parse(txt);  //parse the JSON
                    //     dat.push({
                    //         "type": "Feature",
                    //         "geometry": {
                    //             "type": "Point",
                    //             "coordinates": [eventLat, eventLong]
                    //         },
                    //         "properties": {
                    //             "name": "randomvenue"
                    //         }
                    //     });
                    
                    //     txt = JSON.stringify(dat); 

                    return `
                    <div class="event-deets">
                        <div>Date:${event.datetime}<div>
                        <div>Lineup:${event.lineup}<div>
                        <div>Venue: ${event.venue.name}</div>
                        <div>Location: ${event.venue.city} ${event.venue.region},${event.venue.country}</div>
                        <div>Latitude: ${event.venue.latitude}</div>
                        <div>Longitude: ${event.venue.longitude}</div>
                        <p>
                    </div>    
                `}
            }).join('');
            document.getElementById('event-data')
                .insertAdjacentHTML("afterbegin", events);
                
                var events
                
               
                // const json = events;
                // const obj = JSON.parse(json);
                // console.log(obj.Lineup, obj.Venue)

            // let points = events

            // points = d3.json(({ longitude, latitude }) => [+longitude, +latitude])

           
        })
}

// {
//     "type": "Feature",
//         "properties": {
//         "featurecla": "Country",
//             "scalerank": 1
//     },
//     "geometry": {
//         "type": "Point",
//             "coordinates": [
//                 [
//                     [
//                         -125.559566406895286,
//                         -73.481353454735199
//                     ],

//                 ]
//             ]
//     }
// },


document.addEventListener('DOMContentLoaded', () => {
    // console.log(search);
    const searchbar = document.getElementById('search');

    searchbar.addEventListener("submit", (e) => {
        e.preventDefault()

        let query = document.getElementById('query');

        let results = fetchData(query.value);

    })


});



