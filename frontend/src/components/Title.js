import React, { Component } from 'react'
import '../index.css'
import InputText from './InputText';

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'title_' + this.props.id,
        };
    }

    componentDidMount() {
        document.getElementById(this.state.id).value = this.props.text;
    }

    render() {
        return (
            <div className='title'>
                <InputText
                    class_name = 'title'
                    type = 'text'
                    id = { this.state.id }
                    name = 'title'
                />
            </div>
        );
    }
}

export default Title;