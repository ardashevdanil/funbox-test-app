import { createAction, handleActions } from 'redux-actions';

export const addPoint = createAction('ADD_POINT');
export const deletePoint = createAction('DELETE_POINT');
export const setPointCoords = createAction('SET_POINT_COORDS');
export const setPointPosition = createAction('SET_POINT_POSITION');

const initialState = [];

export const pointsReducer = handleActions({
  [addPoint]: (state, action) => [...state, action.payload],
  [deletePoint]: (state, action) => state.filter((point, index) => (
    index !== action.payload ? true : false
  )),
  [setPointCoords]: (state, action) => state.map((point, index) => (
    action.payload.id === index
      ? { ...point, ...{ coords: action.payload.coords } }
      : point
  )),
  [setPointPosition]: (state, action) => state.map((point, index) => (
    action.payload.id === index
      ? { ...point, ...{ position: action.payload.position } }
      : point
  )),
}, initialState);
