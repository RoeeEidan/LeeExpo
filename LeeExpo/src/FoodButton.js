import React from 'react';
import NewOrder from './NewOrder';
import FoodMenu from './FoodMenu';

const DivStyle={
    padding:30,
    height:720,
    width:'65%',
    display:'inline-block',
    overflow:'auto'    
}
const Time=[10,20,30,45];
const Special=['Same-Time','Special','Allergy'];


const style={height:'10%',
             width:'20%',
             margin:8    
            }



class FoodButton extends React.Component{
    render(){
        const FoodButtonArray=[];
        for(let i=0; i<Time.length; i++){
            FoodButtonArray.push(
                <button onClick={()=>{this.props.FoodClick(Time[i])}} style={style}>***{Time[i]}***</button>
            )
        }

        for(let i=0; i<FoodMenu.length; i++){
            FoodButtonArray.push(
                <button onClick={()=>{this.props.FoodClick(FoodMenu[i].name)}} style={style}>{FoodMenu[i].name}</button>
            )
        }

        for(let i=0; i<Special.length; i++){
            FoodButtonArray.push(
                <button onClick={()=>{this.props.FoodClick(Special[i])}} style={style}>{Special[i]}</button>
            )
}

        return(
           <div className={'col-md-6' } style={DivStyle}>
                {FoodButtonArray}
           </div>
        )
    }
}
export default FoodButton;