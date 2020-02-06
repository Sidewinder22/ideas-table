import React from 'react'
import '../index.css'

function InputText(props) {
    return (
        <form>
            <input
                className = { props.class_name }
                type = { props.text }
                id = { props.id }
                name = { props.name }
                onChange = { props.onChange }
            />
        </form>
    );
}

export default InputText;