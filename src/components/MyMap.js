import PropTypes from 'prop-types';
import React from 'react';
import { YMaps, Map, Polyline } from 'react-yandex-maps';

import MyPlacemark from './MyPlacemark';

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.mapState = { center: [55.76, 37.64], zoom: 10 };
    this.handlePlacemarkDrag = this.handlePlacemarkDrag.bind(this);
  }

  handlePlacemarkDrag(e, id) {
    //converting page pixel coords to global map coords
    const coords = this.mapRef.options.get('projection').fromGlobalPixels(
      this.mapRef.converter.pageToGlobal(e.get('position')),
      this.mapRef.getZoom()
    );
    
    this.props.setPointCoords(coords, id);
  }

  componentDidUpdate(prevProps) {
    //setting the point coords after creating
    if (this.props.points.length > prevProps.points.length) {
      const pointId = this.props.points.length - 1;

      this.props.setPointCoords(this.mapRef.getCenter(), pointId);
    }
  }

  render() {
    const lineCoords = [];
    const points = this.props.points.map( (item, index) => {
      if (item.coords) {
        lineCoords.push(item.coords);

        return (
          <MyPlacemark
            key={item.key}
            onDrag={this.handlePlacemarkDrag}
            coords={item.coords}
            value={item.value}
            index={index}
          />
        );
      }
    });

    return (
      <YMaps>
        <Map
          width='50%'
          height='100%'
          state={this.mapState}
          instanceRef={(elem) => this.mapRef = elem}
        >
          {points}
          <Polyline
            geometry={{
              coordinates: lineCoords
            }}
            options={{
              strokeColor: '#FF00FF',
              strokeWidth: 4
            }}
          />
        </Map>
      </YMaps>
    );
  }
};

MyMap.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      key: PropTypes.number,
      position: PropTypes.number,
      coords: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  setPointCoords: PropTypes.func.isRequired,
}

export default MyMap;