export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Role ${req.user?.role || 'none'} not authorized` });
    }
    next();
  };
};
