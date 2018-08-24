import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import PointsList from '../components/PointsList';

Enzyme.configure({ adapter: new Adapter() });

describe('test PointsList', () => {
	const component = Enzyme.shallow(
    <PointsList 
      points={[
        {
          position: 1,
          value: 1,
          key: 1,
        },
        {
          position: 2,
          value: 2,
          key: 2
        }
      ]}
      onDeleteClick={() => null}
      setPointPosition={() => null}
    />
  );

  test('renders correctly', () => {
    expect(component.debug()).toMatchSnapshot();
  });

  test('renders points correctly', () => {
    expect(component.find('Point').length).toBe(2);
  });
});