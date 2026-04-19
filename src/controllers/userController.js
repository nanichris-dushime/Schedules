import * as userService from '../services/userService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.json({
      success: true,
      message: 'Login successful',
      user,
      token: user.token
    });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
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

export const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(404).json({ success: false, error: 'User not found' });
  }
};
