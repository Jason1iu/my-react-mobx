import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TodoListStore from './store/TodoListStore';

const store = new TodoListStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);
