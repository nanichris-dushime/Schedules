import bcrypt from 'bcrypt';
import { User } from '../database/models/index.js';
import { generateToken } from '../utils/auth.js';

export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  const token = generateToken({ id: user.id, role: user.role, email: user.email });
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token
  };
};

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await User.create({ ...userData, password: hashedPassword });
};

export const getAllUsers = async () => {
  return await User.findAll({ attributes: ['id', 'fullName', 'email', 'role', 'createdAt'] });
};

export const getUsersByRole = async (role) => {
  return await User.findAll({ where: { role }, attributes: ['id', 'fullName', 'email', 'role', 'createdAt'] });
};

export const getUserById = async (id) => {
  return await User.findByPk(id, { attributes: ['id', 'fullName', 'email', 'role', 'createdAt'] });
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  await user.destroy();
};
