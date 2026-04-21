import { Notification, User } from '../models/index.js';

export const seedNotifications = async () => {
  const existing = await Notification.count();
  if (existing > 0) { console.log('⏭️  Notifications already seeded, skipping.'); return; }

  const users = await User.findAll();
  if (users.length < 4) { console.log('⚠️  Not enough users, skipping notification seed.'); return; }

  await Notification.bulkCreate([
    {
      message: 'Welcome to Schedules app!',
      userId: users[1].id  // manager
    },
    {
      message: 'New task assigned',
      userId: users[2].id  // jane
    },
    {
      message: 'Task completed',
      userId: users[3].id  // bob
    },
    {
      message: 'Team meeting reminder',
      userId: users[1].id
    },
    {
      message: 'Assignment updated',
      userId: users[2].id
    }
  ]);
  console.log('✅ Notifications seeded successfully!');
};
