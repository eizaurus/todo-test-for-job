import React from 'react';
import ReactDOM from 'react-dom';
import Task from './features/TaskItem/Task';
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={store}>
		<Task />
	</Provider>,
	document.getElementById('root')
);
