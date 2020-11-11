import GoogleMapReact from 'google-map-react';
import { MapContainer } from '@/styles/components/organisms/Map';
import Marker from '@/components/atom/MapMarker';

interface MarkerProps {
  key: string;
  name: string;
  lat: number;
  lng: number;
}
interface MapsProps {
  markers?: MarkerProps[];
  lat: number;
  lng: number;
}

const GoogleMap: React.FC<MapsProps> = ({ markers, lat, lng }) => {
  // const [center, setCenter] = useState({
  //   lat,
  //   lng,
  // });

  const center = {
    lat,
    lng,
  };

  const distanceToMouse = (): number => {
    // pt can be undefined in some cases
    // don't know why this happens
    // if (pt && mousePos) {
    // return Math.sqrt(
    //   (pt.x - mousePos.x) * (pt.x - mousePos.x) +
    //     (pt.y - mousePos.y) * (pt.y - mousePos.y),
    // );
    return 0;
    // }
  };

  // const [zoom, setZoom] = useState(13);

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            : '',
        }}
        center={center}
        defaultZoom={13}
        distanceToMouse={distanceToMouse}
      >
        {markers &&
          markers.map(marker => (
            <Marker
              key={marker.key}
              lat={marker.lat}
              lng={marker.lng}
              name={marker.name}
            />
          ))}

        <Marker
          key="user_location"
          lat={lat}
          lng={lng}
          name="Localização"
          type="user"
        />
      </GoogleMapReact>
    </MapContainer>
  );
};

export default GoogleMap;
