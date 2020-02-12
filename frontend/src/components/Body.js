import React, { Component } from 'react';
import '../index.css';
import { API, IDEAS_QUERY } from '../App';

class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'body_' + this.props.id,
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

            fetch(API + IDEAS_QUERY + '/' + this.props.id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: event.target.value,
                })
            })

            this.props.onWidgetChange();
        }
    }

    render() {
        return (
            <div className='body'>
                <form>
                    <textarea
                        className='body'
                        id={ this.state.id }
                        name='body'
                        onMouseOut = { this.handleChange }
                    ></textarea>
                </form>
            </div>
        );
    }
}

export default Body;