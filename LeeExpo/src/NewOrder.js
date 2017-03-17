import React from 'react';
import Input from './Input';
import { OpenInput } from './FoodMenu';




class NewOrder extends React.Component {

    constructor() {
        super()
        this.state = {
            ulHeight: ''

        }
    }



    componentDidUpdate() {
        let myCheck = document.getElementById("myCheck").offsetHeight;
        let ulHeight = 543 - myCheck;
        if (this.state.ulHeight !== ulHeight) {
            this.setState({
                ulHeight: ulHeight
            })
        }
    }
    componentDidMount() {
        let myCheck = document.getElementById("myCheck").offsetHeight;
        let ulHeight = 543 - myCheck;
        if (this.state.ulHeight !== ulHeight) {
            this.setState({
                ulHeight: ulHeight
            })
        }
    }

    render() {
        let ulStyle = { height: this.state.ulHeight }
        console.log('Table Number is  ' + this.props.TableNumber);
        const title = 'Table Number';
        return (
            <div className='col-md-3 NewOrder'>
                <div className='Title' id='myCheck'>
                    <h2 >{title}</h2>
                    <Input
                        value={this.props.TableNumber}
                        onChange={this.props.onTableNumberChange}
                    />
                    {this.props.AllergyRender}
                </div>
                <ul className='orderlist' id='OrderListID' style={ulStyle}
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