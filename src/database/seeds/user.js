import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export const seedUsers = async () => {
  const hashedPassword = bcrypt.hashSync('password123', 10);

  const existing = await User.count();
  if (existing > 0) { console.log('⏭️  Users already seeded, skipping.'); return; }

  await User.bulkCreate([
    {
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    },
    
  ]);
  console.log('✅ Users seeded successfully!');
};
