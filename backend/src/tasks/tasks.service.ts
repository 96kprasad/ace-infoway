import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(userId: number) {
    try {
      console.log('📋 Getting tasks for user:', userId);
      const tasks = await this.taskRepository.find({ where: { user_id: userId } });
      return { message: 'Tasks fetched successfully', data: tasks };
    } catch (error) {
      console.error('🚨 Get Tasks Error:', error.message);
      throw error;
    }
  }

  async create(createTaskDto: CreateTaskDto, userId: number) {
    try {
      console.log('➕ Creating task for user:', userId);
      const task = this.taskRepository.create({
        ...createTaskDto,
        user_id: userId,
      });
      const savedTask = await this.taskRepository.save(task);
      return { message: 'Task created successfully', data: savedTask };
    } catch (error) {
      console.error('🚨 Create Task Error:', error.message);
      throw error;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    try {
      console.log('✏️ Updating task:', id, 'for user:', userId);
      const task = await this.taskRepository.findOne({ where: { id, user_id: userId } });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      Object.assign(task, updateTaskDto);
      const updatedTask = await this.taskRepository.save(task);
      return { message: 'Task updated successfully', data: updatedTask };
    } catch (error) {
      console.error('🚨 Update Task Error:', error.message);
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      console.log('🗑️ Deleting task:', id, 'for user:', userId);
      const task = await this.taskRepository.findOne({ where: { id, user_id: userId } });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.taskRepository.remove(task);
      return { message: 'Task deleted successfully', data: null };
    } catch (error) {
      console.error('🚨 Delete Task Error:', error.message);
      throw error;
    }
  }
}