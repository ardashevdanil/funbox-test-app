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
  [addPoint]: (state, action) => [...state, action.payload],
  [deletePoint]: (state, action) => {
    const newState = [...state];

    newState.splice(action.payload, 1);
    return newState;
  },
  [dragPoint]: (state, action) => reorder(
    state,
    action.payload.startIndex,
    action.payload.endIndex,
  ),
  [setPointCoords]: (state, action) => state.map((point, index) => (
    action.payload.id === index
      ? { ...point, ...{ coords: action.payload.coords } }
      : point
  )),
}, initialState);
