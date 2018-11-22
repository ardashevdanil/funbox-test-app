import PropTypes from 'prop-types';
import React from 'react';
import { YMaps, Map, Polyline } from 'react-yandex-maps';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import MyPlacemark from '../MyPlacemark';
import { setMapCenter } from '../../redux/modules/mapCenter';
import { setPointCoords } from '../../redux/modules/points';

const MyMap = ({
  mapRef,
  points,
  setCoordsAction,
  setMapCenterAction,
  setMapRef,
}) => (
  <YMaps>
    <Map
      instanceRef={(elem) => setMapRef(elem)}
      height='100%'

      // Setting the map center's coords after moving the map
      onBoundsChange={() => setMapCenterAction(mapRef.getCenter())}
      state={{ center: [55.76, 37.64], zoom: 10 }}
      width='50%'
    >
      {points.map(point => (
        <MyPlacemark
          coords={point.coords}
          key={point.key}
          value={point.value}
          onDrag={(e, key) => {
            // Converting page pixel coords to global map coords
            const coords = mapRef.options.get('projection').fromGlobalPixels(
              mapRef.converter.pageToGlobal(e.get('position')),
              mapRef.getZoom(),
            );
            setCoordsAction(coords, key);
          }}
        />
      ))}
      <Polyline
        geometry={{
          coordinates: points.map(point => point.coords), 
        }}
        options={{
          strokeColor: '#FF00FF',
          strokeWidth: 4,
        }}
      />
    </Map>
  </YMaps>
);

const enhance = compose(
  connect(
    state => ({ points: state.points }),
    { setCoordsAction: setPointCoords, setMapCenterAction: setMapCenter }),
  withState('mapRef', 'setMapRef', null),
);

export default enhance(MyMap);

MyMap.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      key: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  setCoordsAction: PropTypes.func.isRequired,
  setMapCenterAction: PropTypes.func.isRequired,
  setMapRef: PropTypes.func.isRequired,
}
