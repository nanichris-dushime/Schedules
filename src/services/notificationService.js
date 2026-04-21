import { Notification } from '../database/models/index.js';

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
