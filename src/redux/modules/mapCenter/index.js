import { createAction, handleActions } from 'redux-actions';

// Actions
export const setMapCenter = createAction('SET_MAP_CENTER');

// Reducers
const initialState = [55.76, 37.64];

export const mapCenterReducer = handleActions({
  [setMapCenter]: (state, { payload }) => payload,
}, initialState);
