import React from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

import MyMap from '../MyMap';
import PointInput from '../PointInput';
import PointsList from '../PointsList';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  min-width: 640px;
  display: flex;
`;

const List = styled.div`
  height: 100%;
  width: 50%;
  margin: 0 10px;
  overflow: auto;
`;

const App = () => (
  <Wrapper>
    <GlobalStyle />
    <List>
      <PointInput />
      <PointsList />
    </List>
    <MyMap />
  </Wrapper>
);

export default App;
