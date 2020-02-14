import React, { Component } from 'react';
import '../index.css';
import { sortWidgets } from '../tools/sortWidgets';
import { RenderWidgets } from '../RenderWidgets';
import { API, IDEAS_QUERY} from '../App';
import { MainNavbar } from '../components/MainNavbar';

export class Main extends Component {
  constructor(props) {
        super(props);

        this.state = {
        ideas: [],
        savedNotifCallback: null,
        };

        this.mainNavbarElement = React.createRef();

        this.handleNewWidgetButtonChange = 
        this.handleNewWidgetButtonChange.bind(this);
        this.handleCloseButtonChange = 
        this.handleCloseButtonChange.bind(this);
        this.handleWidgetChange = 
        this.handleWidgetChange.bind(this);
        this.handleSortList =
        this.handleSortList.bind(this);
    }

    componentDidMount() {
        fetch(API + IDEAS_QUERY, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            })
            .then(response => response.json())
            .then(ideas =>  {
            let ideasObject = JSON.parse(ideas)
            this.setState({ ideas: ideasObject })
            });
    }

    handleNewWidgetButtonChange() {
        fetch(API + IDEAS_QUERY, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'New Idea',
            user_id: this.props.user_id,
        })
        })
        .then(response => response.json())
        .then(idea => {
            let newIdeas = this.state.ideas;
            let ideaObject = JSON.parse(idea)

            newIdeas.push(ideaObject)
            this.setState({ ideas: newIdeas})
        });
    }

    handleCloseButtonChange(id) {
        fetch(API + IDEAS_QUERY + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: ''
        })
        .then(response => response.json())
        .then((idea) => {
            let ideaObject = JSON.parse(idea)
            let array = this.state.ideas;
            
            let index = array.findIndex((element) => {
            return element.id === Number(ideaObject.id);
            });

            array.splice(index, 1);

            this.setState({
            ideas: array,
            })
        })
    }

    handleWidgetChange() {
        this.mainNavbarElement.current.showNotification();
    }

    handleSortList(event) {
        let sortedIdeas = sortWidgets(this.state.ideas, event); 
        this.setState({ideas: sortedIdeas});
    }

    render() {
        return (
            <main>
                <MainNavbar 
                    ref = { this.mainNavbarElement }
                    newWidgetButtonChange = { this.handleNewWidgetButtonChange }
                    onSortListChange = { this.handleSortList } 
                />
                
                <RenderWidgets
                    ideas = { this.state.ideas }
                    onCloseButtonChange = { this.handleCloseButtonChange }
                    onWidgetChange = { this.handleWidgetChange }
                />
            </main>
        );
    }
}