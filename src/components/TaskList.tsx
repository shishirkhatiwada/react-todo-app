import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectFilteredTasks } from '../store/taskSlice';
import TaskItem from './TaskItem';
import { Task } from '../types/task';

interface TaskListProps {
  filter: string;
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const tasks = useSelector((state: RootState) => selectFilteredTasks(state, filter));

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found for the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;