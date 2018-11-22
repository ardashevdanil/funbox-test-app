import { createAction, handleActions } from 'redux-actions';

import { reorder } from '../../../utils/reorder';

// Actions
export const addPoint = createAction('ADD_POINT');
export const deletePoint = createAction('DELETE_POINT');
export const dragPoint = createAction('DRAG_POINT');
export const setPointCoords = createAction('SET_POINT_COORDS');

// Reducers
const initialState = [];

export const pointsReducer = handleActions({
  [addPoint]: (state, { payload }) => [...state, payload],
  [deletePoint]: (state, { payload }) => {
    const newState = [...state];

    newState.splice(payload, 1);
    return newState;
  },
  [dragPoint]: (state, { payload: {endIndex, startIndex} }) => reorder(
    state,
    startIndex,
    endIndex,
  ),
  [setPointCoords]: (state, { payload: { coords, key } }) => state.map(point => (
    key === point.key 
      ? { ...point, coords: coords }
      : point
  )),
}, initialState);
