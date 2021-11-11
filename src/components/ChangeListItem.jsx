import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function ChangeListItem({
	task,
	OpenDialog,
	CreateNewTask,
	OldTaskName = '',
}) {
	const [open, setOpen] = React.useState(OpenDialog);
	const [newTask, setNewTask] = React.useState(OldTaskName);
	const [disabled, setDisabled] = React.useState(Boolean(newTask === ''));

	const handleClose = () => {
		setOpen(false);
		CreateNewTask(false);
	};
	const ChangeNewTask = (e) => {
		setNewTask(e.target.value);
		setDisabled(e.target.value === '');
	};
	const SaveNewTask = () => {
		setOpen(false);
		CreateNewTask(newTask);
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Создание задачи</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Добавьте{' '}
						{task !== ''
							? `подзадачу для задачи ${task}`
							: `задачу`}
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='task'
						label='Добавление задачи'
						type='text'
						fullWidth
						variant='standard'
						value={newTask}
						onChange={ChangeNewTask}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отменить</Button>
					<Button onClick={SaveNewTask} disabled={disabled}>
						Добавить
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
ChangeListItem.propTypes = {
	task: PropTypes.string,
	OpenDialog: PropTypes.bool,
	CreateNewTask: PropTypes.func,
	OldTaskName: PropTypes.string,
};
