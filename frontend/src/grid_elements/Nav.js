import React, { Component } from 'react';
import '../index.css';
import { API } from '../App';

const QUERY = 'categories' + '?username=';

export class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        const access_token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username')

        fetch(API + QUERY + username, {
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
            <div className='category'>
                { categories }
            </div>
        );
    }

    render() {
        return (
            <>
                <div className='title'>
                    <h2>Category</h2>
                </div>
                <button className='clean_button' onClick={ this.props.onCleanSpecificCategoryClick }>Clean category</button>
                { this.showCategories() }
            </>
        );
    }
}
