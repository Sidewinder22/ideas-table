import React, { Component } from 'react';
import '../index.css';

export class SavedNotification extends Component {
    componentDidMount() {
        document.getElementById('saved_notif_label').style = 'visibility:hidden';
    }

    showNotification() {
        document.getElementById('saved_notif_label').style = 'visibility:visible';

        setTimeout(
            () => {
                document.getElementById('saved_notif_label').style = 'visibility:hidden';
            },
            1700
        );
    }

    render() {
        return (
            <div className='notification'>
                <label id='saved_notif_label'>All Changes Saved</label>
            </div>
        )
    }
}
