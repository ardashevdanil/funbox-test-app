import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';

import { addPoint } from '../../redux/modules/points';

const PointInput = ({
  addPointAction,
  mapCenter,
  setValue,
  value,
}) => (
  <div className='point-input'>
    <input
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
          addPointAction({
            coords: mapCenter,
            key: Date.now(),
            value: e.target.value,
          });
          setValue('');
        }
      }}
      placeholder='Enter a point name'
      type='text'
      value={value}
    />
  </div>
);

const enhance = compose(
  connect(({ mapCenter }) => ({ mapCenter }), { addPointAction: addPoint }),
  withState('value', 'setValue', ''),
);

export default enhance(PointInput);

PointInput.propTypes = {
  addPointAction: PropTypes.func.isRequired,
  mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}
