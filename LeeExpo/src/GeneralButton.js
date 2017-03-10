import React from 'react';
// import ReactDOM from 'react-dom';

class GeneralButton extends React.Component{

    render(){

        return(
            <button onClick={() => {this.props.handleClickButton(this.props.text)}} type="button" className={this.props.classes}>
                        {this.props.text}
            </button>
        )
    }
}
export default GeneralButton;