import React, { Component } from 'react';

import MyMap from '../MyMap';
import PointInput from '../PointInput';
import PointsList from '../PointsList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      style: {},
      points: []
    };
    this.addNewPoint = this.addNewPoint.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
    this.setPointCoords = this.setPointCoords.bind(this);
    this.setPointPosition = this.setPointPosition.bind(this);
  }

  addNewPoint(value) {
    const newPoint = { value: value, key: Date.now() };
    
    this.setState( (prevState) => ({
      points: prevState.points.concat(newPoint),
    }));
  }

  arrangePointsByPosition(points) {
    const sortFunc = (a, b) => {
      if (a.position < b.position) return -1;
      if (a.position > b.position) return 1;
    };
    return points.sort(sortFunc)
  }

  deletePoint(id) {
    this.setState( (prevState) => {
      const newPoints = prevState.points.filter( (item, index) => {
        if (index !== id) return true
      });
      return {points: newPoints}
    });
  }

  setPointCoords(coords, id) {
    this.setState( (prevState) => {
      const newPoints = prevState.points.map( (item, index) => {
        if (index === id) {
          item.coords = coords;
          return item
        };
        return item
      });
      return {points: newPoints}
    });
  }

  setPointPosition(position, id) {
    this.setState( (prevState) => {
      const newPoints = prevState.points.map( (item, index) => {
        if (index === id) {
          item.position = position;
          return item
        };
        return item
      });
      return {points: newPoints}
    });
  }

  componentDidMount() {
    this.setState({style: {height: document.documentElement.clientHeight}});
    window.onresize = () => {
      this.setState({style: {height: document.documentElement.clientHeight}});
    }
  }

  render() {
    const points = this.arrangePointsByPosition(this.state.points);

    return (
      <div className="App" style={this.state.style}>
        <div className="points-menu">
          <PointInput onEnterPress={this.addNewPoint}/>
          <PointsList
            onDeleteClick={this.deletePoint}
            points={points}
            setPointPosition={this.setPointPosition}
          />
        </div>
        <MyMap 
          points={this.state.points}
          setPointCoords={this.setPointCoords}
        />
      </div>
    );
  }
}

export default App;
