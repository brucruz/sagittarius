import { render } from '@testing-library/react';
import MapMarker from '@/components/atom/MapMarker';

interface MapMarkerTestProps {
  lat: number;
  lng: number;
  name: string;
  type?: 'user' | 'vendor';
}

const setup = ({
  lat,
  lng,
  name,
  type = 'vendor',
}: MapMarkerTestProps): any => {
  const { getByTestId } = render(
    <MapMarker lat={lat} lng={lng} name={name} type={type} />,
  );
  return { getByTestId };
};

describe('<MapMarker />', () => {
  it('Should render Map Marker component with default type', () => {
    const { getByTestId } = setup({ lat: 0, lng: 0, name: 'test' });
    expect(getByTestId('map-marker-atom')).toBeDefined();
  });

  it('Should render Map Marker component with user type', () => {
    const { getByTestId } = setup({
      lat: 0,
      lng: 0,
      name: 'test',
      type: 'user',
    });
    expect(getByTestId('map-marker-atom')).toBeDefined();
  });
});
