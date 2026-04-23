import * as taskService from '../services/taskService.js';
import * as notificationService from '../services/notificationService.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, date, startTime, endTime } = req.body;
    if (!title || !date || !startTime || !endTime) {
      return res.status(400).json({ success: false, error: 'title, date, startTime, and endTime are required' });
    }
    const task = await taskService.createTask({ title, date, startTime, endTime, managerId: req.user.id });
    await notificationService.create(
      req.user.id,
      `You created task "${title}" scheduled on ${date} from ${startTime.slice(0,5)} to ${endTime.slice(0,5)}.`,
      'task'
    );
    res.status(201).json({ success: true, message: 'Task created', task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, date, startTime, endTime } = req.body;
    const task = await taskService.updateTask(req.params.id, { title, date, startTime, endTime });
    res.json({ success: true, message: 'Task updated', task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
