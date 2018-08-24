import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import MyPlacemark from '../components/MyPlacemark';

Enzyme.configure({ adapter: new Adapter() });

describe('test MyPlacemark', () => {
  const onDrag = jest.fn();
	const component = Enzyme.shallow(
    <MyPlacemark
      key={1}
      onDrag={onDrag}
      coords={[1, 1]}
      value='value'
      index={1}
    />
  );

  test('renders correctly', () => {
    expect(component.debug()).toMatchSnapshot();
  });

  test('calls onDrag after drag', () => {
    component.find('Placemark').simulate('drag');
    expect(onDrag.mock.calls.length).toBe(1);
    expect(onDrag.mock.calls[0][1]).toBe(1);
  });
});