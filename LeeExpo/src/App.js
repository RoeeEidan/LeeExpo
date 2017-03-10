import React, { Component } from 'react';
import NewOrder from './NewOrder';
import FoodButton from './FoodButton';
import FoodMenu from './FoodMenu';
import './App.css';


const Special=['Same-Time','Special','Allergy',10,20,30,45];

const style={
  backgroundColor:'wheat',
  height:'100%'
}

class App extends Component {
  constructor(){
  super()
  this.state={
    ThisOrder:[]
  }
  this.onChange=this.onChange.bind(this)
  this.HandleClick = this.HandleClick.bind(this)
}
onChange(event){
  console.log(event)
}
HandleClick(x){
  var OrderList = document.getElementById("OrderListID");
  OrderList.scrollTop = (OrderList.scrollHeight + 200);
  // console.log(x)
  const NewThisOrder = this.state.ThisOrder;
  for(let q=0; q<Special.length; q++){//loops throu Special array to look for a match
    if(x===Special[q]){
      NewThisOrder.push(Special[q])
      this.setState({
        ThisOrder:NewThisOrder
      })
      // console.log('state has bee changed')
    }
  }
  for(let i=0; i<FoodMenu.length; i++){//loops throu the food menu to look for a match
    if(x===FoodMenu[i].name){
      console.log('thers a match')
      NewThisOrder.push(FoodMenu[i])
      this.setState({
        ThisOrder:NewThisOrder
      })
      console.log('state did ')
    }
  }
}
  render() {
    const ThisOrderArray = [];
    for(let i=0; i<this.state.ThisOrder.length; i++){//loops throu the order array
      for(let w=0; w<Special.length; w++){ // loops throu the time and special array
        if(Special[w]===this.state.ThisOrder[i]){//checks if thers a match
          if(Number.isInteger(Special[w])){ //checks if its a number
            ThisOrderArray.push(<p>*** {this.state.ThisOrder[i]} ***</p>)
          }else{//we are already after a match to time and special array so if thers no match with numbers so thers with special
            ThisOrderArray.push(<p>{this.state.ThisOrder[i]}</p>)
          }
        }
      }
      for(let z=0; z<FoodMenu.length; z++){//loops thro the manu to check match
        if(this.state.ThisOrder[i]===FoodMenu[z]){
          ThisOrderArray.push(<p>{this.state.ThisOrder[i].name}</p>)
        }
      }
      // ThisOrderArray.push(
      //   <p>{this.state.ThisOrder[i]}</p>
      // )
    }
    
    return (
      <div style={style} className="App row">
        <NewOrder 
        Order={ThisOrderArray}
        value={this.props.route.value}
        onChange={this.onChange}
        HandleClick={this.HanldeClick}
        />
        <FoodButton FoodClick={this.HandleClick}/>
      </div>
    );
  }
}

export default App;
