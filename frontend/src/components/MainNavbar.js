import React from 'react';
import '../index.css';
import NewWidgetButton from '../components/NewWidgetButton';
import SavedNotification from '../components/SavedNotification';
import { SortList } from '../components/SortList';

export function MainNavbar(props) {
    return (
        <div className='ideas_bar'>
            <SavedNotification
            savedNotifCallback = { props.savedNotifCallback }
            />

            <h1>Ideas</h1>

            <NewWidgetButton
            onChange = { props.NewWidgetButtonChange }
            />

            <SortList 
            onChange = { props.onSortListChange } 
            /> 
        </div>
    );
}