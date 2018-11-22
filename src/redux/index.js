import {
  combineReducers,
  compose,
  createStore,
} from 'redux';

import { mapCenterReducer } from './modules/mapCenter';
import { pointsReducer } from './modules/points';

export const rootReducer = combineReducers({
  mapCenter: mapCenterReducer,
  points: pointsReducer,
});

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const store = createStore(rootReducer, composeEnhancers());
