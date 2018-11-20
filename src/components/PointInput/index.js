import PropTypes from 'prop-types';
import React from 'react';

class PointInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleEnterPress(e) {
    if (e.keyCode === 13) {
      if (this.state.inputValue === '') return;

      this.props.onEnterPress(this.state.inputValue);
      this.setState( {inputValue: ''} );
    }
  }

  render() {
    return (
      <div className='point-input'>
        <input
          placeholder='Enter a point name'
          type='text'
          onChange={this.handleChange}
          onKeyDown={this.handleEnterPress}
          value={this.state.inputValue}
        />
      </div>
    );
  }
}

PointInput.propTypes = {
  onEnterPress: PropTypes.func.isRequired,
}

export default PointInput;