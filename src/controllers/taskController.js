import * as taskService from '../services/taskService.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, date, startTime, endTime } = req.body;
    if (!title || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        error: 'title, date, startTime, and endTime are required',
      });
    }
    const task = await taskService.createTask({
      title, date, startTime, endTime, managerId: req.user.id,
    });
    res.status(201).json({ success: true, message: 'Task created', task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
