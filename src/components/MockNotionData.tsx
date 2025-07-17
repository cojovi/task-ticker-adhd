// Mock data for development when Notion API is not accessible due to CORS
import { TaskData } from '../hooks/useNotion';

export const mockWorkTasks: TaskData[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    priority: 'High',
    owner: 'John Doe',
    status: 'In progress',
    dueDate: '2024-01-15',
    notes: 'Need to include budget analysis',
    category: 'Work'
  },
  {
    id: '2',
    title: 'Review client feedback',
    priority: 'Medium',
    owner: 'Jane Smith',
    status: 'Not started',
    dueDate: '2024-01-20',
    notes: 'Check email for latest updates',
    category: 'Work'
  },
  {
    id: '3',
    title: 'Update website content',
    priority: 'Low',
    owner: 'Bob Johnson',
    status: 'Completed',
    dueDate: '2024-01-10',
    notes: 'Added new testimonials',
    category: 'Work'
  },
  {
    id: '4',
    title: 'Prepare presentation',
    priority: 'Code Red',
    owner: 'Alice Brown',
    status: 'In progress',
    dueDate: '2024-01-12',
    notes: 'Deadline approaching fast',
    category: 'Work'
  }
];

export const mockLifeTasks: TaskData[] = [
  {
    id: '5',
    title: 'Grocery shopping',
    priority: 'Medium',
    owner: 'Personal',
    status: 'Not started',
    dueDate: '2024-01-14',
    notes: 'Buy organic vegetables',
    category: 'Life'
  },
  {
    id: '6',
    title: 'Doctor appointment',
    priority: 'High',
    owner: 'Personal',
    status: 'Not started',
    dueDate: '2024-01-16',
    notes: 'Annual checkup',
    category: 'Life'
  },
  {
    id: '7',
    title: 'Call family',
    priority: 'Low',
    owner: 'Personal',
    status: 'Completed',
    dueDate: '2024-01-13',
    notes: 'Caught up with everyone',
    category: 'Life'
  }
];