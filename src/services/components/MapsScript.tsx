const MapsScript = () => {
  const mapsAPIkey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <script
      src={`https://maps.googleapis.com/maps/api/js?key=${mapsAPIkey}&libraries=places`}
    />
  );
};

export default MapsScript;
