



function fetchData() {
   
    fetch("https://rest.bandsintown.com/artists/arloparks/events/?app_id=88d19a898ccecc016e8e00885e4e7df9&date=2010-01-01%2C2021-01-01")
        .then(res => {
            if (!res.ok) {
                throw Error("artist does not exist")
            }
            return res.json()
        }).then(data => {
            events = Object.values(data).map(event=> {
                console.log(event)
                
                return `
                    <div>Date:${event.datetime}<div>
                    <div>Lineup:${event.lineup}<div>
                    <div>Venue: ${event.venue.name}</div>
                    <div>Latitude: ${event.venue.latitude}</div>
                    <div>Longitude: ${event.venue.longitude}</div>
                    <div>Location: ${event.venue.city} ${event.venue.region}, ${event.venue.country}</div>
                    <p>
                `
            }).join('');
            document.getElementById('event-data')
                .insertAdjacentHTML("afterbegin", events);
                
                // const json = event;
                // const obj = JSON.parse(json);
                // console.log(obj.lineup, obj.venue)
           
        })
}


fetchData();

