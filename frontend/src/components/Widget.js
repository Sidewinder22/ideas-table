import React, { Component } from 'react';
import '../index.css';
import Body from './Body';
import Category from './Category';
import CloseButton from './CloseButton';
import Title from './Title';

function Id(props) {
    return (
        <div className='id'>
           { props.id }
        </div>
    )
}

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
                <div className='title_bar'>
                    <Id
                        id = { this.props.id }
                    />
                    <Title
                        id = { this.props.id }
                        text = { this.props.title }
                        onWidgetChange = { this.props.onWidgetChange }
                    />
                    <CloseButton
                        id = { this.props.id }
                        onChange = { this.props.onCloseButtonChange }
                    />
                </div>
               <Category
                    id = { this.props.id }
                    text = { this.props.category }
                    onWidgetChange = { this.props.onWidgetChange }
                />
                <Body
                    id = { this.props.id }
                    text = { this.props.body }
                    onWidgetChange = { this.props.onWidgetChange }
                />
                <Timestamp
                    timestamp = { this.props.timestamp }
                />
            </div>
        );
    }
}

export default Widget;