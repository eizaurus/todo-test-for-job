import React from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ListItemComponent from './components/ListItemComponent';
import ChangeListItem from './components/ChangeListItem';
/* import Data from './data-test.json';
import { useSelector, useDispatch } from 'react-redux';
import {
	add,
	edit,
	deleteTask,
	finish,
	defaultList,
} from './features/TaskItem/TaskSlice'; */

const UpdateData = (defaultData) => {
	let SortData = defaultData.sort(function (a, b) {
		let nameA = a.parentTask.toLowerCase();
		let nameB = b.parentTask.toLowerCase();
		if (nameA < nameB) {
			//сортируем строки по возрастанию
			/* console.log(a.name,b.name,-1); */ return -1;
		}

		if (nameA > nameB) {
			/* console.log(a.name,b.name,1); */ return 1;
		}
		return 0;
	});
	let NewData = [];
	SortData.forEach((task) => {
		console.log(task);
		let find =
			NewData.length > 0
				? NewData.find((o) => o.name === task.parentTask)
				: false;
		if (find) {
			NewData.find((o) => o.name === task.parentTask).children.push({
				name: task.name,
				finish: task.finish,
			});
		} else {
			NewData.push({
				name: task.name,
				finish: task.finish,
				children: [],
			});
		}
	});
	console.log(NewData);
	return NewData;
};
/* 
export function App(){
	const Data = UpdateData(useSelector(defaultList));
	const dispatch = useDispatch();

	return (
		<>
			<IconButton
				aria-label='fingerprint'
				color='secondary'
				onClick={this.handleOpenAddListItem}
			>
				<AddIcon />
			</IconButton>
			<List
				sx={{
					width: '100%',
					maxWidth: 360,
					bgcolor: 'background.paper',
				}}
			>
				{this.state.TaskList.map((v, key) => (
					<>
						<ListItemComponent
							key={`parent-${key}`}
							value={v.name}
							divider={key > 0}
							finish={v.finish}
							changeFinish={this.handleChangeFinish}
						/>
						{v.children.length > 0
							? v.children.map((w, wkey) => (
									<>
										<ListItemComponent
											key={`children-${wkey}`}
											value={w.name}
											divider={key > 0}
											finish={w.finish}
											changeFinish={
												this.handleChangeFinish
											}
											parentTask={v.name}
										/>
									</>
							  ))
							: ''}
					</>
				))}
			</List>
			{this.state.NewTaskIsOpen ? (
				<ChangeListItem
					task={this.state.NewTaskName}
					OpenDialog={this.state.NewTaskIsOpen}
					CreateNewTask={this.handleCloseAddListItem}
				/>
			) : (
				''
			)}
		</>
	);
} */

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			NewTaskName: '',
			NewTaskIsOpen: false,
			TaskList: UpdateData(),
		};
	}
	handleOpenAddListItem = () => {
		this.setState({
			NewTaskIsOpen: true,
		});
	};
	handleCloseAddListItem = (CreateNewTask) => {
		this.setState({
			NewTaskIsOpen: false,
			NewTaskName: CreateNewTask,
		});
	};
	handleChangeFinish = (nameTask, isFinish, parentTask) => {
		let NewTaskList = this.state.TaskList;
		if (parentTask !== '') {
			NewTaskList.find((o) => o.name === parentTask).children.find(
				(o) => o.name === nameTask
			).finish = isFinish;
		} else {
			NewTaskList.find((o) => o.name === nameTask).finish = isFinish;
			NewTaskList.find((o) => o.name === nameTask).children.forEach(
				(elem) => (elem.finish = true)
			);
		}
		console.log(NewTaskList);
		this.setState({
			TaskList: NewTaskList,
		});
	};

	render() {
		console.log(`this.state.TaskList`, this.state.TaskList);
		UpdateData();
		return (
			<>
				<IconButton
					aria-label='fingerprint'
					color='secondary'
					onClick={this.handleOpenAddListItem}
				>
					<AddIcon />
				</IconButton>
				<List
					sx={{
						width: '100%',
						maxWidth: 360,
						bgcolor: 'background.paper',
					}}
				>
					{this.state.TaskList.map((v, key) => (
						<>
							<ListItemComponent
								key={`parent-${key}`}
								value={v.name}
								divider={key > 0}
								finish={v.finish}
								changeFinish={this.handleChangeFinish}
							/>
							{v.children.length > 0
								? v.children.map((w, wkey) => (
										<>
											<ListItemComponent
												key={`children-${wkey}`}
												value={w.name}
												divider={key > 0}
												finish={w.finish}
												changeFinish={
													this.handleChangeFinish
												}
												parentTask={v.name}
											/>
										</>
								  ))
								: ''}
						</>
					))}
				</List>
				{this.state.NewTaskIsOpen ? (
					<ChangeListItem
						task={this.state.NewTaskName}
						OpenDialog={this.state.NewTaskIsOpen}
						CreateNewTask={this.handleCloseAddListItem}
					/>
				) : (
					''
				)}
			</>
		);
	}
}
