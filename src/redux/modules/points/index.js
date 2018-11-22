import { createAction, handleActions } from 'redux-actions';

import { reorder } from '../../../utils/reorder';

export const addPoint = createAction('ADD_POINT');
export const deletePoint = createAction('DELETE_POINT');
export const dragPoint = createAction('DRAG_POINT');
export const setPointCoords = createAction('SET_POINT_COORDS');

const initialState = [];

export const pointsReducer = handleActions({
  [addPoint]: (state, action) => [...state, action.payload],
  [deletePoint]: (state, action) => state.filter((point, index) => (
    index !== action.payload ? true : false
  )),
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
