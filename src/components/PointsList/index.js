import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { dragPoint } from '../../redux/modules/points';
import Point from '../Point';

const PointsList = ({
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
            <Draggable key={item.key} draggableId={item.key} index={index}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item.value}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const enhance = connect(state => ({ points: state.points }), { dragAction: dragPoint });

export default enhance(PointsList);

PointsList.propTypes = {
  dragAction: PropTypes.func.isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      coords: PropTypes.array,
      key: PropTypes.number,
      value: PropTypes.string,
    }),
  ).isRequired,
}
