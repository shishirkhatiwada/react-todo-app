import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { ClipboardList } from 'lucide-react';

function App() {
  const [currentFilter, setCurrentFilter] = useState('all');

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center justify-center mb-8">
            <ClipboardList className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Task Management Dashboard</h1>
          </div>
          
          <TaskForm />
          <TaskFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
          <TaskList filter={currentFilter} />
        </div>
      </div>
    </Provider>
  );
}

export default App;