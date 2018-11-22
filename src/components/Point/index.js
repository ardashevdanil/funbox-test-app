import PropTypes from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Point = ({
  deleteAction,
  draggableId,
  index,
  value,
}) => (
  <Draggable
    draggableId={draggableId}
    index={index}
  >
    {provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {value}
        <button onClick={() => deleteAction(index)}>
          X
        </button>
      </div>
    )}
  </Draggable>
);

export default Point;

Point.propTypes = {
  deleteAction: PropTypes.func.isRequired,
  draggableId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
}
