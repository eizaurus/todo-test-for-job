import React, { useState } from 'react';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import ListItemComponent from '../../components/ListItemComponent';
import ChangeListItem from '../../components/ChangeListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { defaultList } from './TaskSlice';

const UpdateData = (defaultData) => {
	let SortData = [...defaultData];
	SortData.sort((a, b) => {
		let nameA = a.parentTask.toLowerCase();
		let nameB = b.parentTask.toLowerCase();
		//сортируем таски по наличию родителя
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
	/* console.log(`SortData`, SortData); */
	let NewData = [];
	SortData.forEach((task) => {
		/* console.log(task); */
		let find =
			NewData.length > 0
				? NewData.find((o) => o.name === task.parentTask)
				: false;
		if (find) {
			NewData.find((o) => o.name === task.parentTask).children.push({
				name: task.name,
				finish: task.finish,
				datetimeCreate: task.datetimeCreate,
				datetimeEdit: task.datetimeEdit,
			});
		} else {
			NewData.push({
				name: task.name,
				finish: task.finish,
				datetimeCreate: task.datetimeCreate,
				datetimeEdit: task.datetimeEdit,
				children: [],
			});
		}
	});
	console.log(NewData);
	return NewData;
};

export default function Task() {
	let Data = useSelector(defaultList);
	Data = UpdateData(Data);
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					margin: 3,
				}}
			>
				<Typography variant='h5' component='h5'>
					ToDo Список Задач
				</Typography>
				<Button
					endIcon={<AddIcon />}
					onClick={() => setOpenDialog(true)}
					color='primary'
				>
					Добавить Задачу
				</Button>
			</Box>
			<List>
				{Data.map((v, key) => (
					<div key={v.name.toString()}>
						<ListItemComponent
							value={v.name}
							divider={key > 0}
							isFinish={v.finish}
							datetimeCreate={v.datetimeCreate}
							datetimeEdit={v.datetimeEdit}
						/>
						{v.children.length > 0
							? v.children.map((w) => (
									<ListItemComponent
										key={w.name.toString()}
										value={w.name}
										divider={true}
										isFinish={w.finish}
										parentTask={v.name}
										datetimeCreate={w.datetimeCreate}
										datetimeEdit={w.datetimeEdit}
									/>
							  ))
							: ''}
					</div>
				))}
			</List>
			{openDialog && (
				<ChangeListItem
					OpenDialog={openDialog}
					CloseDialog={(close) => setOpenDialog(close)}
				/>
			)}
		</>
	);
}
