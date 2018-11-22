import React from 'react';

import MyMap from '../MyMap';
import PointInput from '../PointInput';
import PointsList from '../PointsList';
import './App.css';

const App = () => (
  <div className='App'>
    <div className='points-menu'>
      <PointInput />
      <PointsList />
    </div>
    <MyMap />
  </div>
);

export default App;
