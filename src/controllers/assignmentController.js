import * as assignmentService from '../services/assignmentService.js';

export const getAssignments = async (req, res) => {
  try {
    // Employees can only retrieve their own assignments
    const employeeId = req.user.role === 'employee'
      ? req.user.id
      : (req.query.employeeId || null);
    const assignments = await assignmentService.getAssignments(employeeId);
    res.json({ success: true, assignments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createAssignment = async (req, res) => {
  try {
    const { employeeId, taskId, status } = req.body;
    if (!employeeId || !taskId) {
      return res.status(400).json({
        success: false,
        error: 'employeeId and taskId are required',
      });
    }
    const assignment = await assignmentService.createAssignment({ employeeId, taskId, status });
    res.status(201).json({ success: true, message: 'Assignment created', assignment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
