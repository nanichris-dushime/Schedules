import { Assignment, Task, User } from '../database/models/index.js';

export const getAssignments = async (employeeId = null) => {
  const where = employeeId ? { employeeId } : {};
  return await Assignment.findAll({
    where,
    include: [
      { model: Task },
      { model: User, attributes: ['id', 'fullName', 'email'] }
    ],
    order: [['createdAt', 'DESC']]
  });
};

export const createAssignment = async ({ employeeId, taskId, status = 'pending' }) => {
  return await Assignment.create({ employeeId, taskId, status });
};

export const updateAssignmentStatus = async (id, status, userId) => {
  const assignment = await Assignment.findOne({ where: { id, employeeId: userId } });
  if (!assignment) throw new Error('Assignment not found');
  return await assignment.update({ status });
};
