
var GeoJSON      = ol.format.GeoJSON;
var OSM          = ol.source.OSM;
var VectorSource = ol.source.Vector;
var VectorLayer  = ol.layer.Vector;
var TileLayer    = ol.layer.Tile;
var Style        = ol.style.Style;
var Stroke       = ol.style.Stroke;
var CircleStyle  = ol.style.Circle;
var Map          = ol.Map;
var View         = ol.View;
var Select       = ol.interaction.Select;
var DragBox      = ol.interaction.DragBox;
var platformModifierKeyOnly = ol.events.condition.platformModifierKeyOnly;

var vectorSource = new VectorSource({
  url: 'data/geojson/sel_mun.geojson',
  format: new GeoJSON(),
});

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: vectorSource,
    }) ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
    constrainRotation: 16,
  }),
});

// a normal select interaction to handle click
var select = new Select();
map.addInteraction(select);

var selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
var dragBox = new DragBox({
  condition: platformModifierKeyOnly,
});

map.addInteraction(dragBox);

dragBox.on('boxend', function () {
  // features that intersect the box geometry are added to the
  // collection of selected features

  // if the view is not obliquely rotated the box geometry and
  // its extent are equalivalent so intersecting features can
  // be added directly to the collection
  var rotation = map.getView().getRotation();
  var oblique = rotation % (Math.PI / 2) !== 0;
  var candidateFeatures = oblique ? [] : selectedFeatures;
  var extent = dragBox.getGeometry().getExtent();
  vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
    candidateFeatures.push(feature);
  });

  // when the view is obliquely rotated the box extent will
  // exceed its geometry so both the box and the candidate
  // feature geometries are rotated around a common anchor
  // to confirm that, with the box geometry aligned with its
  // extent, the geometries intersect
  if (oblique) {
    var anchor = [0, 0];
    var geometry = dragBox.getGeometry().clone();
    geometry.rotate(-rotation, anchor);
    var extent$1 = geometry.getExtent();
    candidateFeatures.forEach(function (feature) {
      var geometry = feature.getGeometry().clone();
      geometry.rotate(-rotation, anchor);
      if (geometry.intersectsExtent(extent$1)) {
        selectedFeatures.push(feature);
      }
    });
  }
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on('boxstart', function () {
  selectedFeatures.clear();
});

var infoBox = document.getElementById('info');

selectedFeatures.on(['add', 'remove'], function () {
  var names = selectedFeatures.getArray().map(function (feature) {
    return feature.get('name');
  });
  if (names.length > 0) {
    infoBox.innerHTML = names.join(', ');
  } else {
    infoBox.innerHTML = 'No countries selected';
  }
});
