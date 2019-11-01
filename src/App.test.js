import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//TECHNICALLY, this is the required test for Check24... 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
