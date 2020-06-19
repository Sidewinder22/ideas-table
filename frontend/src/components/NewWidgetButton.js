import React from 'react';
import '../index.css'

export function NewWidgetButton(props) {
    return (
        <button className='new_widget_button' onClick={ props.onChange }>
            New Idea
        </button>
    );
}
