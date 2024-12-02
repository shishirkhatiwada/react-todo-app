import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete, updateTask } from '../store/taskSlice';
import { Task } from '../types/task';
import { Pencil, Trash2, Check, X, Save } from 'lucide-react';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleSave = () => {
    dispatch(
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${task.completed ? 'opacity-75' : ''}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:text-green-800"
            >
              <Save className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => dispatch(toggleTaskComplete(task.id))}
                className={`p-2 rounded-full ${
                  task.completed ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <Check className="w-5 h-5" />
              </button>
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;