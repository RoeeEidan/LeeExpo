import React, { Component } from 'react';
import NewOrder from './NewOrder';
import FoodButton from './FoodButton';
import {FoodMenu} from './FoodMenu';
import Input from './Input';
import './../SassStyle.css';

const SpecialArray = ['Special', 'Allergy', 10,15, 20, 30, 45];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ChefsBoard: this.props.ChefsBoardState,
      ThisOrder: this.props.ThisOrder,
      Allergy: this.props.Allergy,
      TableNumber: this.props.TableNumber
    }
    // this.Checking=this.Checking.bind(this);
  }
  // Checking(){
  //   let div = document.getElementById("myCheck");
  //   let input = div.lastChild.children;
  //   // console.log(input.click);
  //   input.click();
  // }
  componentWillReceiveProps(nextProps){
    this.setState({
      ChefsBoard:nextProps.ChefsBoardState,
      TableNumber:nextProps.TableNumber,
      Allergy:nextProps.Allergy,
      ThisOrder:nextProps.ThisOrder
    })
  }

  render() {
    // console.log(this.state.ThisOrder)
    const AllergyRender = [];
    const ThisOrderArray = [];
    if (this.state.ThisOrder.length !== 0) {
      for (let i = 0; i < this.state.ThisOrder.length; i++) {//loops throu the order array
        if (this.state.ThisOrder[i] === 'Allergy') {
          AllergyRender.push(<p className='Allergy'>
            {this.state.ThisOrder[i]}
            <Input
              value={this.props.value}
              onChange={this.props.onAllergyChange}
            />
             {/*{this.Checking()}*/}
          </p>)

        } else if (this.state.ThisOrder[i] === 'Special') {
          ThisOrderArray.push(<p className='Special2'>
            {this.state.ThisOrder[i]}
            <Input
              value={this.props.value}
              onChange={this.props.onSpecialChange}
            />
          </p>)
        } else if (this.state.ThisOrder[i] === 'Same-Time') {
          ThisOrderArray.push(<p className='Same-Time2'>{this.state.ThisOrder[i]}</p>)
        }
        else {
          for (let w = 2; w < SpecialArray.length; w++) { // loops throu the time and special array
            if (SpecialArray[w] === this.state.ThisOrder[i]) {//checks if thers a match
              if (Number.isInteger(SpecialArray[w])) { //checks if its a number
                ThisOrderArray.push(<p className='Number'>*** {this.state.ThisOrder[i]} ***</p>)
              } else {//we are already after a match to time and special array so if thers no match with numbers so thers with special
                // ThisOrderArray.push(<p>{this.state.ThisOrder[i]}</p>)
                console.log('this shouldnt log')
              }
            }
          }
          for (let z = 0; z < FoodMenu.length; z++) {//loops thro the manu to check match
            if (this.state.ThisOrder[i].name === FoodMenu[z].name) {
              console.log('theres a march')
              ThisOrderArray.push(<p>{this.state.ThisOrder[i].name}</p>)
            }
          }
        }
      }
    }
    return (
      <div className="OrderPage row">
        <NewOrder
          Order={ThisOrderArray}
          AllergyRender={AllergyRender}
          value={this.props.value}
          onChange={this.props.onChange}
          TableNumber={this.state.TableNumber}
          onTableNumberChange={this.props.onTableNumberChange}
          onAllergyChange={this.props.onAllergyChange}
          HandleSendClick={this.props.HandleSendClick}
        />
        <FoodButton FoodClick={this.props.HandleFoodClick} />
      </div>
    )
  }
}



export default App;
