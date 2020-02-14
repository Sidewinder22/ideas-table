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
        let categories = this.state.categories.map((category, index) => {
            return (
                <div key={index}>
                    <button
                        className='category_button'
                        value={ category } 
                        onClick={ this.props.onSpecificCategoryClick }
                    >
                        { category }
                    </button>
                </div>
            );
        });

        return (
            <div className='nav_category'>
                { categories }
            </div>
        );
    }

    render() {
        return (
            <nav>
                <h2>Category</h2>
                <button className='clean_cat_button' onClick={ this.props.onCleanSpecificCategoryClick }>Clean category</button>
                { this.showCategories() }
            </nav>
        );
    }
}