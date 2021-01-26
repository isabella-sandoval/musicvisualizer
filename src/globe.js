



document.addEventListener('DOMContentLoaded', () => {
    // console.log(search);
    const globe = document.getElementById('globe');
    const searchbar = document.getElementById('search');

 

        var context = d3.select('#content canvas')
            .node()
            .getContext('2d');
            // .data(events.features);
            
            
            var projection = d3.geoOrthographic()
            // var projection = d3.geoGnomonic()
            // var projection = d3.geoAzimuthalEqualArea()
            .scale(230);
            
            
            
            var geoGenerator = d3.geoPath()
            .projection(projection)
            .pointRadius(4)
            .context(context);
            
        // context.enter()
        //     .append('point')
        //     .attr('d', geoGenerator);

   
        
        var spin = 300;
        
        function update() {
            context.clearRect(0, 0, 800, 600);
            
            context.lineWidth = 0.8;
            context.strokeStyle = '#333';
            
            context.beginPath();
            geoGenerator({ type: 'FeatureCollection', features: geojson.features })
            context.stroke();
            
            projection.rotate([spin, -20])
            spin -= 0.7
            
            
            var graticule = d3.geoGraticule();
            context.beginPath();
            context.strokeStyle = '#ABB2B9';
            geoGenerator(graticule());
            context.stroke();
            
        }
        
        
        
    
        // d3.json(myGeoJson, function (err, json) {
        //     geojson = json;
        //     window.setInterval(update, 100);
        //     // debugger
        // })
        
    
        d3.json("https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json", function (err, json) {
                geojson = json;
                // debugger
                window.setInterval(update, 100);
                // console.log(geojson)
                returnedTarget = Object.assign({}, geojson);
                // console.log(returnedTarget)
                // list = []
                // list.append(geojson);

                // console.log(list)
            })
    
            
        });
        
        
      