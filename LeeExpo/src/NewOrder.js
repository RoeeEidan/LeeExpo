import React from 'react';
import Input from './Input';

const ulStyle = {
    minHeight: 480,
    maxHeight:480,
    overflowY:'scroll'

}

const style={
    height:660,
    backgroundColor:'white',
    display:'inline-block',
    overflow:'auto',
    margin:30,
    marginLeft:60
}

class NewOrder extends React.Component{
    render(){
    const title='New Order';
        return(
                <div className='col-md-3'  style={style}>
                    <h1 >{title}</h1>
                    <ul className='orderlist' id='OrderListID'
                    style={ulStyle}
                    >
                        {this.props.Order}
                    </ul>
                    <div 
                    className='tablenumber'
                    /*style={InputStyle}*/
                    >
                        Table Number: <Input 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        />
                    </div> 
                    <button 
                        /*style={ButtonStyle} */
                        onClick={this.props.HandleClick} 
                        type="button" 
                        className="btn SendButton" 
                        id="sendbutton"
                        >
                        Send
                    </button>              
                </div>
        )
    }
}
export default NewOrder;