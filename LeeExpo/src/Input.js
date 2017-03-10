import React from 'react';
import KeyboardedInput from 'react-touch-screen-keyboard';
import 'react-touch-screen-keyboard/src/Keyboard.css';
 
class Input extends React.Component {
  render() {
    return (
      <KeyboardedInput
        enabled
        type={this.props.type}
        onChange={this.props.onChange}
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}      
        defaultKeyboard="de"
        secondaryKeyboard="us" // optional 
      />
    );
  }
}
export default Input;