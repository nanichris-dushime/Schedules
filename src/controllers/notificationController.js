import * as notificationService from '../services/notificationService.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getForUser(req.user.id);
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markRead(req.params.id, req.user.id);
    res.json({ success: true, notification });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await notificationService.markAllRead(req.user.id);
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
