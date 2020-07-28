import React, { Component } from 'react';
import {Consumer} from "../../context"
import { v1 as uuid } from "uuid"; 
import TextInputLayout from "../layout/TextInputLayout"

import axios from "axios"

// import {Route} from "react-router-dom"
// import home from "../../App";
// import uuid from "uuid";
class AddContact extends Component {

state={
    name:"",
    email:"",
    phone:"",
    error:{}
}

onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}

onSubmit=async(dispatch,e)=>{
    e.preventDefault();

    const {name,email,phone}=this.state;
if(name===''){
    this.setState({error:{name:"Name is required"}})
return;
}

if(email===''){
    this.setState({error:{email:"Email is required"}})
return;
}

if(phone===""){
    this.setState({error:{phone:"Phone is required"}})
return;
}

const newContact={
    name:name,email:email,phone:phone
}

  const res= await axios.post("https://jsonplaceholder.typicode.com/users",newContact)
  
  dispatch({type:'ADD_CONTACT',payload:newContact});
this.setState({
 name:"",
 email:"",
 phone:"",
 error:{}   
})
{/* <Link to="/"></Link> */}
this.props.history.push('/');
{/* <Route component={home}></Route> */}
}


    render() {
        const{name,email,phone,error}=this.state;

return(
    <Consumer>
        {value=>{
            const {dispatch}=value;
return(
    <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                <TextInputLayout label="Name"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={this.onChange}
                error={error.name}
                />

                <TextInputLayout label="Email"
                    name="email"
                    TYPE="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={this.onChange}
                   error={error.email}
               />
                <TextInputLayout label="Phone"
                    name="phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={this.onChange}
                    error={error.phone}
                />

                <input type="submit" value="Add Contact" className="btn btn-light btn-block"></input>
            </form>
        </div>
    </div>
)
        }}
    </Consumer>
)


    }
}

export default AddContact;