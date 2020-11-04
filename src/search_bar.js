
function fetchData() {
    fetch("https://rest.bandsintown.com/artists/cherub/events/?app_id=88d19a898ccecc016e8e00885e4e7df9&date=2010-01-01%2C2021-01-01")
        .then(res => {
            if (!res.ok) {
                throw Error("artist not found")
            }
            return res.json()
        }).then(data => {
            console.log(data)
        })
}

fetchData();