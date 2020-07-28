import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Consumer } from "../../context"
import {Link} from "react-router-dom"
import axios from "axios";

class Contact extends Component{
state={
    showContactInfo:false
}

onDeleteClick=async(id,dispatch)=>{
try{
await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)

    dispatch({type:"DELETE_CONTACT",payload:id});
}catch(e){
    dispatch({ type: "DELETE_CONTACT", payload: id });
}
}


    render(){
    const { contact } = this.props;
const {showContactInfo}=this.state;
const {id}=contact;
return(
<Consumer>
    {value=>{
        const {dispatch}=value;
        return(
            <div className="card card-body mb-3">
                <h4>{contact.name}  <i onClick={() =>
                    this.setState({ showContactInfo: !this.state.showContactInfo })
                }
                    className="fa fa-sort-down"
                    style={{ cursor: 'pointer' }}
                ></i>

                    <i className="fa fa-times" style={{
                        cursor: 'pointer', float: 'right',
                        color: 'red'
                    }} onClick={this.onDeleteClick.bind(this,id,dispatch)}></i> 
                    
         <Link to={`contact/edit/${contact.id}`}
         >
<i className="fa fa-pencil"
style={{
    cursor:'pointer',
    float:'right',
    color:'black',
    marginRight:'1rem'
}}
></i>
         </Link>

                    </h4>

                {showContactInfo ? (<ul className="list-group">
                    <li className="list-group-item">Email: {contact.email}</li>
                    <li className="list-group-item">Phone: {contact.phone}</li>
                </ul>) : null}
            </div>
        )
    }}
</Consumer>


    )
}

}


export default Contact;