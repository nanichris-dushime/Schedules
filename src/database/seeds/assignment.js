import { Assignment, Task, User } from '../models/index.js';

export const seedAssignments = async () => {
  const jane = await User.findOne({ where: { email: 'jane@example.com' } });
  const bob = await User.findOne({ where: { email: 'bob@example.com' } });
  const task1 = await Task.findOne({ where: { title: 'Morning Meeting' } });
  const task2 = await Task.findOne({ where: { title: 'Project Review' } });

  await Assignment.bulkCreate([
    {
      status: 'confirmed',
      employeeId: jane.id,
      taskId: task1.id
    },
    {
      status: 'confirmed',
      employeeId: bob.id,
      taskId: task1.id
    },
    {
      status: 'rejected',
      employeeId: jane.id,
      taskId: task2.id
    }
  ]);
  console.log('✅ Assignments seeded successfully!');
};
