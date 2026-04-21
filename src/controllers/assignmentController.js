import * as assignmentService from '../services/assignmentService.js';
import * as taskService from '../services/taskService.js';
import * as notificationService from '../services/notificationService.js';
import { User } from '../database/models/index.js';

export const getAssignments = async (req, res) => {
  try {
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
      return res.status(400).json({ success: false, error: 'employeeId and taskId are required' });
    }
    const assignment = await assignmentService.createAssignment({ employeeId, taskId, status });

    // Fetch task and employee details for notification messages
    const task     = await taskService.getTaskById(taskId);
    const employee = await User.findByPk(employeeId, { attributes: ['id', 'fullName'] });

    if (task && employee) {
      const dateStr  = task.date;
      const timeStr  = `${String(task.startTime).slice(0,5)} – ${String(task.endTime).slice(0,5)}`;

      // Notify the employee
      await notificationService.create(
        employeeId,
        `You have been assigned to "${task.title}" on ${dateStr} from ${timeStr}. Please confirm your availability.`,
        'shift'
      );

      // Notify the manager who made the assignment
      await notificationService.create(
        req.user.id,
        `You assigned "${task.title}" (${dateStr}, ${timeStr}) to ${employee.fullName}.`,
        'shift'
      );
    }

    res.status(201).json({ success: true, message: 'Assignment created', assignment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
