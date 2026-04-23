import * as userService from '../services/userService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password are required' });
    const result = await userService.login(email, password);
    res.json({
      success: true,
      message: 'Login successful',
      token: result.token,
      user: { id: result.id, fullName: result.fullName, email: result.email, role: result.role }
    });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ success: false, error: 'fullName, email, password, and role are required' });
    }
    const user = await userService.createUser({ fullName, email, password, role });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await userService.getUsersByRole('employee');
    res.json({ success: true, users: employees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(404).json({ success: false, error: 'User not found' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { fullName, email, role } = req.body;
    const user = await userService.updateUser(req.params.id, { fullName, email, role });
    res.json({ success: true, message: 'User updated', user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'currentPassword and newPassword are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters' });
    }
    await userService.changePassword(req.user.id, currentPassword, newPassword);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ success: false, error: 'fullName and email are required' });
    }
    const user = await userService.updateUser(req.user.id, { fullName, email });
    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
