var wms_layers = [];


        var lyr_OSMOpenTopoMap_0 = new ol.layer.Tile({
            'title': 'OSM OpenTopoMap',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'http://c.tile.opentopomap.org/{z}/{x}/{y}.png'
            })
        });
var format_ED_UFSCar_region_1 = new ol.format.GeoJSON();
var features_ED_UFSCar_region_1 = format_ED_UFSCar_region_1.readFeatures(json_ED_UFSCar_region_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ED_UFSCar_region_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ED_UFSCar_region_1.addFeatures(features_ED_UFSCar_region_1);
var lyr_ED_UFSCar_region_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ED_UFSCar_region_1, 
                style: style_ED_UFSCar_region_1,
                interactive: true,
                title: '<img src="styles/legend/ED_UFSCar_region_1.png" /> ED_UFSCar_region'
            });

lyr_OSMOpenTopoMap_0.setVisible(true);lyr_ED_UFSCar_region_1.setVisible(true);
var layersList = [lyr_OSMOpenTopoMap_0,lyr_ED_UFSCar_region_1];
lyr_ED_UFSCar_region_1.set('fieldAliases', {'ID': 'ID', 'PREDIO': 'PREDIO', 'FUNCIONAL': 'FUNCIONAL', 'NOME': 'NOME', 'SIGLA': 'SIGLA', 'CENTRO': 'CENTRO', 'AREA': 'AREA', 'PAVIMENTOS': 'PAVIMENTOS', 'RISCO': 'RISCO', 'CONSTRUCAO': 'CONSTRUCAO', });
lyr_ED_UFSCar_region_1.set('fieldImages', {'ID': 'TextEdit', 'PREDIO': 'TextEdit', 'FUNCIONAL': 'TextEdit', 'NOME': 'TextEdit', 'SIGLA': 'TextEdit', 'CENTRO': 'TextEdit', 'AREA': 'TextEdit', 'PAVIMENTOS': 'TextEdit', 'RISCO': 'TextEdit', 'CONSTRUCAO': 'TextEdit', });
lyr_ED_UFSCar_region_1.set('fieldLabels', {'ID': 'no label', 'PREDIO': 'inline label', 'FUNCIONAL': 'no label', 'NOME': 'no label', 'SIGLA': 'no label', 'CENTRO': 'no label', 'AREA': 'no label', 'PAVIMENTOS': 'no label', 'RISCO': 'no label', 'CONSTRUCAO': 'no label', });
lyr_ED_UFSCar_region_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});