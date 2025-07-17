import React from 'react';
import { Calendar, Flag, User } from 'lucide-react';
import { TaskData } from '../hooks/useNotion';

interface TaskCardProps {
  task: TaskData;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'border-red-400 bg-red-500/10 text-red-300';
      case 'medium':
        return 'border-orange-400 bg-orange-500/10 text-orange-300';
      case 'low':
        return 'border-green-400 bg-green-500/10 text-green-300';
      case 'code red':
      case 'urgent':
        return 'border-red-600 bg-red-600/20 text-red-200';
      default:
        return 'border-slate-400 bg-slate-500/10 text-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'complete':
      case 'done':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'in progress':
      case 'in-progress':
      case 'doing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'not started':
      case 'not-started':
      case 'todo':
      case 'to do':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      case 'blocked':
      case 'blocked/waiting':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined 
      });
    } catch {
      return dateString;
    }
  };

  const isOverdue = (dateString: string) => {
    if (!dateString) return false;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today && task.status.toLowerCase() !== 'completed' && task.status.toLowerCase() !== 'done';
    } catch {
      return false;
    }
  };

  return (
    <div className="flex-shrink-0 w-80 h-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mr-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      {/* Priority indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
          <Flag className="w-3 h-3" />
          {task.priority}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
          {task.status}
        </div>
      </div>

      {/* Task title */}
      <h3 className="text-white text-lg font-semibold mb-3 line-clamp-2 leading-tight">
        {task.title}
      </h3>

      {/* Due date */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-slate-400" />
        <span className={`text-sm ${isOverdue(task.dueDate) ? 'text-red-400 font-medium' : 'text-slate-300'}`}>
          {task.dueDate ? `Due ${formatDate(task.dueDate)}` : 'No due date'}
          {isOverdue(task.dueDate) && (
            <span className="ml-2 text-xs text-red-400 font-bold">OVERDUE</span>
          )}
        </span>
      </div>

      {/* Owner and Notes */}
      <div className="flex flex-wrap gap-2">
        {task.owner && (
          <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50 flex items-center gap-1">
            <User className="w-3 h-3" />
            {task.owner}
          </span>
        )}
        {task.notes && (
          <span 
            className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md border border-slate-600/50 truncate max-w-32"
            title={task.notes}
          >
            {task.notes}
          </span>
        )}
      </div>

      {/* Notion indicator */}
      <div className="absolute bottom-2 right-2 opacity-30">
        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-slate-800 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;