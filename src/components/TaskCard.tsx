
import React from 'react';
import { Calendar, Clock, Flag } from 'lucide-react';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    status: string;
    priority: string;
    dueDate: string;
    tags: string[];
  };
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
      default:
        return 'border-slate-400 bg-slate-500/10 text-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'done':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'not started':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date() && task.status.toLowerCase() !== 'completed';
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
          Due {formatDate(task.dueDate)}
          {isOverdue(task.dueDate) && (
            <span className="ml-2 text-xs text-red-400 font-bold">OVERDUE</span>
          )}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {task.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
          >
            {tag}
          </span>
        ))}
        {task.tags.length > 3 && (
          <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md border border-slate-600/50">
            +{task.tags.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
