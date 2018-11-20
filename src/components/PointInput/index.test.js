import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import PointInput from './';

Enzyme.configure({ adapter: new Adapter() });

describe('test PointInput', () => {
  const onEnterPress = jest.fn();
	const component = Enzyme.shallow(
    <PointInput onEnterPress={onEnterPress}/>
  );

  test('renders correctly', () => {
    expect(component.debug()).toMatchSnapshot();
  });

  test('calls onEnterPress after press on enter', () => {
    component.setState( {inputValue: 12} );
    component.find('input').simulate('keydown', {keyCode: 13});
    expect(onEnterPress.mock.calls.length).toBe(1);
    expect(component.state('inputValue')).toEqual('');
  });

  test('saves an input value in the state', () => {
    component.find('input').simulate('change', {target: {value: 1}});
    expect(component.state('inputValue')).toBe(1);
  });
});
