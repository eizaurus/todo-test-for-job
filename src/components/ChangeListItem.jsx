import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { useSelector, useDispatch } from 'react-redux';
import { add, edit, defaultList } from '../features/TaskItem/TaskSlice';
import PropTypes from 'prop-types';

export default function ChangeListItem({
	value = '',
	OpenDialog,
	CloseDialog,
	type = 'add',
}) {
	const [open, setOpen] = React.useState(OpenDialog);
	const [InputValue, setInputValue] = React.useState(
		type === 'edit' ? value : ''
	);
	const [disabled, setDisabled] = React.useState(Boolean(InputValue === ''));
	let Data = useSelector(defaultList);
	Data = [...Data];
	const dispatch = useDispatch();
	let DialogContentTextType = `Добавьте ${type}`;

	const handleClose = () => {
		setOpen(false);
		CloseDialog(false);
	};

	const ChangeInputValue = (e) => {
		setInputValue(e.target.value);
		setDisabled(e.target.value === '');
	};

	const SaveChange = () => {
		let TaskDuplicate = Data.find((o) => o.name === InputValue);
		if (TaskDuplicate) {
			setDisabled(true);
		} else {
			type === 'add'
				? dispatch(add([value, InputValue]))
				: dispatch(edit([value, InputValue]));
			setOpen(false);
			CloseDialog(false);
		}
	};

	return (
		<div>
			<Dialog open={open}>
				<DialogTitle>Создание задачи</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{DialogContentTextType}
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='task'
						label='Добавление задачи'
						type='text'
						fullWidth
						variant='standard'
						value={InputValue}
						onChange={ChangeInputValue}
						/* onBlur={() => alert('Im blur, da budi da budai!')} */
					/>
					<Collapse in={disabled}>
						<Alert severity='warning' sx={{ mb: 2 }}>
							Невозможно добавить пустую или продублированную
							задачу!
						</Alert>
					</Collapse>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отменить</Button>
					<Button onClick={SaveChange} disabled={disabled}>
						Добавить
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
ChangeListItem.propTypes = {
	value: PropTypes.string,
	OpenDialog: PropTypes.bool,
	CloseDialog: PropTypes.func,
	type: PropTypes.string,
};
