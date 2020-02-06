import React, { Component } from 'react'
import '../index.css';
import InputText from './InputText';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'category_' + this.props.id,
        };
    }

    componentDidMount() {
        document.getElementById(this.state.id).value = this.props.text;
    }

    render() {
        return (
            <div className='category'>
                <InputText
                    class_name = 'category'
                    type = 'text'
                    id = { this.state.id }
                    name = 'category'
                />
            </div>
        );
    }
}

export default Category;