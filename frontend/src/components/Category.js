import React, { Component } from 'react'
import '../index.css';
import InputText from './InputText';
import { API, IDEAS_QUERY } from '../App';

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

            const access_token = localStorage.getItem('access_token');
            
            fetch(API + IDEAS_QUERY + '/' + this.props.id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`,
                },
                body: JSON.stringify({
                    category: event.target.value,
                })
            })

            this.props.onWidgetChange();
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