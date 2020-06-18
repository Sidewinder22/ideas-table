import React from 'react';
import '../index.css';

export function SortList(props) {
    return (
            <form onChange={ props.onChange }>
                <select class='select_list' name='sort_type'>
                    <option>ID</option>
                    <option>Title</option>
                    <option>Category</option>
                    <option>Date</option>
                </select>
            </form>
    );
}
