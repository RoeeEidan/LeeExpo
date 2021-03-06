import React, { Component } from 'react';
import _ from 'lodash';

class ChefsBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MaxHeight: '',
            ChefsBoard: this.props.ChefsBoardState,
            OldChefsBoard: [],
        }
        this.SingleDishOnClick = this.SingleDishOnClick.bind(this);
        this.HandleCock = this.HandleCock.bind(this);
        // this.HeightFunc = this.HeightFunc.bind(this);
    }

    // HeightFunc() {
    //     let htmlBoard = document.getElementById("ChefsBoard")//.childNodes
    //     let MaxHeight = htmlBoard.offsetHeight
    //     this.setState({
    //         MaxHeight: MaxHeight
    //     })
    // }

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
                if (ThisFoodOrder[g].sametime === 'Same-Time' && g === 0) { //if the first cource is same time
                    while (ThisFoodOrder[g] !== 'Same-Time') {
                        if (ThisFoodOrder[g].time > TrackObject.LongCurrentTime) {
                            TrackObject.LongCurrentTime = ThisFoodOrder[g].time;
                        }
                        g++
                        console.log(g)
                    }
                    for (let x = 0; x < g; x++) {
                        let MyIndex = ChefsBoardIndex;
                        let w = x;
                        setTimeout(() => {
                            let Board = this.state.ChefsBoard;
                            if (typeof Board[MyIndex].FoodOrder[w] === 'object') {
                                Board[MyIndex].FoodOrder[w].state = 1
                                this.setState({
                                    ChefsBoard: Board
                                })
                            }
                        }, (TrackObject.LongCurrentTime - ThisFoodOrder[x].time) * 2000 , MyIndex , w)
                    }
                } else {
                    if (TrackObject.LongCurrentTime < ThisFoodOrder[g].time) {
                        TrackObject.LongCurrentTime = ThisFoodOrder[g].time
                    }
                    if (TrackObject.TotaleTime === 0) {//if this is the first cource
                        let Board = this.state.ChefsBoard;
                        Board[ChefsBoardIndex].FoodOrder[g].state = 2
                        this.setState({
                            ChefsBoard: Board
                        })
                        let I = ChefsBoardIndex;
                        let T = Board[ChefsBoardIndex].FoodOrder[g].time;
                        setTimeout(() => {
                            let VeryNewBoard = this.state.ChefsBoard;
                            if (typeof VeryNewBoard[I].FoodOrder[g] === 'object') {
                                VeryNewBoard[I].FoodOrder[g].state = 3;
                                this.setState({
                                    ChefsBoard: Board
                                })
                            }
                        }, T * 2000, I, g)
                    } else if (TrackObject.TotaleTime > 0) {
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
                        }, Time * 2000, w, MyIndex)
                    }
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
                console.log('dish settimeout passed, border index is ' + BoardIndex)
                let VeryNewChefsBoard = this.state.ChefsBoard;
                VeryNewChefsBoard[BoardIndex].FoodOrder[FoodIndex].state++;
                this.setState({
                    ChefsBoard: VeryNewChefsBoard
                })
            }, ThisTime * 2000);
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
        else { console.log('its not time to click on it') }
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
        console.log(LastChefsBoard)
        let OldLength = LastChefsBoard.length;
        let NewLength = this.state.ChefsBoard.length;
        if (NewLength > OldLength) {
            for (let i = OldLength; i < NewLength; i++) {
                this.HandleCock(i);
            }
        } else if (OldLength === NewLength) {
            console.log('ChefsBoard didnt change')
        } else {
            for (let i = 0; i < NewLength; i++) {
                this.HandleCock(i);
            }
        }
        // this.HeightFunc()
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
        // if(localStorage.getItem("ChefsOldBoardLength")){
        // let x = localStorage.getItem("ChefsOldBoardLength")
        //     x = parseInt(x)
        //     x += this.state.ChefsBoard.length
        // }
        localStorage.setItem("ChefsOldBoard", JSON.stringify(this.state.ChefsBoard));
    }

    render() {
        let NewChefsBoard = [];
        let CleanChefsBoard = _.cloneDeep(this.state.ChefsBoard);
        // _.remove(CleanChefsBoard, function (n) {
        //     return n.Display === 'none';
        // });
        for (let i = 0; i < CleanChefsBoard.length; i++) { //buildes the display for each table
            let NewFoodOrder = [];
            if (CleanChefsBoard[i].Display !== 'none') {
                for (let x = 0; x < CleanChefsBoard[i].FoodOrder.length; x++) { // Loops throu each order
                    if (typeof CleanChefsBoard[i].FoodOrder[x] === 'object') {

                        // STYLEING STUFF
                        let Opacity = '';
                        let DishColor = 'blue';
                        let BorderTop = '';
                        let BorderBottom = ''

                        if (CleanChefsBoard[i].FoodOrder[x].sametime === 'Same-Time' &&
                            (typeof CleanChefsBoard[i].FoodOrder[x - 1] === 'number'
                                || x === 0)) {
                            BorderTop = '2px solid #2d3047'
                        } if (CleanChefsBoard[i].FoodOrder[x].sametime === 'Same-Time' &&  //object includes same time
                            (typeof CleanChefsBoard[i].FoodOrder[x + 2] === 'number' || //next intem is num 
                                x === CleanChefsBoard[i].FoodOrder.length - 2)) {//
                            BorderBottom = '2px solid #2d3047'
                        }
                        if (CleanChefsBoard[i].FoodOrder[x].state === 0) { //when the dish is just waiting
                            DishColor = '#85858A'
                        }
                        if (CleanChefsBoard[i].FoodOrder[x].state === 1) { //when the dish neeeds to cock
                            DishColor = '#FF1469'
                        }
                        if (CleanChefsBoard[i].FoodOrder[x].state === 2) {//when a dish is cocking
                            DishColor = 'black'
                        }
                        if (CleanChefsBoard[i].FoodOrder[x].state === 3) {//when a dish is ready to pickup
                            DishColor = '#5C6CF3'
                        }
                        if (CleanChefsBoard[i].FoodOrder[x].state === 4) {//when a dish got sent
                            DishColor = '#DBDBE3'
                        }
                        NewFoodOrder.push(<div style={{
                            color: DishColor,
                            borderTop: BorderTop,
                            borderBottom: BorderBottom,
                            opacity: Opacity
                        }} onClick={() => { this.SingleDishOnClick({ ChefsBoardIndex: i, FoodOrderIndex: x }) }} className='SingleDish' > {CleanChefsBoard[i].FoodOrder[x].name}</div>)
                        if (CleanChefsBoard[i].FoodOrder[x].special !== '') {
                            let specialBorderBottom = '';
                            let Green = '#D1DBBD'
                            if (CleanChefsBoard[i].FoodOrder[x].state === 3 || CleanChefsBoard[i].FoodOrder[x].state === 1) {
                                Green = '#0BAE45'
                            } if (CleanChefsBoard[i].FoodOrder[x + 2] === 'Same-Time') {
                                specialBorderBottom = '2px solid #2d3047'
                            }
                            let SpecialStyle = { color: Green, borderBottom: specialBorderBottom };
                            NewFoodOrder.push(
                                <div style={SpecialStyle} className='SpecialInstructions'>{CleanChefsBoard[i].FoodOrder[x].special}</div>
                            )
                        }
                    } else if (typeof CleanChefsBoard[i].FoodOrder[x] === 'number') {
                        NewFoodOrder.push(<div className='BoardNumber'>***{CleanChefsBoard[i].FoodOrder[x]}***</div>)
                    } else { }
                }
                let SingleOrderStyle = { /*height: (this.state.MaxHeight - 1),*/ display: CleanChefsBoard[i].Display };
                let AllergyDivStyle;
                if (CleanChefsBoard[i].Allergy !== '') {
                    AllergyDivStyle = { backgroundColor: 'black', opacity: '0.3' }
                } else if (CleanChefsBoard[i].Allergy === '') {
                    AllergyDivStyle = { backgroundColor: 'black', opacity: '0.1' }
                }
                // let BoardTable
                NewChefsBoard.push(
                    <div className='col-md-1 OrderDiv flex-container flex-item' style={SingleOrderStyle}>
                        <div className='TimeDiv'>
                            {CleanChefsBoard[i].Time}
                        </div >
                        <div className='SingleOrder flex-container flex-item' style={SingleOrderStyle}>
                            <div className='TableNumberDiv'>
                                {CleanChefsBoard[i].TableNumber}
                            </div>
                            <div className='AllergyDiv' style={AllergyDivStyle}>
                                {CleanChefsBoard[i].Allergy}
                            </div>
                            <div className='SingleFoodOrder flex-item'>
                                {NewFoodOrder}
                            </div>
                            <div className='RemoveDiv flex-item'>
                                <button className='RemoveButton' onClick={() => { this.props.RemoveOrder(i) }}>X</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        let ChefsBoradStyle = { borderBottom: '10px solid #222' }
        let RenderedChefsBoard = _.chunk(NewChefsBoard, 12)
        // if(RenderedChefsBoard.length > 1){
        //     ChefsBoradStyle.borderBottom='10px solid #222'
        // }
        /*let FinallRender = RenderedChefsBoard.map(function (obj) {
            return (<div className='row ChefsBoard flex-container' id='ChefsBoard' style={ChefsBoradStyle}>
                {obj}
            </div>);
        });*/
        let FinallRender = [];
        for (let c = 0; c < RenderedChefsBoard.length; c++) {
            if (RenderedChefsBoard.length > 1 && c !== RenderedChefsBoard.length - 1) {
                FinallRender.push(<div className='row ChefsBoard flex-container' id='ChefsBoard' style={ChefsBoradStyle}>
                    {RenderedChefsBoard[c]}
                </div>)

            }
            else {
                FinallRender.push(<div className='row ChefsBoard flex-container' id='ChefsBoard'>
                    {RenderedChefsBoard[c]}
                </div>)
            }
        }
        return (
            <div className='BigChefsBoard'>
                {FinallRender}
            </div>
        )
    }
}

export default ChefsBoard;