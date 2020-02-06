import React, { Component } from 'react';
import '../index.css';

class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'body_' + this.props.id,
        };
    }

    componentDidMount() {
        document.getElementById(this.state.id).value = this.props.text;
    }

    render() {
        return (
            <div className='body'>
                <form>
                    <textarea
                        className='body'
                        id={ this.state.id }
                        name='body'
                    ></textarea>
                </form>
            </div>
        );
    }
}

export default Body;