import React, { Component } from 'react';
import '../index.css';
import Body from './Body';
import Category from './Category';
import Title from './Title';

function Timestamp(props) {
    return (
        <div className='timestamp'>
            <p>{ props.timestamp }</p>
        </div>
    );
}

class Widget extends Component {
    render() {
        return (
            <div className='widget'>
                <Title
                    id = { this.props.id }
                    text = { this.props.title }/>
                <Category
                    id = { this.props.id }
                    text = { this.props.category } />
                <Body
                    id = { this.props.id }
                    text = { this.props.body } />
                <Timestamp
                    timestamp = { this.props.timestamp } />
            </div>
        );
    }
}

export default Widget;