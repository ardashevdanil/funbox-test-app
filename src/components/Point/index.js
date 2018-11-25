import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Point = ({
  classes,
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
        <Chip
          className={classes.chip}
          clickable
          color='primary'
          onDelete={() => deleteAction(index)}
          label={value}
          variant='outlined'
        />
      </div>
    )}
  </Draggable>
);

const styles = theme => ({
  chip: {
    width: 'calc(100% - 4px)',
    margin: '2px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
  }
});

export default withStyles(styles)(Point);

Point.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteAction: PropTypes.func.isRequired,
  draggableId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
}
