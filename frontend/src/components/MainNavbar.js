import React, { Component } from 'react';
import '../index.css';
import { NewWidgetButton } from '../components/NewWidgetButton';
import { SavedNotification } from '../components/SavedNotification';
import { SortList } from '../components/SortList';

export class MainNavbar extends Component {
    constructor(props) {
        super(props)

        this.savedNotificationElement = React.createRef();
    }

    showNotification() {
        this.savedNotificationElement.current.showNotification();
    }

    render() {
        return (
            <div className='ideas_bar'>
                <SavedNotification
                ref = { this.savedNotificationElement }
                />

                <h1>Ideas</h1>

                <NewWidgetButton
                onChange = { this.props.newWidgetButtonChange }
                />

                <SortList 
                onChange = { this.props.onSortListChange } 
                /> 
            </div>
        );
    }
}