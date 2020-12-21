import React, { Component } from 'react';
import Holders from '../holders';


class api extends Component{
  constructor(props) {
   super(props);
   this.state = { count: 10000,
                addnewval:0,
                  value:null };
 }
 optionchange=(event)=>{
   event.preventDefault();
   console.log(event.target.value);
 }
 handleChange=(event)=> {
   console.log(event.target.value);
    this.setState({value: event.target.value});
  }
 mySubmitHandler = (event) => {
event.preventDefault();
 let val=this.state.count;
 let sval=this.state.addnewval;
 let snv=val-sval;
 this.setState({count:snv});
 }
 myChangeHandler = (event) => {


   //console.log(event.target.value);
   let newval=event.target.value;
   this.setState({addnewval: newval});
 }


  async componentDidMount() {
    const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json',{

        method : 'GET',
        headers :{

          'Content-Type':'application/json',
          'Accept-Encoding':'gzip, deflate, br',
          'Access-Control-Allow-Origin':'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json',
          'Accept':'*/*'

    }});
    const data = await response.json();
    this.setState({data: data[this.props.id].name });
    this.setState({discount: data[this.props.id] });
    console.log(data[0].name);
  }

  check_discount(){
    return this.state.fiction === 'fiction' ? 'you got discount' : 'no discount';
  }




  render(){
    return(
         <div>
  <h1>balance: {this.state.count}</h1>
    <form onSubmit={this.mySubmitHandler}>

    ENTER THE AMOUNT TO SEND:<input onChange={this.myChangeHandler} type="text" name="amount"></input>
    <input type="submit"></input>
    </form>

  SELECT WHO TO SEND  <select onChange={this.handleChange} name="holder" id="cars">
      {Holders.map(item => {
          return (<option value={item.Image}> {item.name}{item.id}</option>);

      })}
  </select>
<img src={this.state.value}></img>

</div>




    );
  }

  formatCount(){
    const {value} = this.props;
    return value === 0 ? 'Zero' : value;
  }
}

export default api;
