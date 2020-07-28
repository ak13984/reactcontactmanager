import React, { Component } from 'react'
import PropTypes from "prop-types"
import classnames from "classnames"

const TextInputLayout=({
    label,
    name,
    value,
    placeholder,
    type,
    onChange,
    error
})=>{
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name}
                className= {classnames(`form-control
                form-control-lg`,{
                    'is-invalid':error
                })}  placeholder={placeholder}
                value={value}
                onChange={onChange}></input>
                {error && <div className="invalid-feedback">{error}</div>
                 }
        </div>
    );
};


// const TextInputLayout=(props)=>{
// props.type,props.label (ise upar wale tarike se kra hai)
// }

TextInputLayout.propTypes={
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    error:PropTypes.string

}

TextInputLayout.defaultProps={
    type:'text'
}

export default TextInputLayout;