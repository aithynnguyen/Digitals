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

const WorldMap = ({ onLocationClick }: WorldMapProps) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="w-full border border-border bg-secondary/30">
      <ComposableMap
        projectionConfig={{ scale: 140, center: [0, 20] }}
        className="w-full h-auto"
        style={{ maxHeight: "500px" }}
      >
        <ZoomableGroup>
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
                r={hoveredSlug === location.slug ? 5 : 3.5}
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
