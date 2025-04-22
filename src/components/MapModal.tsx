import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Tree.css"; // Import the CSS file for styling

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  // imagePath: string;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, data }) => {
  // const [mapData, setMapData] = useState<any>({}});
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  // useEffect(() => {
  //   setMapData(data);
  // }, [data]);

  // const data = {
  //   type: "map",
  //   markers: [
  //     { lat: 48.14, lng: 11.58, label: "Buyer branch", color: "blue" },
  //     { lat: 49.21, lng: 11.62, label: "Target branch", color: "red" },
  //     { lat: 47.21, lng: 11.82, label: "Target branch1", color: "blue" },
  //     { lat: 45.21, lng: 12.42, label: "Target branch2", color: "red" },
  //     { lat: 46.21, lng: 13.62, label: "Target branch3", color: "blue" },
  //     { lat: 45.71, lng: 11.62, label: "Target branch4", color: "red" }
  //   ],
  //   options: {
  //     zoom: 6,
  //     tileProvider: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //   }
  // };

  useEffect(() => {
    console.log(data);
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
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="relative w-1/2 p-4 bg-white rounded-[60px] shadow-lg">
        <div
          ref={mapRef}
          className="w-full h-[500px] rounded-[60px] shadow-md"
        ></div>
        <div className="absolute bottom-0 left-0 right-0 bg-white py-4 flex flex-col items-center rounded-b-[40px]">
          <div className="w-full flex flex-col">
            <div className="w-full h-4 bg-gradient-to-r from-red-500 to-green-500 rounded-full relative">
              <div className="absolute top-0 left-[70%] w-4 h-4 bg-white border border-gray-300 rounded-full shadow-md"></div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="text-[#ef4444]">Low</div>
              <div className="text-center">
                Distribution reach increase based on locations (consumers, %)
                110%
              </div>
              <div className="text-[#22c55e]">High</div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center my-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Backer Goertz</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">Schafer Dein Backer</span>
              </div>
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
            <button className="text-gray-600 text-[18px] font-[400] hover:text-gray-900 transition-colors   flex items-center">
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
