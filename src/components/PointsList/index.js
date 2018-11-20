import PropTypes from 'prop-types';
import React from 'react';

import Point from '../Point';

class PointsList extends React.Component {
  constructor(props) {
    super(props);
    this.pointsListRef = React.createRef();
    this.state = {
      scrollTop: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    this.setState({scrollTop: this.pointsListRef.current.scrollTop});
  }

  render() {
    const points = this.props.points.map( (point, id) => {
      return (
        <Point
          position={point.position}
          value={point.value}
          key={point.key}
          id={id}
          onDeleteClick={this.props.onDeleteClick}
          scrollTop={this.state.scrollTop}
          setPointPosition={this.props.setPointPosition}
        />
      );
    });

    return (
      <div
        onScroll={this.handleScroll}
        className='points-list'
        ref={this.pointsListRef}
      >
        {points}
      </div>
    );
  }
}

PointsList.propTypes = {
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
  onDeleteClick: PropTypes.func.isRequired,
  setPointPosition: PropTypes.func.isRequired,
}

export default PointsList;
