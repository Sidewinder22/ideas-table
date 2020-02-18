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
        const user_logged = localStorage.getItem('user_logged');

        if (user_logged) {
            const access_token = localStorage.getItem('access_token');

            fetch(API + CATEGORIES_QUERY, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `JWT ${access_token}`,
                }
                })
                .then(response => response.json())
                .then(categories =>  {
                    let categoriesConverted = JSON.parse(categories);

                    categoriesConverted.sort();                
                    this.setState({ categories: categoriesConverted });
                })
                .catch(error => {
                    console.error(error);
                    return { name: "network error", description: ""};
                });
        }
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
            <>
                {/* <h2>Category</h2> */}
                <button className='clean_cat_button' onClick={ this.props.onCleanSpecificCategoryClick }>Clean category</button>
                { this.showCategories() }
            </>
        );
    }
}