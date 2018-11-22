import PropTypes from 'prop-types';
import React from 'react';
import { Map, Placemark, Polyline, YMaps } from 'react-yandex-maps';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

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
      width='50%'
    >
      {points.map((point, index) => (
        <Placemark
          geometry={{
            coordinates: point.coords,
            type: 'Point',
          }}
          key={point.key}
          onDrag={e => {
            // Converting page pixel coords to global map coords
            const coords = mapRef.options.get('projection').fromGlobalPixels(
              mapRef.converter.pageToGlobal(e.get('position')),
              mapRef.getZoom(),
            );
            setCoordsAction({ coords, key: point.key });
          }}
          options={{ draggable: true }}
          properties={{ 
            balloonContent: point.value,
            iconContent: index + 1, 
          }}
        />
      ))}
      <Polyline
        geometry={{
          coordinates: points.map(point => point.coords), 
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
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCoordsAction: PropTypes.func.isRequired,
  setMapCenterAction: PropTypes.func.isRequired,
  setMapRef: PropTypes.func.isRequired,
}
