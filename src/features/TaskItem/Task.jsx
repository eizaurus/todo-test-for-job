import React, { useState } from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ListItemComponent from '../../components/ListItemComponent';
import ChangeListItem from '../../components/ChangeListItem';
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
			<IconButton
				aria-label='fingerprint'
				color='secondary'
				onClick={() => setOpenDialog(true)}
			>
				<AddIcon />
			</IconButton>
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
