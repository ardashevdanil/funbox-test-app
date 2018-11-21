import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import Point from './';

Enzyme.configure({ adapter: new Adapter() });

describe('test Point', () => {
  const onDeleteClick = jest.fn();
  const setPointPosition = jest.fn();
	const component = Enzyme.mount(
    <Point 
      position={42}
      value='point'
      key={1}
      id={1}
      onDeleteClick={onDeleteClick}
      setPointPosition={setPointPosition}
      scrollTop={0}
    />
  );

  test('renders correctly', () => {
    expect(component.find('div').at(0).text()).toEqual('pointX');
    expect(component.debug()).toMatchSnapshot();
  });

  test('calls onDeleteClick after click on the delete button', () => {
    component.find('span').simulate('mousedown');
    expect(onDeleteClick.mock.calls.length).toBe(1);    
    expect(onDeleteClick.mock.calls[0][0]).toBe(1);    
  });

  test('calls setPointPosition after mouse down and mouse move', () => {
    const mousemoveEvent = new Event('mousemove');

    mousemoveEvent.pageY = 20;
    component.simulate('mousedown');
    document.dispatchEvent(mousemoveEvent);
    expect(setPointPosition.mock.calls.length).toBe(1);    
    expect(setPointPosition.mock.calls[0]).toEqual([20, 1]);    
  });

  test('calls setPointPosition after updating', () => {
    component.setProps({position: undefined});
    component.update();
    component.setProps({id: 10});
    component.update();
    component.setProps({position: 10});
    component.update();
    component.setProps({scrollTop: 10});
    component.update();
    expect(setPointPosition.mock.calls.length).toBe(5);    
    expect(setPointPosition.mock.calls[1][1]).toEqual(1);    
    expect(setPointPosition.mock.calls[2][1]).toEqual(10);    
  });
});
