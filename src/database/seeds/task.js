import { Task, User } from '../models/index.js';

export const seedTasks = async () => {
  const manager = await User.findOne({ where: { email: 'manager@example.com' } });

  await Task.bulkCreate([
    {
      title: 'Morning Meeting',
      date: '2024-12-01',
      startTime: '09:00:00',
      endTime: '10:00:00',
      managerId: manager.id
    },
    {
      title: 'Project Review',
      date: '2024-12-02',
      startTime: '14:00:00',
      endTime: '15:30:00',
      managerId: manager.id
    },
    {
      title: 'Team Sync',
      date: '2024-12-03',
      startTime: '11:00:00',
      endTime: '12:00:00',
      managerId: manager.id
    }
  ]);
  console.log('✅ Tasks seeded successfully!');
};
