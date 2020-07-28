import React, { Component } from 'react';
import { Consumer } from "../../context"
// import { v1 as uuid } from "uuid";
import TextInputLayout from "../layout/TextInputLayout"

import axios from "axios"

// import {Route} from "react-router-dom"
// import home from "../../App";
// import uuid from "uuid";
class EditContact extends Component {

state = {
    name: "",
    email: "",
    phone: "",
    error: {}
}

async componentDidMount(){
    const {id}=this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;
    this.setState({
        name:contact.name,
        email:contact.email,
        phone:contact.phone
    })
}


onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
}

onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;
    if (name === '') {
        this.setState({ error: { name: "Name is required" } })
        return;
    }

    if (email === '') {
        this.setState({ error: { email: "Email is required" } })
        return;
    }

    if (phone === "") {
        this.setState({ error: { phone: "Phone is required" } })
        return;
    }
const updContact={
    name,email,phone
}
const {id}=this.props.match.params;
// console.log(updContact)
const res=await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact);
console.log(res.data);
dispatch({type:'UPDATE_CONTACT',payload:res.data});

    this.setState({
        name: "",
        email: "",
        phone: "",
        error: {}
    })
    {/* <Link to="/"></Link> */ }
    this.props.history.push('/');
    {/* <Route component={home}></Route> */ }
}


render() {
    const { name, email, phone, error } = this.state;

    return (
        <Consumer>
            {value => {
                const { dispatch } = value;
                return (
                    <div className="card mb-3">
                        <div className="card-header">Edit Contact</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
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

                                <input type="submit" value="Update Contact" className="btn btn-light btn-block"></input>
                            </form>
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )


}
}

export default EditContact;