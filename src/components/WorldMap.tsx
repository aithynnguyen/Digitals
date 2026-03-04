import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { locations, LocationData } from "@/data/locations";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  onLocationClick: (location: LocationData) => void;
}

type MapOnlyPin = {
  slug: string;
  city: string;
  country: string;
  coordinates: [number, number];
};

const mapOnlyRequestedPins: MapOnlyPin[] = [
  { slug: "ottawa", city: "Ottawa", country: "Canada", coordinates: [-75.6972, 45.4215] },
  { slug: "blue-mountain-wasaga", city: "Blue Mountain / Wasaga", country: "Canada", coordinates: [-80.3167, 44.5000] },
  { slug: "kingston", city: "Kingston", country: "Canada", coordinates: [-76.4859, 44.2312] },
  { slug: "boston", city: "Boston", country: "USA", coordinates: [-71.0589, 42.3601] },
  { slug: "philadelphia", city: "Philadelphia", country: "USA", coordinates: [-75.1652, 39.9526] },
  { slug: "cliffs-of-moher", city: "Cliffs of Moher", country: "Ireland", coordinates: [-9.4309, 52.9715] },
  { slug: "shawinigan", city: "Shawinigan", country: "Canada", coordinates: [-72.7478, 46.5392] },
  { slug: "nashville", city: "Nashville", country: "USA", coordinates: [-86.7816, 36.1627] },
  { slug: "san-diego", city: "San Diego", country: "USA", coordinates: [-117.1611, 32.7157] },
  { slug: "montreal", city: "Montreal", country: "Canada", coordinates: [-73.5673, 45.5017] },
  { slug: "new-york-city", city: "New York City", country: "USA", coordinates: [-74.0060, 40.7128] },
  { slug: "galway", city: "Galway", country: "Ireland", coordinates: [-9.0568, 53.2707] },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;
const distanceKm = (a: [number, number], b: [number, number]) => {
  const earthRadiusKm = 6371;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusKm * Math.asin(Math.sqrt(h));
};

const MIN_PIN_SPACING_KM = 180;

const filterCrowdedMapOnlyPins = (pins: MapOnlyPin[]): MapOnlyPin[] => {
  const accepted: MapOnlyPin[] = [];
  const existingCoords = locations.map((location) => location.coordinates);

  pins.forEach((candidate) => {
    const tooCloseToExisting = existingCoords.some(
      (coord) => distanceKm(coord, candidate.coordinates) < MIN_PIN_SPACING_KM,
    );
    if (tooCloseToExisting) return;

    const tooCloseToAccepted = accepted.some(
      (pin) => distanceKm(pin.coordinates, candidate.coordinates) < MIN_PIN_SPACING_KM,
    );
    if (tooCloseToAccepted) return;

    accepted.push(candidate);
  });

  return accepted;
};

const WorldMap = ({ onLocationClick }: WorldMapProps) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const mapOnlyPins = filterCrowdedMapOnlyPins(mapOnlyRequestedPins);

  return (
    <div className="w-full border border-border bg-secondary/30">
      <ComposableMap
        projectionConfig={{ scale: 140, center: [0, 20] }}
        className="w-full h-auto"
        style={{ maxHeight: "500px" }}
      >
        <ZoomableGroup
          onMoveEnd={(position) => setZoom(position.zoom)}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "hsl(var(--accent))" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map((location) => (
            <Marker
              key={location.slug}
              coordinates={location.coordinates}
              onClick={() => onLocationClick(location)}
              onMouseEnter={() => setHoveredSlug(location.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                r={Math.max(1.4, (hoveredSlug === location.slug ? 3.5 : 2.5) / zoom)}
                fill="hsl(var(--foreground))"
                className="transition-all duration-200"
              />
              {hoveredSlug === location.slug && (
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "8px",
                    fill: "hsl(var(--foreground))",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {location.city}
                </text>
              )}
            </Marker>
          ))}

          {mapOnlyPins.map((pin) => (
            <Marker
              key={pin.slug}
              coordinates={pin.coordinates}
              onMouseEnter={() => setHoveredSlug(pin.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{ cursor: "default" }}
            >
              <circle
                r={Math.max(1.2, (hoveredSlug === pin.slug ? 3.2 : 2.2) / zoom)}
                fill="hsl(207 90% 52%)"
                className="transition-all duration-200"
              />
              {hoveredSlug === pin.slug && (
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "8px",
                    fill: "hsl(var(--foreground))",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {pin.city}
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
