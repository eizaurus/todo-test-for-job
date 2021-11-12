import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { ListItemTextCustom } from './ListItemStyled';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteTask,
	finish,
	defaultList,
} from '../features/TaskItem/TaskSlice';
import ChangeListItem from './ChangeListItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ListItemComponent(props) {
	const {
		value,
		divider,
		isFinish,
		parentTask = '',
		datetimeCreate,
		datetimeEdit,
	} = props;
	const [openDialog, setOpenDialog] = useState(false);
	const [type, setType] = useState('add');
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const dispatch = useDispatch();
	let Data = [...useSelector(defaultList)];
	let indeterminate =
		!isFinish &&
		Data.find((o) => o.parentTask === value && o.finish === true);
	let classes = '';
	if (parentTask !== '') {
		classes = { paddingLeft: 4 };
	}
	const handleToggle = () => {
		dispatch(finish(value));
	};
	let timeCreate = new Date(datetimeCreate);
	let timeEdit = new Date(datetimeEdit);
	let EditText =
		datetimeEdit > 0 ? `изменено: ${timeEdit.toLocaleString()}` : '';
	let text = (
		<React.Fragment>
			создано: {timeCreate.toLocaleString()}
			<br /> {EditText}
		</React.Fragment>
	);

	return (
		<>
			{divider && <Divider key={`divider-${value}`} variant='middle' />}
			<ListItem alignItems='flex-start' sx={classes}>
				<ListItemIcon>
					<Checkbox
						edge='end'
						indeterminate={indeterminate}
						onChange={handleToggle}
						checked={isFinish}
						inputProps={{
							'aria-labelledby': `checkbox-list-secondary-label-${value}`,
						}}
					/>
				</ListItemIcon>
				<ListItemTextCustom
					finish={isFinish}
					primary={value}
					secondary={text}
				/>
				<IconButton
					aria-label='Add Task'
					color='secondary'
					sx={{ margin: 'auto' }}
					aria-controls='basic-menu'
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					{parentTask === '' && (
						<MenuItem
							onClick={() => {
								setType('add');
								setOpenDialog(true);
								handleClose();
							}}
						>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText>Добавить подзадачу</ListItemText>
						</MenuItem>
					)}
					<MenuItem
						onClick={() => {
							setType('edit');
							setOpenDialog(true);
							handleClose();
						}}
					>
						<ListItemIcon>
							<EditIcon />
						</ListItemIcon>
						<ListItemText>Переименовать</ListItemText>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose();
							dispatch(deleteTask(value));
						}}
					>
						<ListItemIcon>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText>Удалить задачу</ListItemText>
					</MenuItem>
				</Menu>
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
