import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/taskSlice';

interface TaskFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange }) => {
  const dispatch = useDispatch();

  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'overdue', label: 'Overdue' },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-md ${
              currentFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;