import { Assignment, Task, User } from '../database/models/index.js';

export const getAssignments = async (employeeId = null) => {
  const where = employeeId ? { employeeId } : {};
  return await Assignment.findAll({
    where,
    include: [
      { model: Task, as: 'Task' },
      { model: User, as: 'User', attributes: ['id', 'fullName', 'email'] }
    ],
    order: [['createdAt', 'DESC']]
  });
};

export const createAssignment = async ({ employeeId, taskId, status = 'confirmed' }) => {
  return await Assignment.create({ employeeId, taskId, status });
};
