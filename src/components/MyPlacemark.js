import PropTypes from 'prop-types';
import React from 'react';
import { Placemark } from 'react-yandex-maps';

class MyPlacemark extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrag=this.handleDrag.bind(this);
  }

  handleDrag(e) {
    this.props.onDrag(e, this.props.index);
  }

  render() {
    return (
      <Placemark
        onDrag={this.handleDrag}
        geometry={{
          coordinates: this.props.coords,
          type: 'Point'
        }}
        properties={{
          balloonContent: this.props.value,
          iconContent: this.props.index + 1
        }}
        options={{
          draggable: true,
          preset: 'islands#greenCircleIcon'
        }}
      />
    );
  }
}

MyPlacemark.propTypes = {
  onDrag: PropTypes.func.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default MyPlacemark;