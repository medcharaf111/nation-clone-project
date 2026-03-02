import maplibregl from 'maplibre-gl';

// Fix for reversed Arabic text
maplibregl.setRTLTextPlugin(
    'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
    null,
    true
);

const INITIAL_COORDS = [10.126, 36.807]; // [lon, lat]
const THEME = {
    bg: '#FFFFFF',
    text: '#000000',
    water: '#B0B0B0',
    road_motorway: '#000000',
    road_primary: '#0F0F0F',
    road_secondary: '#252525',
    road_tertiary: '#404040',
    road_residential: '#5A5A5A',
    road_default: '#404040'
};

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: INITIAL_COORDS,
    zoom: 13,
    attributionControl: false
});

map.on('style.load', () => {
    const layers = map.getStyle().layers;

    if (map.getLayer('background')) {
        map.setPaintProperty('background', 'background-color', THEME.bg);
    }

    layers.forEach(layer => {
        const id = layer.id;

        // Hide almost everything that isn't water or roads
        const hideKeywords = [
            'poi', 'transit', 'building', 'barrier', 'boundary', 'admin',
            'landuse', 'natural', 'park', 'green', 'wood', 'forest', 'grass',
            'scrub', 'wetland', 'swamp', 'marsh', 'cemetery', 'orchard',
            'vineyard', 'sand', 'beach', 'glacier', 'pitch', 'playground',
            'aeroway-polygon', 'aeroway-line', 'pier', 'dam'
        ];

        const isWater = id.includes('water') || id.includes('river') || id.includes('canal') || id.includes('lake') || id.includes('stream');
        const isRoad = id.includes('road') || id.includes('highway') || id.includes('street') || id.includes('motorway') || id.includes('bridge') || id.includes('tunnel');
        const isLabel = layer.type === 'symbol';

        // 1. If it's something we want to hide entirely
        if (hideKeywords.some(k => id.includes(k)) && !isWater && !isRoad && !isLabel) {
            map.setLayoutProperty(id, 'visibility', 'none');
            return;
        }

        // 2. Remove ANY patterns or icons from ANY layer
        if (layer.paint) {
            if (layer.paint['fill-pattern']) map.setPaintProperty(id, 'fill-pattern', undefined);
            if (layer.paint['line-pattern']) map.setPaintProperty(id, 'line-pattern', undefined);
        }
        if (layer.layout) {
            if (layer.layout['icon-image']) map.setLayoutProperty(id, 'icon-image', undefined);
        }

        // 3. Theme application
        if (isWater) {
            if (layer.type === 'fill') map.setPaintProperty(id, 'fill-color', THEME.water);
            if (layer.type === 'line') map.setPaintProperty(id, 'line-color', THEME.water);
        }
        else if (isRoad) {
            let color = THEME.road_default;
            if (id.includes('motorway')) color = THEME.road_motorway;
            else if (id.includes('primary') || id.includes('trunk')) color = THEME.road_primary;
            else if (id.includes('secondary')) color = THEME.road_secondary;
            else if (id.includes('tertiary')) color = THEME.road_tertiary;
            else if (id.includes('minor') || id.includes('residential') || id.includes('local') || id.includes('service')) color = THEME.road_residential;

            if (layer.type === 'line') {
                map.setPaintProperty(id, 'line-color', color);
                // No yellow link colors or casings
                if (id.includes('casing') || id.includes('link')) {
                    map.setPaintProperty(id, 'line-color', color);
                }
            } else if (layer.type === 'fill') {
                map.setPaintProperty(id, 'fill-color', color);
            }
        }
        else if (isLabel) {
            // Keep text but force grayscale
            map.setPaintProperty(id, 'text-color', THEME.text);
            map.setPaintProperty(id, 'text-halo-color', THEME.bg);
            map.setPaintProperty(id, 'text-halo-width', 1.5);
        }
        else {
            // Default to background color for everything else
            if (layer.type === 'fill') map.setPaintProperty(id, 'fill-color', THEME.bg);
            else if (layer.type === 'line') map.setPaintProperty(id, 'line-color', THEME.bg);
        }
    });

    // Special fix for "wetland" or "scrub" which often have icons in this style
    ['landuse_scrub', 'landuse_wetland', 'natural_scrub', 'natural_wetland'].forEach(id => {
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', 'none');
    });
});

map.on('move', () => {
    const { lng, lat } = map.getCenter();
    const coordsEl = document.getElementById('coordinates');
    const latStr = lat >= 0 ? `${lat.toFixed(4)}° N` : `${Math.abs(lat).toFixed(4)}° S`;
    const lngStr = lng >= 0 ? `${lng.toFixed(4)}° E` : `${Math.abs(lng).toFixed(4)}° W`;
    coordsEl.innerText = `${latStr} / ${lngStr}`;
});
