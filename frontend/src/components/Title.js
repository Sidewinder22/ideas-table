import React, { Component } from 'react'
import '../index.css'
import InputText from './InputText';

//const API = 'http://127.0.0.1:5000/api/ideas/' ;
const API = 'http://167.172.183.173:5000/api/ideas/' ;

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

            fetch(API + this.props.id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
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