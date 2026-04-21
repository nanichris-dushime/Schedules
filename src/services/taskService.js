import { Task, User } from '../database/models/index.js';

export const getAllTasks = async () => {
  return await Task.findAll({
    include: [{ model: User, as: 'User', attributes: ['id', 'fullName', 'email'] }],
    order: [['date', 'ASC']]
  });
};

export const createTask = async ({ title, date, startTime, endTime, managerId }) => {
  return await Task.create({ title, date, startTime, endTime, managerId });
};

export const getTaskById = async (id) => {
  return await Task.findByPk(id);
};
