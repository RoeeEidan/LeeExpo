import React from 'react';
// import NewOrder from './NewOrder';
import { FoodMenu } from './FoodMenu';

const Time = [10, 15, 20, 30, 45];
const Special = ['Allergy', 'Special', 'Same-Time'];


class FoodButton extends React.Component {
    render() {
        const SpecialButtonArray = [];
        const TimeButtonArray = [];
        const FoodButtonArray = [];
        // FoodButtonArray.push(<div className='SpecialButtonDiv'>)
        for (let i = 0; i < Special.length; i++) {
            SpecialButtonArray.push(
                <button onClick={() => { this.props.FoodClick(Special[i]) }} className={'SingleSpecialButton '+Special[i]}>{Special[i]}</button>
            )
        }
        for (let i = 0; i < Time.length; i++) {
            TimeButtonArray.push(
                <button onClick={() => { this.props.FoodClick(Time[i]) }} className='SingleTimeButton'>{Time[i]}</button>
            )
        }

        for (let i = 0; i < FoodMenu.length; i++) {
            if(9<=i && i <= 15){
              FoodButtonArray.push(
                    <button onClick={() => { this.props.FoodClick(FoodMenu[i].name) }} className='SingleFoodButton LightGray'>{FoodMenu[i].name}</button>
                )  
            }else if(i>15){
                FoodButtonArray.push(
                    <button onClick={() => { this.props.FoodClick(FoodMenu[i].name) }} className='SingleFoodButton Gray'>{FoodMenu[i].name}</button>
                )
            }else{
                FoodButtonArray.push(
                    <button onClick={() => { this.props.FoodClick(FoodMenu[i].name) }} className='SingleFoodButton'>{FoodMenu[i].name}</button>
                )
            }
        }



        return (
            <div className={'col-md-6 ButtonsDiv'} >
                <div className='SpecialButtonsDiv'>
                    {SpecialButtonArray}
                </div>
                <div className='TimeButtonsDiv'>
                    {TimeButtonArray}
                </div>
                <div className='FoodButtonsDiv'>
                    {FoodButtonArray}
                    <button className='Undo' onClick={this.props.Undo}>
                        Undo
                    </button>
                </div>
            </div>
        )
    }
}
export default FoodButton;