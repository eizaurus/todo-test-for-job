import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { ListItemTextCustom } from './ListItemStyled';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteTask, finish } from '../features/TaskItem/TaskSlice';
import ChangeListItem from './ChangeListItem';

export default function ListItemComponent(props) {
	const {
		value,
		divider,
		isFinish,
		parentTask = '',
		datetimeCreate,
		datetimeEdit,
	} = props;
	/* const [checked, setChecked] = useState(isFinish); */
	const [openDialog, setOpenDialog] = useState(false);
	const [type, setType] = useState('add');

	const dispatch = useDispatch();

	let classes = '';
	if (parentTask !== '') {
		classes = { paddingLeft: 4 };
	}
	const handleToggle = () => {
		dispatch(finish(value));
	};
	let timeCreate = new Date(datetimeCreate);
	let timeEdit = new Date(datetimeEdit);
	let text =
		`${value}, создано: ${timeCreate.toLocaleString()}` +
		(datetimeEdit > 0 ? `, изменено: ${timeEdit.toLocaleString()}` : '');

	return (
		<>
			{divider ? (
				<Divider key={`divider-${value}`} variant='middle' />
			) : (
				''
			)}
			<ListItem
				alignItems='flex-start'
				sx={classes}
				secondaryAction={
					<Checkbox
						edge='end'
						onChange={handleToggle}
						checked={isFinish}
						inputProps={{
							'aria-labelledby': `checkbox-list-secondary-label-${value}`,
						}}
					/>
				}
			>
				<ListItemTextCustom finish={isFinish} primary={text} />
				<IconButton
					aria-label='Add Task'
					color='secondary'
					onClick={() => {
						setType('add');
						setOpenDialog(true);
					}}
				>
					<AddIcon />
				</IconButton>
				<IconButton
					aria-label='fingerprint'
					color='secondary'
					onClick={() => {
						setType('edit');
						setOpenDialog(true);
					}}
				>
					<EditIcon />
				</IconButton>
				<IconButton
					aria-label='fingerprint'
					color='secondary'
					onClick={() => dispatch(deleteTask(value))}
				>
					<DeleteIcon />
				</IconButton>
			</ListItem>
			{openDialog && (
				<ChangeListItem
					type={type}
					OpenDialog={openDialog}
					CloseDialog={(close) => {
						setOpenDialog(close);
					}}
					value={value}
				/>
			)}
		</>
	);
}
ListItemComponent.propTypes = {
	value: PropTypes.string,
	isFinish: PropTypes.bool,
	divider: PropTypes.bool,
	changeFinish: PropTypes.func,
	parentTask: PropTypes.string,
	datetimeCreate: PropTypes.number,
	datetimeEdit: PropTypes.number,
};
