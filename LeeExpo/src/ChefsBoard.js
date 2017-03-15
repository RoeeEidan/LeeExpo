import React, { Component } from 'react';
import { FoodMenu, MenuItem } from './FoodMenu';

class ChefsBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MaxHeight:'',
            ChefsBoard: this.props.ChefsBoardState,
            OldChefsBoard: [],
        }
        this.SingleDishOnClick = this.SingleDishOnClick.bind(this);
        this.HandleCock = this.HandleCock.bind(this);
        this.HeightFunc=this.HeightFunc.bind(this);
    }

    HeightFunc(){
        let htmlBoard=document.getElementById("ChefsBoard")//.childNodes
        let MaxHeight = htmlBoard.offsetHeight
        this.setState({
            MaxHeight:MaxHeight
        })
    }

    HandleCock(ChefsBoardIndex) {
        let ThisFoodOrder = this.state.ChefsBoard[ChefsBoardIndex].FoodOrder;
        let TrackObject = {
            TotaleTime: 0,
            LongCurrentTime: 0,
            OldTime: 0
        }
        for (let g = 0; g < ThisFoodOrder.length; g++) {

            console.log(g)
            console.log(typeof ThisFoodOrder[g]);
            if (typeof ThisFoodOrder[g] === 'string') {
                console.log('it was a string')
            } else if (typeof ThisFoodOrder[g] === 'object') {
                if (TrackObject.LongCurrentTime < ThisFoodOrder[g].time) {
                    TrackObject.LongCurrentTime = ThisFoodOrder[g].time
                }
                if (TrackObject.TotaleTime === 0) {
                    let Board = this.state.ChefsBoard;
                    Board[ChefsBoardIndex].FoodOrder[g].state = 2
                    this.setState({
                        ChefsBoard: Board
                    })
                    let I = ChefsBoardIndex;
                    let a = g;
                    let T = Board[ChefsBoardIndex].FoodOrder[g].time;
                    setTimeout(() => {
                        let VeryNewBoard = this.state.ChefsBoard;
                        VeryNewBoard[I].FoodOrder[g].state = 3;
                        this.setState({
                            ChefsBoard: Board
                        })
                    },T*1000)
                } else {
                    let Time = (TrackObject.TotaleTime) + (TrackObject.OldTime) - (ThisFoodOrder[g].time);
                    let MyIndex = ChefsBoardIndex;
                    let w = g;
                    setTimeout(() => {
                        console.log(w);
                        console.log(MyIndex)
                        let Board = this.state.ChefsBoard;
                        Board[MyIndex].FoodOrder[w].state = 1
                        console.log('Timeout Passed start cocking')
                        this.setState({
                            ChefsBoard: Board
                        })
                    }, Time * 1000, w, MyIndex)
                }
            } else if (typeof ThisFoodOrder[g] === 'number') {
                TrackObject.OldTime = TrackObject.LongCurrentTime;
                TrackObject.TotaleTime += ThisFoodOrder[g];
                TrackObject.LongCurrentTime = 0;

            } else {
                console.log(typeof ThisFoodOrder[g])
                console.log('ERRORRRRR')
            }
        }
    }

    SingleDishOnClick(IndexObject) {
        if (this.state.ChefsBoard[IndexObject.ChefsBoardIndex].FoodOrder[IndexObject.FoodOrderIndex].state === 1) {
            let NewChefsBoard = this.state.ChefsBoard;
            NewChefsBoard[IndexObject.ChefsBoardIndex].FoodOrder[IndexObject.FoodOrderIndex].state++;
            this.setState({
                ChefsBoard: NewChefsBoard
            });
            let BoardIndex = IndexObject.ChefsBoardIndex;
            let FoodIndex = IndexObject.FoodOrderIndex;
            let ThisTime = NewChefsBoard[IndexObject.ChefsBoardIndex].FoodOrder[IndexObject.FoodOrderIndex].time;
            setTimeout(() => {
                console.log('dish settimeout passed')
                let VeryNewChefsBoard = this.state.ChefsBoard;
                VeryNewChefsBoard[BoardIndex].FoodOrder[FoodIndex].state++;
                this.setState({
                    ChefsBoard: VeryNewChefsBoard
                })
            }, ThisTime * 1000);
        } else if (this.state.ChefsBoard[IndexObject.ChefsBoardIndex].FoodOrder[IndexObject.FoodOrderIndex].state === 3) {
            let NewChefsBoard = this.state.ChefsBoard;
            NewChefsBoard[IndexObject.ChefsBoardIndex].FoodOrder[IndexObject.FoodOrderIndex].state++;
            this.setState({
                ChefsBoard: NewChefsBoard
            })
        }
        else if (this.state.ChefsBoard[IndexObject.ChefsBoardIndex].FoodOrder[IndexObject.FoodOrderIndex].state === 4) {
            let NewChefsBoard = this.state.ChefsBoard;
            NewChefsBoard[IndexObject.ChefsBoardIndex].FoodOrder[IndexObject.FoodOrderIndex].state--;
            this.setState({
                ChefsBoard: NewChefsBoard
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        let OldChefsBoard = this.state.ChefsBoard;
        console.log(nextProps)
        this.setState({
            OldChefsBoard: OldChefsBoard,
            ChefsBoard: nextProps.ChefsBoardState,
            TableNumber: nextProps.TableNumber,
            Allergy: nextProps.Allergy,
            ThisOrder: nextProps.ThisOrder
        })
    }
    componentDidMount() {
        let x = localStorage.getItem("ChefsOldBoard"); //x is just for the JSON.parse
        let LastChefsBoard = JSON.parse(x);
        let OldLength = LastChefsBoard.length;
        let NewLength = this.state.ChefsBoard.length;
        if (NewLength > OldLength) {
            for (let i = OldLength; i < NewLength; i++) {
                this.HandleCock(i);
            }
        } else if (OldLength === NewLength) {
            console.log('ChefsBoard didnt change')
            // for (let i = 0; i < NewLength; i++) {
            //     this.HandleCock(i);
            // }
        } else {
            for (let i = 0; i < NewLength; i++) {
                this.HandleCock(i);
            }
        }
        this.HeightFunc()
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    componentWillUnmount() {
        localStorage.setItem("ChefsOldBoard", JSON.stringify(this.state.ChefsBoard));
        console.log('setting the LS')
    }

    render() {
        let HeightStyle ={ height:(this.state.MaxHeight-1)}
        let NewChefsBoard = [];
        for (let i = 0; i < this.state.ChefsBoard.length; i++) { //buildes the display for each table
            let NewFoodOrder = [];
            for (let x = 0; x < this.state.ChefsBoard[i].FoodOrder.length; x++) { // Loops throu each order
                if (typeof this.state.ChefsBoard[i].FoodOrder[x] === 'string') {
                    console.log('was same time or allergy or special')
                }
                else if (typeof this.state.ChefsBoard[i].FoodOrder[x] === 'object') {

                    // STYLEING STUFF
                    let DishColor = 'blue';
                    // let Transition = '1.5s';
                    // let Border = '2px solid black';
                    if (this.state.ChefsBoard[i].FoodOrder[x].state === 0) { //when the dish is just waiting
                        DishColor = '#c4c4c4'
                    }
                    if (this.state.ChefsBoard[i].FoodOrder[x].state === 1) { //when the dish neeeds to cock
                        DishColor = '#FF1469'
                        // Transition = `${this.state.ChefsBoard[i].FoodOrder[x].time * 2}s`
                    }
                    if (this.state.ChefsBoard[i].FoodOrder[x].state === 2) {//when a dish is cocking
                        DishColor = 'black'
                    }
                    if (this.state.ChefsBoard[i].FoodOrder[x].state === 3) {//when a dish is ready to pickup
                        DishColor = '#20BFFF'
                    }
                    if (this.state.ChefsBoard[i].FoodOrder[x].state === 4) {//when a dish got sent
                        DishColor = '#9BB7BF'
                    }
                    // if (this.state.ChefsBoard[i].FoodOrder[x].state >= 4 && this.state.ChefsBoard[i].FoodOrder[x].state % 2 === 0) { //ready to pick up
                    //     DishColor = 'green'
                    // }
                    // if (this.state.ChefsBoard[i].FoodOrder[x].needtofire === true) {
                    //     DishColor = 'green';
                    // }
                    NewFoodOrder.push(<div style={{
                        color: DishColor
                    }} onClick={() => { this.SingleDishOnClick({ ChefsBoardIndex: i, FoodOrderIndex: x }) }} className='SingleDish' > {this.state.ChefsBoard[i].FoodOrder[x].name}</div>)
                } else if (typeof this.state.ChefsBoard[i].FoodOrder[x] === 'number') {
                    NewFoodOrder.push(<div className='BoardNumber'>{this.state.ChefsBoard[i].FoodOrder[x]}</div>)
                } else { console.log(' shouldnt log') }
            }
            NewChefsBoard.push(
                <div className='col-md-1 SingleOrder' style={HeightStyle}>
                    <div className='TableNumberDiv'>
                        {this.state.ChefsBoard[i].TableNumber}
                    </div>
                    <div className='AllergyDiv'>
                        {this.state.ChefsBoard[i].Allergy}
                    </div>
                    <div>
                        {NewFoodOrder}
                    </div>
                </div>
            )
        }
        return (
            <div className='row ChefsBoard' id='ChefsBoard'>
                {NewChefsBoard}
            </div>
        )
    }
}

export default ChefsBoard;