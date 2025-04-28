import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Tree.css"; // Import the CSS file for styling
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image-more";
import countryGeoJson from './countries.geo.json'; // Download and place a GeoJSON file in your project

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  // imagePath: string;
}

interface FeatureCollection {
  features: any[];
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, data }) => {
  // const [mapData, setMapData] = useState<any>({}});
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  // Place this inside your component, but outside useEffect
  function getCountryColor(countryName: string, countryMarkerCounts: Record<string, { red: number; blue: number }>) {
    const counts = countryMarkerCounts[countryName];
    if (!counts) return "#fff";
    const total = counts.red + counts.blue;
    if (total === 0) return "#fff";
    const ratio = counts.red / total;
    const r = Math.round(255 * ratio);
    const g = 0;
    const b = Math.round(255 * (1 - ratio));
    return `rgb(${r},${g},${b})`;
  }

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false // Disabled the Leaflet icon in the bottom-right corner
      }).setView([48.14, 11.58], data.options.zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "" // Removed the attribution text
      }).addTo(mapInstance.current);

      L.control.zoom({ position: "topright" }).remove();

      data.markers.forEach((marker: any) => {
        const circle = L.circleMarker([marker.lat, marker.lng], {
          color: marker.color,
          fillColor: marker.color,
          fillOpacity: 0.8,
          radius: 4
        }).addTo(mapInstance.current!);

        circle.bindPopup(marker.label);
      });

      // 1. Count red and blue markers per country
      const countryMarkerCounts: Record<string, { red: number; blue: number }> = {};

      const features = (countryGeoJson as any).features;
      features.forEach((feature: any) => {
        const countryLayer = L.geoJSON(feature);
        const countryName = feature.properties.name;
        countryMarkerCounts[countryName] = { red: 0, blue: 0 };

        data.markers.forEach((marker: any) => {
          const latlng = L.latLng(marker.lat, marker.lng);
          if (countryLayer.getBounds().contains(latlng)) {
            if (marker.color === "red" || marker.color === "#ff0000") {
              countryMarkerCounts[countryName].red += 1;
            } else if (marker.color === "blue" || marker.color === "#0000ff") {
              countryMarkerCounts[countryName].blue += 1;
            }
          }
        });
      });

      // 3. Add highlighted countries with proportional color
      L.geoJSON(countryGeoJson as any, {
        style: (feature) => {
          const countryName = feature?.properties?.name;
          return {
            color: "#888",
            weight: 1,
            fillColor: getCountryColor(countryName, countryMarkerCounts),
            fillOpacity: 0.4,
          };
        },
      }).addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [data]);

  const handleDownload = async () => {
    if (mapRef.current && mapInstance.current) {
      try {
        // Wait for tiles to load
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the map container element
        const mapContainer = mapRef.current;

        // Use dom-to-image to capture the map
        const dataUrl = await domtoimage.toPng(mapContainer, {
          quality: 1,
          bgcolor: "#fff",
          style: {
            transform: "scale(1)"
          },
          filter: (node: HTMLElement) => {
            // Keep all elements including map tiles and markers
            return true;
          }
        });

        // Create download link
        const link = document.createElement("a");
        link.download = "map.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error downloading map:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="relative w-[50vw] p-4 bg-white rounded-[60px] shadow-lg">
        <div
          ref={mapRef}
          className="w-full h-[500px] rounded-[60px] shadow-md"
        ></div>
        <div className="absolute bottom-0 left-0 right-0 bg-white py-4 flex flex-col items-center rounded-b-[40px]">
          {/* <div className="w-full flex flex-col">
            <div className="w-full h-4 bg-gradient-to-r from-red-500 to-green-500 rounded-full relative">
              <div
                className={`absolute left-[70%] top-0 w-4 h-4 bg-white border border-gray-300 rounded-full shadow-md`}
                // style={{
                //   left: `${data.legend.slider.percent * 100}%`
                // }}
              ></div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="text-[#ef4444]">Low</div>
              <div className="text-center">
                Distribution reach increase based on locations (consumers, %)
                110%
              </div>
              <div className="text-[#22c55e]">High</div>
            </div>
          </div> */}
          <div className="w-full flex justify-center items-center my-2">
            <div className="flex items-center space-x-4">
              {data.legend.items.map((item: any) => (
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4  rounded-full`}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
              {/* <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Backer Goertz</span>
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">Schafer Dein Backer</span>
              </div> */}
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 rounded-full bg-white border border-gray-300 shadow-md px-4 py-2">
            <button
              className="text-gray-600 text-[18px] font-[400] hover:text-gray-900 transition-colors   flex items-center"
              onClick={onClose}
            >
              Close
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <button
              className="text-gray-600 text-[18px] font-[400] hover:text-gray-900 transition-colors   flex items-center"
              onClick={handleDownload}
            >
              Download
              <div className="w-3"></div>
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default MapModal;
