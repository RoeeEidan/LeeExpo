import React from 'react';
import { Link } from 'react-router';
import { FoodMenu, MenuItem } from './FoodMenu';
import _ from 'lodash';
import axios from 'axios';
import $ from 'jquery';

let BottomBorder = '3px solid #A32C23';
let ChefsBoardStyle = {};
let NewOrderStyle = { borderBottom: BottomBorder };

const SpecialArray = ['Special', 10, 15, 20, 30, 45];

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Time:'',
            Display: 'inherit',
            ChefsBoard: [],
            ThisOrder: [],
            Allergy: '',
            TableNumber: ''
        }
        this.passStates = [];
        this.Current_DB_ID = '';
        this.ThisTime = '';


        this.onChange = this.onChange.bind(this);
        this.onAllergyChange = this.onAllergyChange.bind(this);
        this.HandleFoodClick = this.HandleFoodClick.bind(this);
        this.HandleSendClick = this.HandleSendClick.bind(this);
        this.onTableNumberChange = this.onTableNumberChange.bind(this);
        this.onSpecialChange = this.onSpecialChange.bind(this);
        this.onOrderClick = this.onOrderClick.bind(this);
        this.RemoveOrder = this.RemoveOrder.bind(this);
        this.Undo = this.Undo.bind(this);
        this.NewNight = this.NewNight.bind(this);
        this.PostWithID = this.PostWithID.bind(this);
        this.CurrentTime = this.CurrentTime.bind(this);
        this.OpenInput=this.OpenInput.bind(this);
        this.OpenSpecialInput=this.OpenSpecialInput.bind(this);
    }
    OpenSpecialInput(){
        let MyInput = $('.Special2');
        let MyInput2 = MyInput[MyInput.length-1]
        console.log({MyInput2})
        let MySpecialInput = MyInput2.childNodes[3].firstChild;
        MySpecialInput.focus();
    }
    componentDidUpdate(){
        if(this.state.Allergy===' '){
            this.OpenInput()
        }else if(this.state.ThisOrder[this.state.ThisOrder.length-1]==='Special' && this.state.ThisOrder[this.state.ThisOrder.length-2].special === ''){
            this.OpenSpecialInput()
        }
    }
    CurrentTime() {
        var Time = new Date();
        var Hours = Time.getHours();
        let Minuts = Time.getMinutes().toString();
        if(Minuts.length === 1){
            Minuts = '0'+Minuts;
        }
        let ThisTime = Hours +':'+ Minuts;
        return ThisTime;
    }

    PostWithID(id, NewOrder) {
        axios.post(`http://localhost:3032/NewOrder/${id}`, {
            NewOrder
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    NewNight(NewOrder) {
        axios.post('http://localhost:3032/NewService', {

        })
            .then((response) => {
                this.Current_DB_ID = response.data;
                this.PostWithID(response.data, NewOrder)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    Undo() {
        if (this.state.ThisOrder[this.state.ThisOrder.length - 1] === 'Allergy' && this.state.Allergy !== '') {
            if (this.passStates.length > 0) {
                console.log(this.passStates)
                let MyState = this.passStates[this.passStates.length - 1];
                this.setState({
                    Display: MyState.Display,
                    ChefsBoard: MyState.ChefsBoard,
                    ThisOrder: MyState.ThisOrder,
                    Allergy: MyState.Allergy,
                    TableNumber: MyState.TableNumber
                })
                this.passStates.pop();
            } else { console.log('nothing has been done yet') }
            this.Undo()
        } else {
            if (this.passStates.length > 0) {
                console.log(this.passStates)
                let MyState = this.passStates[this.passStates.length - 1];
                this.setState({
                    Display: MyState.Display,
                    ChefsBoard: MyState.ChefsBoard,
                    ThisOrder: MyState.ThisOrder,
                    Allergy: MyState.Allergy,
                    TableNumber: MyState.TableNumber
                })
                this.passStates.pop();
            } else { console.log('nothing has been done yet') }
        }
    }
    RemoveOrder(OrderIndex) {
        console.log(this.state)
        let NewState = this.state;
        NewState.ChefsBoard[OrderIndex].Display = 'none';
        this.passStates.push(_.cloneDeep(this.state))
        this.setState({
            ChefsBoard: NewState.ChefsBoard,
            // StatesArray:NewState.StatesArray
        })
        console.log(this.state)
    }
    onOrderClick() {
        ChefsBoardStyle = {};
        NewOrderStyle = {
            borderBottom: BottomBorder,
            transition: '0.3s'
        }
    }
    onBoardClick() {
        ChefsBoardStyle = {
            borderBottom: BottomBorder,
            transition: '0.3s'
        };
        NewOrderStyle = {}
    }
    onChange(event) {
        console.log(event)
    }
    HandleSendClick() {
        this.ThisTime=this.CurrentTime();
        let NewBoard = this.state.ChefsBoard;
        let NewOrder = {
            Time:'',
            Allergy: '',
            TableNumber: '',
            FoodOrder: []
        };
        NewOrder.Time = this.ThisTime;
        NewOrder.Allergy = this.state.Allergy;
        NewOrder.TableNumber = this.state.TableNumber;
        NewOrder.FoodOrder = this.state.ThisOrder;
        NewBoard.push(NewOrder);

        if (this.Current_DB_ID !== '') {
            axios.post(`http://localhost:3032/NewOrder/${this.Current_DB_ID}`, {
                NewOrder
            })
                .then(function (response) {
                    // console.log(this.state)
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (this.Current_DB_ID === '') {
            this.NewNight(NewOrder);
        }
        // let ThisTime = this.CurrentTime();
        this.passStates.push(_.cloneDeep(this.state))
        this.setState({
            ChefsBoard: NewBoard,
            ThisOrder: [],
            TableNumber: '',
            Allergy: '',
        })
        this.ThisTime=''
    }
    onSpecialChange(event) {
        let ThisState = this.state;//.ThisOrder;
        if (ThisState.ThisOrder !== [] && typeof ThisState.ThisOrder[ThisState.ThisOrder.length - 2] === 'object') {
            ThisState.ThisOrder[ThisState.ThisOrder.length - 2].special = event;
            this.passStates.push(_.cloneDeep(this.state))
            this.setState({
                ThisOrder: ThisState.ThisOrder,
            })
        } else (console.log('ERROR'))
    }
    onTableNumberChange(event) {
        this.passStates.push(_.cloneDeep(this.state))
        this.setState({
            TableNumber: event,
        })
    }
    onAllergyChange(event) {
        this.passStates.push(_.cloneDeep(this.state))
        this.setState({
            Allergy: event,
        })
    }
    OpenInput(){
            let MyInput = $('.AllergyInput').children().children()[0];
            MyInput.focus();
            // console.log(MyInput)
    }
    HandleFoodClick(x) {
        if (x === 'Allergy') {
            this.setState({
                Allergy: ' '
            })
        }
        var OrderList = document.getElementById("OrderListID");
        if (OrderList.scrollHeight > 410) {
            OrderList.scrollTop = (OrderList.scrollHeight)
        }
        let y = 2;
        const NewThisOrder = this.state.ThisOrder;
        if (x === 'Same-Time') {
            this.passStates.push(_.cloneDeep(this.state))
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
                this.passStates.push(_.cloneDeep(this.state))
                NewThisOrder.push(SpecialArray[q])
                this.setState({
                    ThisOrder: NewThisOrder,
                })
            }
        }
        for (let i = 0; i < FoodMenu.length; i++) {//loops throu the food menu to look for a match
            if (x === FoodMenu[i].name) {
                this.passStates.push(_.cloneDeep(this.state))
                NewThisOrder.push(new MenuItem(FoodMenu[i].name, FoodMenu[i].time));
                this.setState({
                    ThisOrder: NewThisOrder,
                })
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
                    onSpecialChange: this.onSpecialChange,
                    RemoveOrder: this.RemoveOrder,
                    Undo: this.Undo,
                    NewNight: this.NewNight

                })}
            </div>
        )
    }
}
export default Navbar;