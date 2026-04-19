import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export const seedUsers = async () => {
  const hashedPassword = bcrypt.hashSync('password123', 10);

  await User.bulkCreate([
    {
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    },
    {
      fullName: 'John Manager',
      email: 'manager@example.com',
      password: hashedPassword,
      role: 'manager'
    },
    {
      fullName: 'Jane Employee',
      email: 'jane@example.com',
      password: hashedPassword,
      role: 'employee'
    },
    {
      fullName: 'Bob Employee',
      email: 'bob@example.com',
      password: hashedPassword,
      role: 'employee'
    }
  ]);
  console.log('✅ Users seeded successfully!');
};
