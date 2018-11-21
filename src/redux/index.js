import {
  combineReducers,
  compose,
  createStore,
} from 'redux';

import { pointsReducer } from './points';

export const rootReducer = combineReducers({
  points: pointsReducer,
});

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const store = createStore(rootReducer, composeEnhancers());
