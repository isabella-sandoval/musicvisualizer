
document.addEventListener('DOMContentLoaded', () => {

        var context = d3.select('#content canvas')
            .node()
            .getContext('2d');
            
            
        var projection = d3.geoOrthographic()
            .scale(230);
        
            
        var geoGenerator = d3.geoPath()
            .projection(projection)
            .pointRadius(4)
            .context(context);
   
        var spin = 300;
        
        function update() {
            context.clearRect(0, 0, 800, 600);
            
            context.lineWidth = 0.9;
            context.strokeStyle = '#333';
            
            context.beginPath();
            geoGenerator({ type: 'FeatureCollection', features: returnedTarget.features })
            context.stroke();
            
            projection.rotate([spin, -20])
            spin -= 0.7
            
            
            var graticule = d3.geoGraticule();
                context.beginPath();
                context.strokeStyle = '#d9dcde';
            
            geoGenerator(graticule());
            context.stroke();
            d3.selectAll("Point").style("color", "blue");

        }
        
        
    
        d3.json("https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json", function (err, json) {
                geojson = json;
                window.setInterval(update, 100);
                returnedTarget = Object.assign({}, geojson);
           
            })
        });
        
        
      