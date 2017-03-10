import React from 'react';
// import ReactDOM from 'react-dom';

class TimeButton extends React.Component{

    render(){

        return(
            <button onClick={() => {this.props.handleClickButton(this.props.text)}} type="button" className="btn food time">
                        {this.props.text}
            </button>
        )
    }
}
export default TimeButton;