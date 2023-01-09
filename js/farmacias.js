 function addFarmacias() {

     var url = 'datos/farmacias.geojson';
     map.addSource('farmacias', {
         type: 'geojson',
         data: url
     });

     map.addLayer({
         'id': 'farmacias',
         'type': 'circle',
         'source': 'farmacias',
         'paint': {
             'circle-color': '#00ff00',
             'circle-radius': 5,
             'circle-stroke-color': '#ffffff',
             'circle-stroke-width': 2
         }
     });


 } // fin funcion

 
 function buscarFarmacias(valor) {

     var resultadosFarmacias = [];

     console.info(farmaciasGeoJSON);
     for (var i = 0; i < farmaciasGeoJSON.features.length; i++) {

         var feature = farmaciasGeoJSON.features[i];

         if (
             feature.properties.nombre
             .toLowerCase()
             .includes(valor.toLowerCase())
         ) {

             feature['place_name'] = `⚕️ ${feature.properties.nombre}`;
             feature['center'] = feature.geometry.coordinates;
             feature['place_type'] = ['place'];
             resultadosFarmacias.push(feature);
         }
     }
     return resultadosFarmacias;
 } // fin funcion



 function addFarmaciasCercanas() {

    map.addSource('farmacias_sel', {
        type: 'geojson',
        data:  {
            'type': 'FeatureCollection',
            'features': []}
    });

    map.addLayer({
        'id': 'farmacias_sel',
        'type': 'circle',
        'source': 'farmacias_sel',
        'paint': {
            'circle-color': '#f909b5',
            'circle-radius': 18,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2
        }
    });


    map.on("click", "farmacias", function(e){


        const point = turf.point(e.features[0].geometry.coordinates);
        console.log("pubt",e.features[0]);
        var nearestPoints=[];
        var ff = farmaciasGeoJSON;
        var i =0;
        while(i < 5) {
            var geoJ = turf.nearest(point, farmaciasGeoJSON);
            nearestPoints.push(geoJ);
            var id = geoJ.properties.featureIndex;
            //remove from features point that was found
            ff.features.splice(id, 1);
            i++;
          };



      
        console.log(nearestPoints);
        console.log(turf.featureCollection(nearestPoints));

        map.getSource('farmacias_sel').setData( turf.featureCollection(nearestPoints));

    })


} // fin funcion