import { createSlice, current } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'task',
	initialState: {
		value: [
			{
				name: 'Задача 1',
				parentTask: '',
				finish: false,
				datetimeCreate: 1636670715836,
				datetimeEdit: 0,
			},
			{
				name: 'Задача 2',
				parentTask: 'Задача 1',
				finish: true,
				datetimeCreate: 1636670715836,
				datetimeEdit: 0,
			},
			{
				name: 'Задача 3',
				parentTask: '',
				finish: false,
				datetimeCreate: 1636670715836,
				datetimeEdit: 0,
			},
			{
				name: 'Задача 4',
				parentTask: '',
				finish: false,
				datetimeCreate: 1636670715836,
				datetimeEdit: 0,
			},
			{
				name: 'Задача 5',
				parentTask: '',
				finish: true,
				datetimeCreate: 1636670715836,
				datetimeEdit: 0,
			},
			{
				name: 'Задача 6',
				parentTask: 'Задача 3',
				finish: false,
				datetimeCreate: 1636670715836,
				datetimeEdit: 0,
			},
		],
	},
	reducers: {
		add: (state, action) => {
			console.log(action);
			let parentTask = action.payload[0];
			let value = action.payload[1];
			let finish = false;
			console.log('value', value);
			console.log('parentTask', parentTask);
			console.log("parentTask !== ''", parentTask !== '');
			if (parentTask !== '') {
				finish = state.value.find((o) => o.name === parentTask).finish;
				console.log('finish', finish);
			}
			let currentTime = Date.now();
			state.value.push({
				name: value,
				parentTask: parentTask,
				finish: finish,
				datetimeCreate: currentTime,
				datetimeEdit: 0,
			});
			console.log(current(state));
		},
		edit: (state, action) => {
			let oldValue = action.payload[0];
			let NewValue = action.payload[1];
			let currentTime = Date.now();
			console.log('currentTime', currentTime);
			state.value.find((o) => o.name === oldValue).datetimeEdit =
				currentTime;
			state.value.find((o) => o.name === oldValue).name = NewValue;
			state.value.find((o) => o.parentTask === oldValue).parentTask =
				NewValue;
		},
		deleteTask: (state, action) => {
			let deleteValue = action.payload;
			let index = state.value.findIndex((o) => o.name === deleteValue);
			state.value.splice(index, 1);
		},
		finish: (state, action) => {
			let currentValue = action.payload;
			let currentTime = Date.now();
			let finish = state.value.find(
				(o) => o.name === currentValue
			).finish;
			state.value.find((o) => o.name === currentValue).finish = !finish;
			state.value.find((o) => o.name === currentValue).datetimeEdit =
				currentTime;
			console.log(current(state));
			if (
				!finish &&
				state.value.find((o) => o.parentTask === currentValue)
			) {
				state.value.find(
					(o) => o.parentTask === currentValue
				).datetimeEdit = currentTime;
				state.value.find((o) => o.parentTask === currentValue).finish =
					!finish;
			}
		},
	},
});
/* console.log(state.task); */
export const { add, edit, deleteTask, finish } = slice.actions;
export const defaultList = (state) => {
	/* console.log(state.list.value); */
	return state.list.value;
};
export default slice.reducer;
