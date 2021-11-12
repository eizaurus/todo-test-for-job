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
					width: 300,
					height: 300,
					backgroundColor: 'primary.dark',
					'&:hover': {
						backgroundColor: 'primary.main',
						opacity: [0.9, 0.8, 0.7],
					},
				}}
			>
				<TaskList />
			</Box>
		);
	}
}
