import React, { Component } from 'react'
import '../index.css'
import InputText from './InputText';

const API = 'http://127.0.0.1:5000/api/' ;
const IDEA_QUERY = 'idea/';

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'title_' + this.props.id,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.getElementById(this.state.id).value = this.props.text;
    }

    handleChange(event) {
        document.getElementById(this.state.id).value = event.target.value;

        fetch(API + IDEA_QUERY + this.props.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: event.target.value,
            })
        })
    }

    render() {
        return (
            <div className='title'>
                <InputText
                    class_name = 'title'
                    type = 'text'
                    id = { this.state.id }
                    name = 'title'
                    onChange = { this.handleChange }
                />
            </div>
        );
    }
}

export default Title;