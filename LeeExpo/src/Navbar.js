import React from 'react';
import { Link } from 'react-router';
import { FoodMenu, MenuItem } from './FoodMenu';
import {MakeNewStateArray , SingleState} from './History'
// import $ from 'jquery';

let BottomBorder = '3px solid #2d3047';
let ChefsBoardStyle = {};
let NewOrderStyle = { borderBottom: BottomBorder };

const SpecialArray = ['Allergy', 'Special', 10,15, 20, 30, 45];

class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            StatesArray:[],
            Display:'inherit',
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
        this.RemoveOrder = this.RemoveOrder.bind(this);
        // this.Undo = this.Undo.bind(this);
        // this.NewOldState = this.NewOldState.bind(this);
        // this.MakeNewState = this.MakeNewState.bind(this);
        // this.NewStatesArray=this.NewStatesArray.bind(this);
        // this.OpenInput=this.OpenInput.bind(this);
    }
    // MakeNewState(state){
    //     this.StatesArray=state.StatesArray,
    //     this.Display=state.Display,
    //     this.ChefsBoard=state.ChefsBoard,
    //     this.ThisOrder=state.ThisOrder,
    //     this.Allergy=state.Allergy,
    //     this.TableNumber=state.TableNumber
    // }
//     function Menu(name ,time){
//     this.menu = [];
//     this.newitem = function(name , time ){
//             const NewEntry = new MenuItem(name ,time);
//             this.menu.push(NewEntry);
//             return this;
//     }
// };
    // NewStatesArray(inState){
    //     this.StatesArray = this.state.StatesArray;
    //     this.History=(inState)=>{
    //         const NewEntry = new this.MakeNewState(inState);
    //         this.StatesArray.push(NewEntry)
    //         return this;
    //     }
    // }

//     Undo(){
//         console.log(this.state)
//         console.log('Undoing')
//         if(this.state.StatesArray.length > 0){
//             let NewState=this.state;
//             let LastState= NewState.StatesArray[NewState.StatesArray.length-2];
//             this.setState({
//                 StatesArray:LastState.StatesArray,
//                 Display:LastState.Display,
//                 ChefsBoard:LastState.ChefsBoard,
//                 ThisOrder:LastState.ThisOrder,
//                 Allergy:LastState.Allergy,
//                 TableNumber:LastState.TableNumber
//             })
//         }else(console.log('didnt do anything'))
// }   
        RemoveOrder(OrderIndex){
        let NewState=this.state;
        // NewState.StatesArray.push(new this.MakeNewState(NewState))
        NewState.ChefsBoard[OrderIndex].Display = 'none';
        this.setState({
            ChefsBoard:NewState.ChefsBoard,
            // StatesArray:NewState.StatesArray
        })
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
        // let NewState=this.state;
        // NewState.StatesArray.push(new this.MakeNewState(NewState));
        this.setState({
            ChefsBoard: NewBoard,
            ThisOrder: [],
            TableNumber: '',
            Allergy: '',
            // StatesArray:NewState.StatesArray
        })
    }
    onSpecialChange(event) {
        let ThisState = this.state;//.ThisOrder;
            // ThisState.StatesArray.push(new this.MakeNewState(ThisState));
        if (ThisState.ThisOrder !== []) {
            ThisState.ThisOrder[ThisState.ThisOrder.length - 2].special = event;
            this.setState({
                ThisOrder: ThisState.ThisOrder,
                // StatesArray: ThisState.StatesArray
            })
        }
    }
    onTableNumberChange(event) {
        // console.log(event)
        // let NewState=this.state;
        // NewState.StatesArray.push(new this.MakeNewState(NewState));
        this.setState({
            TableNumber: event,
            // StatesArray: NewState.StatesArray
        })
    }
    onAllergyChange(event) {
        // let NewState=this.state;
        // NewState.StatesArray.push(new this.MakeNewState(NewState));
        // console.log(this.state.Allergy)
        this.setState({
            Allergy: event,
            // StatesArray: NewState.StatesArray
        })
    }
    // OpenInput(){
    //     $(document).ready(function() {
    //         let myCheck = $("#myCheck");
    //         console.log(myCheck)
            
    //     })
    // }
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
            // let NewState=this.state;
            // NewState.StatesArray.push(new this.MakeNewState(NewState));
            this.setState({
                ThisOrder: NewThisOrder,
                // StatesArray: NewState.StatesArray       
            })
        }
        for (let q = 0; q < SpecialArray.length; q++) {//loops throu Special array to look for a match
            if (x === SpecialArray[q]) {
                // let NewState=this.state;
                // NewState.StatesArray.push(new this.MakeNewState(NewState));
                NewThisOrder.push(SpecialArray[q])
                this.setState({
                    ThisOrder: NewThisOrder,
                    // StatesArray: NewState.StatesArray 
                })
                // console.log('state has bee changed')
            }
        }
        for (let i = 0; i < FoodMenu.length; i++) {//loops throu the food menu to look for a match
            if (x === FoodMenu[i].name) {
                // let NewState=this.state;
                // console.log(NewState)
                // const NewOne=new MakeNewStateArray({NewState})
                // console.log(this.state.StatesArray)
                // console.log(NewOne)
                // console.log(NewThisOrder);
                NewThisOrder.push(new MenuItem(FoodMenu[i].name, FoodMenu[i].time));
                this.setState({
                    ThisOrder: NewThisOrder,
                    // StatesArray: NewOne 
                })
                // console.log('state did ')
            }
        }
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
                    onSpecialChange:this.onSpecialChange,
                    RemoveOrder:this.RemoveOrder,
                    Undo:this.Undo

                })}
            </div>
        )
    }
}
export default Navbar;