import React, { Component } from 'react'
import '../index.css'
import InputText from './InputText';
import { API, IDEAS_QUERY } from '../App';

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'title_' + this.props.id,
            text: this.props.text,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.getElementById(this.state.id).value = this.props.text;
    }

    handleChange(event) {
        if (this.state.text !== event.target.value) {
            this.setState({text: event.target.value})

            const access_token = localStorage.getItem('access_token');

            fetch(API + IDEAS_QUERY + '/' + this.props.id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`,
                },
                body: JSON.stringify({
                    title: event.target.value,
                })
            })

            this.props.onWidgetChange();
        }
    }

    render() {
        return (
            <InputText
                class_name = 'title'
                type = 'text'
                id = { this.state.id }
                name = 'title'
                onChange = { this.handleChange }
            />
        );
    }
}

export default Title;
