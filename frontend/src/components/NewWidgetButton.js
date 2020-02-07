import React from 'react';
import '../index.css'

function NewWidgetButton(props) {
    return (
        <div className='new_widget_button'>
            <button onClick={ props.onChange }>
                New Idea
            </button>
        </div>
    );
}

export default NewWidgetButton;