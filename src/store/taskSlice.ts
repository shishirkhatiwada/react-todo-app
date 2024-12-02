import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';
import { isAfter, parseISO } from 'date-fns';

interface TaskState {
  tasks: Task[];
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTaskComplete, setSearchQuery } =
  taskSlice.actions;

export const selectFilteredTasks = (state: { tasks: TaskState }, filter: string) => {
  const tasks = state.tasks.tasks.filter((task) =>
    task.title.toLowerCase().includes(state.tasks.searchQuery.toLowerCase())
  );

  switch (filter) {
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'pending':
      return tasks.filter((task) => !task.completed);
    case 'overdue':
      return tasks.filter(
        (task) =>
          !task.completed && isAfter(new Date(), parseISO(task.dueDate))
      );
    default:
      return tasks;
  }
};

export default taskSlice.reducer;