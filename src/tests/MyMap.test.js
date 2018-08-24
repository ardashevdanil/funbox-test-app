import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import MyMap from '../components/MyMap';

Enzyme.configure({ adapter: new Adapter() });

describe('test MyMap', () => {
  const setPointCoords = jest.fn();
	const component = Enzyme.shallow(
    <MyMap
      points={[
        {
          coords: [1, 1],
          key: 1,
          value: 'value',
        }
      ]}
      setPointCoords={setPointCoords}
    />
  );

  test('renders correctly', () => {
    expect(component.debug()).toMatchSnapshot();
  });

  test('pass coords to Polyline', () => {
    expect(component.find('Polyline').props().geometry.coordinates)
      .toEqual([[1, 1]]);
  });

  test('renders placemarks correctly', () => {
    expect(component.find('MyPlacemark').length).toBe(1);
  });
});