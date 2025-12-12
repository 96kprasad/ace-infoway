'use client';
import { useState, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../button';
import Dropdown from '../dropdown';
import { showSuccess, showError } from '../../../../utils/notification';
import TaskManagerServices from '@/services/axios/apiServices/TaskManagerServices';

export default function CreateTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  projectName,
  editTask = null,
}) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 1,
    dueDate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const taskStatus = [
    { value: 1, label: 'To Do' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Completed' },
  ];
  const taskManagerServices = new TaskManagerServices();

  const resetTaskData = () => {
    if (editTask) {
      const statusValue = taskStatus.find(s => s.label.toLowerCase() === editTask.status.toLowerCase())?.value || 1;
      setTaskData({
        title: editTask.title,
        description: editTask.description,
        status: statusValue,
        dueDate: editTask.due_date
      });
    } else {
      setTaskData({
        title: '',
        description: '',
        status: 1,
        dueDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      resetTaskData();
    }
  }, [isOpen, editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (isValidateAllSignUpFields()) {
    const selectedStatus = taskStatus.find(s => s.value === Number(taskData.status));
    let request = {
      title: taskData.title,
      description: taskData.description,
      status: selectedStatus?.label || 'To Do',
      due_date: taskData.dueDate,
    };
    
    if (editTask) {
      request.id = editTask.id;
    }
    if (editTask) {
      taskManagerServices.updateTask(editTask.id, request).then((response) => {
        console.log('response', response);
        if (response.statusCode === 200 && response.success == true) {
          resetTaskData();
          onClose();
          showSuccess(response.message || 'Task updated successfully!');
          onTaskCreated();
        }
      });
    } else {
      taskManagerServices.createTask(request).then((response) => {
        console.log('response', response);
        if (response.statusCode === 201 && response.success == true) {
          resetTaskData();
          onClose();
          showSuccess(response.message || 'Task created successfully!');
          onTaskCreated();
        }
      });
    }
    // } else {
    //   showError('Please fix the validation errors before submitting.');
    // }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{editTask ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter task title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={taskData.description}
            onChange={(e) => setTaskData({...taskData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter task description"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Dropdown
              label="Status"
              value={taskData.status}
              onChange={(value) => setTaskData({...taskData, status: value})}
              options={taskStatus}
              placeholder="Select status"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={taskData.dueDate}
              onChange={(e) => setTaskData({...taskData, dueDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex space-x-3 pt-4">
          <Button
            variant="danger"
            caption="Cancel"
            onClick={onClose}
            size="sm"
          />
          <Button
            variant="primary"
            caption={loading ? (editTask ? 'Updating...' : 'Creating...') : (editTask ? 'Update Task' : 'Create Task')}
            disabled={loading || !taskData.title.trim() || !taskData.description.trim()}
            type="submit"
            size="sm"
          />
        </div>
      </form>
    </Modal>
  );
}
