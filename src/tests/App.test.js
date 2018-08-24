import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('test App', () => {
	const component = Enzyme.shallow(
    <App />
  );

  test('renders correctly', () => {
    expect(component.debug()).toMatchSnapshot();
  });

  test('adds a new point', () => {
    component.instance().addNewPoint('point');
    expect(component.state('points').length).toBe(1);
    expect(component.state('points')[0].value).toEqual('point');
  });

  test('arranges points by position', () => {
    const points = [{position: 14}, {position: 0}];
    expect(component.instance().arrangePointsByPosition(points)[0].position)
      .toBe(0);
  });

  test('deletes a point', () => {
    component.setState({
      points: [{value: 'first'}, {value: 'second'}],
    });
    component.instance().deletePoint(0);
    expect(component.state('points').length).toBe(1);
    expect(component.state('points')[0].value).toEqual('second');
  });

  test('sets a point coords', () => {
    component.setState({
      points: [{ coords: [42, 24] }],
    });
    component.instance().setPointCoords([1, 25], 0)
    expect(component.state('points')[0].coords).toEqual([1, 25]);
  });
  
  test('sets a point position', () => {
    component.setState({
      points: [{ position: 42 }],
    });
    component.instance().setPointPosition(25, 0)
    expect(component.state('points')[0].position).toBe(25);
  });
})