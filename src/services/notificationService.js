import { Notification } from '../database/models/index.js';

export const create = async (userId, message, type = 'system') => {
  return await Notification.create({ userId, message, type });
};

export const getForUser = async (userId) => {
  return await Notification.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
};

export const markRead = async (id, userId) => {
  const notif = await Notification.findOne({ where: { id, userId } });
  if (!notif) throw new Error('Notification not found');
  notif.status = 'read';
  await notif.save();
  return notif;
};

export const markAllRead = async (userId) => {
  await Notification.update({ status: 'read' }, { where: { userId, status: 'unread' } });
};
