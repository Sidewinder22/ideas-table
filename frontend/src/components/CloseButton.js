import React, { Component } from 'react';
import '../index.css';

class CloseButton extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(this.props.id)
    }

    render() {
        return (
            <div className='close_button'>
                <button onClick={ this.handleChange }>
                    X
                </button>
            </div>
        );
    }
}

export default CloseButton;