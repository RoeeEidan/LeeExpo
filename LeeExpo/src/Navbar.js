import React from 'react';
import { Link } from 'react-router';

const styleDiv = {
    width:'100%',
    height: '100%'
}
const styleButton ={
    width:'49.7%',
    display:'inline-block',
    textAlign:'center',
    backgroundColor:'black',
    height:37,
    color:'white',
    paddingTop:9
}

class Navbar extends React.Component{
    render(){
        return(
            <div style={styleDiv}>
           <Link to='/'> <div style={styleButton}>Order</div></Link>
           <Link to='/Board'> <div style={styleButton}>Board</div></Link>
           {React.cloneElement(this.props.children)}
           </div>
        )
    }
}
export default Navbar;