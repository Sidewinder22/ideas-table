import React, { Component } from 'react';
import '../index.css';

function Title(props) {
    return (
        <div className='title'>
            <h2>{ props.title }</h2>
        </div>
    )
}

function Category(props) {
    return (
        <div className='category'>
            <h3>{ props.category }</h3>
        </div>
    );
}

function Body(props) {
    return (
        <div className='body'>
            <p>{ props.body }</p>
        </div>
    );
}

function Timestamp(props) {
    return (
        <div className='timestamp'>
            <p>{ props.timestamp }</p>
        </div>
    );
}

class ReadyWidget extends Component {
    render() {
        return (
            <div className='widget'>
                <Title
                    title = { this.props.title }/>
                <Category
                    category = { this.props.category } />
                <Body
                    body = { this.props.body } />
                <Timestamp
                    timestamp = { this.props.timestamp } />
            </div>
        );
    }
}

export default ReadyWidget;