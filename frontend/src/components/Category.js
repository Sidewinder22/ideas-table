import React, { Component } from 'react'
import '../index.css';
import InputText from './InputText';

const API = 'http://127.0.0.1:5000/api/ideas/' ;

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'category_' + this.props.id,
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
                    category: event.target.value,
                })
            })
        }
    }

    render() {
        return (
            <div className='category'>
                <InputText
                    class_name = 'category'
                    type = 'text'
                    id = { this.state.id }
                    name = 'category'
                    onChange = { this.handleChange }
                />
            </div>
        );
    }
}

export default Category;