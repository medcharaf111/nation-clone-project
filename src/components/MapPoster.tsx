import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const INITIAL_COORDS: [number, number] = [9.5375, 34.0]; // [lon, lat] — center of Tunisia

const THEME = {
  bg: "#FFFFFF",
  text: "#000000",
  water: "#B0B0B0",
  road_motorway: "#000000",
  road_primary: "#0F0F0F",
  road_secondary: "#252525",
  road_tertiary: "#404040",
  road_residential: "#5A5A5A",
  road_default: "#404040",
};

/* School type → color mapping (matches the landing page legend) */
const SCHOOL_COLORS: Record<string, string> = {
  "E.PRIMAIRE": "#6366f1",   // indigo-500  — ابتدائية
  "E.PREP": "#8b5cf6",       // violet-500  — إعدادية
  "LYCEE": "#10b981",        // emerald-500 — معهد
  "E.PREP.TECH": "#f59e0b",  // amber-500   — تقنية
};
const DEFAULT_SCHOOL_COLOR = "#94a3b8"; // slate-400 fallback

interface SchoolFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: {
    name: string;
    nameAr: string;
    schoolType: string;
    delegation: string;
    color: string;
  };
}

/** Parse CSV text into a GeoJSON FeatureCollection of school points */
function csvToGeoJSON(csv: string): GeoJSON.FeatureCollection {
  // Strip BOM + normalise line endings
  const clean = csv.replace(/^\ufeff/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  const lines = clean.split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  console.log("[MapPoster] CSV headers:", headers);

  const latIdx = headers.indexOf("Latitude initiale");
  const lngIdx = headers.indexOf("Longitude initiale");
  const nameIdx = headers.indexOf("nom_etablissement");
  const nameArIdx = headers.indexOf("nom_etablissement_ar");
  const typeIdx = headers.indexOf("Type");
  const delIdx = headers.indexOf("delagation_ar");

  const features: SchoolFeature[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const lat = parseFloat(cols[latIdx]);
    const lng = parseFloat(cols[lngIdx]);
    // Reject invalid, zero, or out-of-Tunisia-bounds coords
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    if (lat < 30 || lat > 38 || lng < 7 || lng > 12) continue;

    const schoolType = (cols[typeIdx] || "").trim();
    features.push({
      type: "Feature",
      geometry: { type: "Point", coordinates: [lng, lat] },
      properties: {
        name: cols[nameIdx] || "",
        nameAr: cols[nameArIdx] || "",
        schoolType,
        delegation: cols[delIdx] || "",
        color: SCHOOL_COLORS[schoolType] || DEFAULT_SCHOOL_COLOR,
      },
    });
  }

  return { type: "FeatureCollection", features };
}

/** Fetch CSV and add clustered circle layers for schools */
async function loadSchoolMarkers(map: maplibregl.Map) {
  try {
    console.log("[MapPoster] Fetching school CSV...");
    const res = await fetch(new URL("/schoolsGeoData.csv", window.location.origin).href);
    if (!res.ok) {
      console.error("[MapPoster] CSV fetch failed:", res.status, res.statusText);
      return;
    }
    const text = await res.text();
    console.log("[MapPoster] CSV loaded, bytes:", text.length);
    const geojson = csvToGeoJSON(text);
    console.log("[MapPoster] GeoJSON features:", geojson.features.length);

    if (geojson.features.length === 0) {
      console.warn("[MapPoster] No valid features parsed from CSV!");
      return;
    }

    // Safety: remove existing layers/source
    ["schools-clusters", "schools-cluster-count", "schools-unclustered"].forEach((id) => {
      if (map.getLayer(id)) map.removeLayer(id);
    });
    if (map.getSource("schools")) map.removeSource("schools");

    // Clustered GeoJSON source
    map.addSource("schools", {
      type: "geojson",
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 60,
    });

    // ── Cluster circles ──
    map.addLayer({
      id: "schools-clusters",
      type: "circle",
      source: "schools",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step", ["get", "point_count"],
          "#6366f1",   // < 50 → indigo
          50, "#8b5cf6",  // 50–199 → violet
          200, "#10b981", // 200–999 → emerald
          1000, "#f59e0b", // 1000+ → amber
        ],
        "circle-radius": [
          "step", ["get", "point_count"],
          16,       // < 50
          50, 22,   // 50–199
          200, 30,  // 200–999
          1000, 38, // 1000+
        ],
        "circle-opacity": 0.85,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    // ── Cluster count labels ──
    map.addLayer({
      id: "schools-cluster-count",
      type: "symbol",
      source: "schools",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-size": 13,
        "text-font": ["Noto Sans Bold"],
      },
      paint: {
        "text-color": "#ffffff",
      },
    });

    // ── Individual (unclustered) school dots ──
    map.addLayer({
      id: "schools-unclustered",
      type: "circle",
      source: "schools",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-radius": [
          "interpolate", ["linear"], ["zoom"],
          10, 4,
          14, 7,
          18, 14,
        ],
        "circle-color": [
          "match", ["get", "schoolType"],
          "E.PRIMAIRE", "#6366f1",
          "E.PREP", "#8b5cf6",
          "LYCEE", "#10b981",
          "E.PREP.TECH", "#f59e0b",
          "#94a3b8",
        ],
        "circle-opacity": 0.9,
        "circle-stroke-width": 1.5,
        "circle-stroke-color": "#ffffff",
      },
    });

    console.log("[MapPoster] Clustered school layers added successfully");
  } catch (err) {
    console.error("[MapPoster] Failed to load school data:", err);
  }
}

const HIDE_KEYWORDS = [
  "poi", "transit", "building", "barrier", "boundary", "admin",
  "landuse", "natural", "park", "green", "wood", "forest", "grass",
  "scrub", "wetland", "swamp", "marsh", "cemetery", "orchard",
  "vineyard", "sand", "beach", "glacier", "pitch", "playground",
  "aeroway-polygon", "aeroway-line", "pier", "dam",
];

function applyMonochromeTheme(map: maplibregl.Map) {
  const layers = map.getStyle().layers;

  if (map.getLayer("background")) {
    map.setPaintProperty("background", "background-color", THEME.bg);
  }

  layers.forEach((layer) => {
    try {
      const id = layer.id;

      const isWater =
        id.includes("water") || id.includes("river") ||
        id.includes("canal") || id.includes("lake") || id.includes("stream");
      const isRoad =
        id.includes("road") || id.includes("highway") ||
        id.includes("street") || id.includes("motorway") ||
        id.includes("bridge") || id.includes("tunnel");
      const isLabel = layer.type === "symbol";

      // 1. Hide unwanted layers
      if (HIDE_KEYWORDS.some((k) => id.includes(k)) && !isWater && !isRoad && !isLabel) {
        map.setLayoutProperty(id, "visibility", "none");
        return;
      }

      // 2. Remove patterns / icons — hide the layer entirely to avoid image errors
      try {
        const hasPattern = (layer as any).paint?.["fill-pattern"] || (layer as any).paint?.["line-pattern"];
        const hasIcon = (layer as any).layout?.["icon-image"];
        if (hasPattern || hasIcon) {
          map.setLayoutProperty(id, "visibility", "none");
          return;
        }
      } catch (_) {}

      // 3. Theme application
      if (isWater) {
        if (layer.type === "fill") map.setPaintProperty(id, "fill-color", THEME.water);
        if (layer.type === "line") map.setPaintProperty(id, "line-color", THEME.water);
      } else if (isRoad) {
        let color = THEME.road_default;
        if (id.includes("motorway")) color = THEME.road_motorway;
        else if (id.includes("primary") || id.includes("trunk")) color = THEME.road_primary;
        else if (id.includes("secondary")) color = THEME.road_secondary;
        else if (id.includes("tertiary")) color = THEME.road_tertiary;
        else if (id.includes("minor") || id.includes("residential") || id.includes("local") || id.includes("service"))
          color = THEME.road_residential;

        if (layer.type === "line") {
          map.setPaintProperty(id, "line-color", color);
          if (id.includes("casing") || id.includes("link")) {
            map.setPaintProperty(id, "line-color", color);
          }
        } else if (layer.type === "fill") {
          map.setPaintProperty(id, "fill-color", color);
        }
      } else if (isLabel) {
        map.setPaintProperty(id, "text-color", THEME.text);
        map.setPaintProperty(id, "text-halo-color", THEME.bg);
        map.setPaintProperty(id, "text-halo-width", 1.5);
      } else {
        if (layer.type === "fill") map.setPaintProperty(id, "fill-color", THEME.bg);
        else if (layer.type === "line") map.setPaintProperty(id, "line-color", THEME.bg);
      }
    } catch (layerErr) {
      // Skip problematic layers silently
    }
  });

  // Special fix
  ["landuse_scrub", "landuse_wetland", "natural_scrub", "natural_wetland"].forEach((id) => {
    if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", "none");
  });
}

export default function MapPoster() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [coords, setCoords] = useState({ lat: "36.8070° N", lng: "10.1260° E" });

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // RTL text plugin for Arabic labels
    try {
      maplibregl.setRTLTextPlugin(
        "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
        true,
      );
    } catch (_) {
      // Already loaded — safe to ignore
    }

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: INITIAL_COORDS,
      zoom: 7,
      attributionControl: false,
      fadeDuration: 0,
      maxTileCacheSize: 128,
      renderWorldCopies: false,
    });

    mapRef.current = map;

    // Faster zoom animation
    map.scrollZoom.setWheelZoomRate(1 / 200);

    map.on("load", () => {
      console.log("[MapPoster] Map loaded, layers:", map.getStyle().layers.length);
      try {
        applyMonochromeTheme(map);
        console.log("[MapPoster] Theme applied");
      } catch (err) {
        console.error("[MapPoster] Theme error (non-fatal):", err);
      }
      loadSchoolMarkers(map);
    });

    // Popup for individual school click
    const popup = new maplibregl.Popup({ closeButton: true, closeOnClick: true, offset: 12, maxWidth: "260px" });

    // Click cluster → zoom in
    map.on("click", "schools-clusters", async (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ["schools-clusters"] });
      if (!features.length) return;
      const clusterId = features[0].properties!.cluster_id;
      try {
        const zoom = await (map.getSource("schools") as maplibregl.GeoJSONSource).getClusterExpansionZoom(clusterId);
        map.easeTo({
          center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
          zoom,
        });
      } catch (_) {}
    });

    // Click individual school → show popup with info
    map.on("click", "schools-unclustered", (e) => {
      if (!e.features || e.features.length === 0) return;
      const f = e.features[0];
      const props = f.properties as any;
      const lngLat = (f.geometry as GeoJSON.Point).coordinates.slice() as [number, number];

      const typeLabels: Record<string, string> = {
        "E.PRIMAIRE": "مدرسة ابتدائية",
        "E.PREP": "إعدادية",
        "LYCEE": "معهد",
        "E.PREP.TECH": "إعدادية تقنية",
      };
      const typeColors: Record<string, string> = {
        "E.PRIMAIRE": "#6366f1",
        "E.PREP": "#8b5cf6",
        "LYCEE": "#10b981",
        "E.PREP.TECH": "#f59e0b",
      };
      const color = typeColors[props.schoolType] || "#94a3b8";
      const typeLabel = typeLabels[props.schoolType] || props.schoolType;

      popup
        .setLngLat(lngLat)
        .setHTML(
          `<div style="direction:rtl;font-family:'IBM Plex Sans Arabic',sans-serif;padding:6px 4px;min-width:160px;color:#1a1a1a">
            <strong style="font-size:14px;display:block;margin-bottom:4px;color:#000">${props.nameAr || props.name}</strong>
            <span style="font-size:11px;color:#555;display:block;margin-bottom:6px">${props.delegation}</span>
            <span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;color:#fff;background:${color}">
              ${typeLabel}
            </span>
          </div>`
        )
        .addTo(map);
    });

    // Cursor changes
    map.on("mouseenter", "schools-clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "schools-clusters", () => {
      map.getCanvas().style.cursor = "";
    });
    map.on("mouseenter", "schools-unclustered", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "schools-unclustered", () => {
      map.getCanvas().style.cursor = "";
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      const latStr = lat >= 0 ? `${lat.toFixed(4)}° N` : `${Math.abs(lat).toFixed(4)}° S`;
      const lngStr = lng >= 0 ? `${lng.toFixed(4)}° E` : `${Math.abs(lng).toFixed(4)}° W`;
      setCoords({ lat: latStr, lng: lngStr });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] min-h-[300px] rounded-2xl border border-white/[0.07] overflow-hidden">
      {/* MapLibre container */}
      <div ref={mapContainer} className="absolute inset-0 z-[1]" style={{ width: "100%", height: "100%" }} />

      {/* Top shader gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[25%] pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0) 100%)" }}
      />

      {/* Bottom shader gradient */}
      <div
        className="absolute bottom-0 left-0 w-full h-[25%] pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to top, #FFFFFF 30%, rgba(255,255,255,0) 100%)" }}
      />

      {/* Overlay bottom: city name, divider, country, coordinates */}
      <div className="absolute bottom-[5%] left-0 w-full text-center pointer-events-none z-[3] flex flex-col items-center">
        <h1
          className="text-3xl md:text-[3.5rem] font-bold tracking-[0.8rem] uppercase m-0"
          style={{ color: THEME.text }}
        >
          TUNIS&nbsp;&nbsp;AREA
        </h1>
        <div className="w-[10%] h-px my-4" style={{ backgroundColor: THEME.text }} />
        <h2
          className="text-lg md:text-2xl font-light tracking-[0.3rem] uppercase m-0"
          style={{ color: THEME.text }}
        >
          TUNISIA
        </h2>
        <p className="text-sm mt-4 opacity-70" style={{ color: THEME.text }}>
          {coords.lat} / {coords.lng}
        </p>
        <p className="absolute -bottom-8 right-4 text-[0.5rem] opacity-50" style={{ color: THEME.text }}>
          © OpenStreetMap contributors
        </p>
      </div>
    </div>
  );
}
