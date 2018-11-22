import React from 'react';
import styled from 'styled-components';

import MyMap from '../MyMap';
import PointInput from '../PointInput';
import PointsList from '../PointsList';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 640px;
  display: flex;

  & > div {
    width: 50%;
    height: calc(100% -20px);
    margin 10px;
  }

  * {
    margin: 0;
    padding: 0;
  }
`

const App = () => (
  <Wrapper>
    <div className='points-menu'>
      <PointInput />
      <PointsList />
    </div>
    <MyMap />
  </Wrapper>
);

export default App;
