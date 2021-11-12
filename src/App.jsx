import React from 'react';
import Box from '@mui/material/Box';
import TaskList from './features/TaskItem/Task';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Box
				sx={{
					width: 800,
					margin: 'auto',
				}}
			>
				<TaskList />
			</Box>
		);
	}
}
