import React, { Component } from 'react';
import '../index.css';
import { API } from '../App';

const CATEGORIES_QUERY = 'categories';

export class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        fetch(API + CATEGORIES_QUERY, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            })
            .then(response => response.json())
            .then(categories =>  {
                let categoriesConverted = JSON.parse(categories);

                categoriesConverted.sort();                
                this.setState({ categories: categoriesConverted });
        });
    }

    showCategories() {
        let categories_list = this.state.categories.map((category, index) => {
            return (
                <div key={index}>
                    {/* <li> */}
                        <button className='category_button' value={ category } onClick={ this.props.onCategoryClick }>{ category }</button>
                    {/* </li> */}
                </div>
            );
        });

        return (
            <div className='nav_category'>
                {/* <ul> */}
                    { categories_list }
                {/* </ul> */}
            </div>
        );
    }

    render() {
        return (
            <nav>
            <h2>Category</h2>
                { this.showCategories() }
            </nav>
        );
    }
}