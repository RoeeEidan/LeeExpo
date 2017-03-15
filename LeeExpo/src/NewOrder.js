import React from 'react';
import Input from './Input';

class NewOrder extends React.Component{
    render(){
        console.log('Table Number is  '+this.props.TableNumber);
    const title='Table Number';
        return(
                <div className='col-md-3 NewOrder'>
                    <div className='Title' id='myCheck'>
                        <h2 >{title}</h2>
                        <Input
                            value={this.props.TableNumber}
                            onChange={this.props.onTableNumberChange}
                        />
                        {this.props.AllergyRender}
                     </div>
                    <ul className='orderlist' id='OrderListID'
                    >
                        {this.props.Order}
                    </ul>

                    <button 
                        onClick={this.props.HandleSendClick} 
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