import PropTypes from 'prop-types';
import React from 'react';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.pointRef = React.createRef();
    this.getCoords = this.getCoords.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  getCoords() {
    return this.pointRef.current.getBoundingClientRect();
  }
  
  handleDeleteClick(e) {
    e.stopPropagation();
  	this.props.onDeleteClick(this.props.id);
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.setState({style: {background: '#8fffff'}});

    document.onmousemove = (e) => {
      this.props.setPointPosition(
        e.pageY,
        this.props.id
      );
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.setState({style: {}});
    }
  }

  componentDidUpdate(prevProps) {
    /*
      setting the point position after updating the list of points
      or scrolling the parent component
    */
    if (
      !this.props.position ||
      this.props.id !== prevProps.id ||
      this.props.position !== prevProps.position ||
      this.props.scrollTop !== prevProps.scrollTop
    ) {
      const nodeHeight = this.pointRef.current.offsetHeight;
      const top = this.getCoords().top + nodeHeight/2;

      this.props.setPointPosition(top, this.props.id);
    }
  }

  render() {
    return (
      <div
        className="point"
        ref={this.pointRef}
        onMouseDown={this.handleMouseDown}
        onDragStart={ () => false }
        style={this.state.style}
      >
        {this.props.value}
        <span
          onMouseDown={this.handleDeleteClick}
          className="delete-button"
        >
          X
        </span>
      </div>
    );
  }
}

Point.propTypes = {
  scrollTop: PropTypes.number.isRequired,
  position: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  id: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  setPointPosition: PropTypes.func.isRequired,
}

export default Point;