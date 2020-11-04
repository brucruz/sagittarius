export const loadMapApi = (): any => {
  const mapsAPIkey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${mapsAPIkey}&libraries=places&language=no&region=NO&v=quarterly`;
  const scripts = document.getElementsByTagName('script');
  // Go through existing script tags, and return google maps api tag when found.
  for (let i = 0; i < scripts.length; i += 1) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement('script');
  googleMapScript.src = mapsURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};
