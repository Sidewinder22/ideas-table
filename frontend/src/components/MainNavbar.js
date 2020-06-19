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
            <div className='main_navbar'>

                <div className='element'>
                <SavedNotification
                    ref = { this.savedNotificationElement }
                />
                </div>

                <div className='element'>
                <div className='title'>
                    <h1>Ideas</h1>
                </div>
                </div>

                <div className='element'>
                <NewWidgetButton
                    onChange = { this.props.newWidgetButtonChange }
                />
                </div>

                <div className='element'>
                <SortList
                    onChange = { this.props.onSortListChange }
                />
                </div>
            </div>
        );
    }
}
