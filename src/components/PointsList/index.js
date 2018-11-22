import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { deletePoint, dragPoint } from '../../redux/modules/points';
import Point from '../Point';

const PointsList = ({
  deleteAction,
  dragAction,
  points,
}) => (
  <DragDropContext

    // FIX: doesn't update state while dragging
    onDragEnd={result => {
      if (!result.destination) return;
      dragAction({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      });
    }}
  >
    <Droppable droppableId='droppable'>
      {provided => (
        <div
          ref={provided.innerRef}
        >
          {points.map((item, index) => (
            <Point
              deleteAction={deleteAction}
              draggableId={item.key}
              index={index}
              key={item.key}
              value={item.value}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const enhance = connect(
  state => ({ points: state.points }),
  { deleteAction: deletePoint, dragAction: dragPoint },
);

export default enhance(PointsList);

PointsList.propTypes = {
  deleteAction: PropTypes.func.isRequired,
  dragAction: PropTypes.func.isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      coords: PropTypes.array,
      key: PropTypes.number,
      value: PropTypes.string,
    }),
  ).isRequired,
}
