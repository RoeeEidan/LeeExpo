import React from 'react';
import { Link } from 'react-router';
import { FoodMenu, MenuItem } from './FoodMenu';
let BottomBorder = '3px solid #2d3047';
let ChefsBoardStyle = {};
let NewOrderStyle = { borderBottom: BottomBorder };

const SpecialArray = ['Special', 'Allergy', 10,15, 20, 30, 45];

class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            ChefsBoard: [],
            ThisOrder: [],
            Allergy: '',
            TableNumber: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onAllergyChange = this.onAllergyChange.bind(this);
        this.HandleFoodClick = this.HandleFoodClick.bind(this);
        this.HandleSendClick = this.HandleSendClick.bind(this);
        this.onTableNumberChange = this.onTableNumberChange.bind(this);
        this.onSpecialChange = this.onSpecialChange.bind(this);
        this.onOrderClick = this.onOrderClick.bind(this);
    }
    onOrderClick(){
        ChefsBoardStyle = {};
        NewOrderStyle = { borderBottom: BottomBorder,
                          transition:'0.3s' }  
    }
    onBoardClick(){
        ChefsBoardStyle = { borderBottom: BottomBorder,
                            transition:'0.3s' };
        NewOrderStyle = {}  
    }
    onChange(event) {
        console.log(event)
    }
    HandleSendClick() {
        console.log(this.state.ChefsBoard)
        let NewBoard = this.state.ChefsBoard;
        let NewOrder = {
            Allergy: '',
            TableNumber: '',
            FoodOrder: []
        };
        NewOrder.Allergy = this.state.Allergy;
        NewOrder.TableNumber = this.state.TableNumber;
        NewOrder.FoodOrder = this.state.ThisOrder;
        NewBoard.push(NewOrder);
        console.log(NewBoard)
        this.setState({
            ChefsBoard: NewBoard,
            ThisOrder: [],
            TableNumber: '',
            Allergy: ''
        })
    }
    onSpecialChange(event) {
        let ThisOrder = this.state.ThisOrder;
        if (ThisOrder !== []) {
            ThisOrder[ThisOrder.length - 2].special = event;
            this.setState({
                ThisOrder: ThisOrder
            })
        }
    }
    onTableNumberChange(event) {
        console.log(event)
        this.setState({
            TableNumber: event
        })
    }
    onAllergyChange(event) {
        console.log(this.state.Allergy)
        this.setState({
            Allergy: event
        })
    }
    HandleFoodClick(x) {
        console.log('this is runing')
        var OrderList = document.getElementById("OrderListID");
        if (OrderList.scrollHeight > 480) {
            OrderList.scrollTop = (OrderList.scrollHeight)
        }
        let y = 2;
        const NewThisOrder = this.state.ThisOrder;
        if (x === 'Same-Time') {
            NewThisOrder.push('Same-Time')
            while ((isNaN(NewThisOrder[(NewThisOrder.length - y)])) && (y <= NewThisOrder.length)) {
                if ((typeof NewThisOrder[(NewThisOrder.length - y)]) === 'object') {
                    NewThisOrder[(NewThisOrder.length - y)].sametime = 'Same-Time';
                }
                y++
            }
            this.setState({
                ThisOrder: NewThisOrder
            })
        }
        for (let q = 0; q < SpecialArray.length; q++) {//loops throu Special array to look for a match
            if (x === SpecialArray[q]) {
                NewThisOrder.push(SpecialArray[q])
                this.setState({
                    ThisOrder: NewThisOrder
                })
                // console.log('state has bee changed')
            }
        }
        for (let i = 0; i < FoodMenu.length; i++) {//loops throu the food menu to look for a match
            if (x === FoodMenu[i].name) {
                NewThisOrder.push(new MenuItem(FoodMenu[i].name, FoodMenu[i].time))
                this.setState({
                    ThisOrder: NewThisOrder
                })
                // console.log('state did ')
            }
        }
    }
    componentWillUpdate() {
        console.log('NavBar')
    }

    render() {
        // console.log(this.HandleSendClick);
        return (
            <div className='NavBarDiv'>
                <Link to='/'> <div className='NavBarLeftButton' onClick={this.onOrderClick}> <div style={NewOrderStyle} className=' NavBarOrderButton'>NEW ORDER</div> </div></Link>
                <Link to='/ChefsBoard'> <div className='NavBarRightButton' onClick={this.onBoardClick}> <div style={ChefsBoardStyle} className='NavBarBoardButton'>CHEFS BOARD</div> </div> </Link>
                {React.cloneElement(this.props.children, {
                    ChefsBoardState: this.state.ChefsBoard,
                    ThisOrder: this.state.ThisOrder,
                    Allergy: this.state.Allergy,
                    TableNumber: this.state.TableNumber,
                    HandleSendClick: this.HandleSendClick,
                    onChange: this.onChange,
                    onTableNumberChange: this.onTableNumberChange,
                    onAllergyChange: this.onAllergyChange,
                    HandleFoodClick: this.HandleFoodClick,
                    onSpecialChange:this.onSpecialChange

                })}
            </div>
        )
    }
}
export default Navbar;