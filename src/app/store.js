import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from '../features/TaskItem/TaskSlice';

export default configureStore({
	reducer: {
		list: TaskReducer,
	},
});
