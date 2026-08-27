'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HospitalData } from '@/components/common/HospitalCard';
import { DoctorData } from '@/components/common/DoctorCard';
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet map to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface MapViewProps {
    locations: (HospitalData | DoctorData)[];
}

const MapView: React.FC<MapViewProps> = ({ locations }) => {
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        import('leaflet').then((leaflet) => {
            // Fix default icon issue with webpack/nextjs
            delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
            leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
            setL(leaflet);
        });
    }, []);

    if (!L) return <div className="h-full w-full bg-gray-100 flex items-center justify-center">Loading Map...</div>;

    const defaultCenter: [number, number] = [10.7769, 106.7009]; // Ho Chi Minh City

    return (
        <div className="h-[calc(100vh-100px)] sticky top-24 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <MapContainer
                center={defaultCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc: any, idx) => {
                    // Mock coordinates if not present (in real app, address geocoding is needed)
                    // Random scatter around HCMC for demo
                    const lat = 10.7769 + (Math.random() - 0.5) * 0.05;
                    const lng = 106.7009 + (Math.random() - 0.5) * 0.05;

                    return (
                        <Marker key={idx} position={[lat, lng]}>
                            <Popup>
                                <div className="text-sm">
                                    <strong className="block text-base mb-1">{loc.name}</strong>
                                    <p className="text-gray-600 mb-0">{loc.address}</p>
                                    <a href={`/booking?id=${loc.userId || loc.id}`} className="mt-2 block text-primary font-medium">
                                        Đặt lịch ngay
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MapView;
