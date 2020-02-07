import React from 'react';
import Widget from './components/Widget';

export function RenderWidgets(props) {
  const ideas = props.ideas;
  const result = ideas.map((idea) => {
    return (
        <Widget
            id={idea.id}
            key={idea.id}
            title={idea.title}
            category={idea.category} 
            body={idea.body} 
            timestamp={idea.timestamp} 
            onCloseButtonChange={props.onCloseButtonChange}
            onWidgetChange={props.onWidgetChange} 
        />
    );
  });

  return (
    <div className='widgets'>
        {result}
    </div>
  );
}
