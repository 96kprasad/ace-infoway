'use client';
import { useState, useEffect } from 'react';
import CreateTaskModal from '../../components/modal/CreateTaskModal';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatsCards from '../../components/dashboard/StatsCards';
import TaskSection from '../../components/dashboard/TaskSection';
import { showSuccess } from '../../../../utils/notification';
import { Task, ApiResponse } from '../../../types';
import TaskManagerServices from '@/services/axios/apiServices/TaskManagerServices';

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | number | null
  >(null);
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const taskManagerServices = new TaskManagerServices();

  
  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      setLoading(true);
      const response: ApiResponse<Task[]> = await taskManagerServices.getAllTasks();
      if (response?.statusCode === 200 && response?.success) {
        setTasks(response?.data || []);
      }
      console.log('Tasks response:', response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };


  const deleteTask = async (taskId: string | number) => {
    try {
      const response: ApiResponse<any> = await taskManagerServices.deleteTask(taskId);
      if (response?.statusCode === 200 && response?.success) {
        showSuccess(response.message || 'Task deleted successfully');
        getAllTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskCreated = () => {
    getAllTasks();
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="p-6">
      <DashboardHeader
        onNewProject={() => {}}
        onNewTask={() => setIsTaskModalOpen(true)}
      />

      <StatsCards tasks={tasks} />

      <TaskSection
        tasks={tasks}
        loading={loading}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onDeleteTask={deleteTask}
        onEditTask={handleEditTask}
      />

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onTaskCreated={handleTaskCreated}
        projectId={selectedProjectId?.toString() || ''}
        projectName={selectedProjectName}
        editTask={editingTask}
      />
    </div>
  );
}
