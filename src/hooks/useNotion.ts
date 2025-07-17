import { useState, useEffect } from 'react';

export interface TaskData {
  id: string;
  title: string;
  priority: string;
  owner: string;
  status: string;
  dueDate: string;
  notes: string;
  category?: string; // To distinguish between Work and Life tasks
}

interface UseNotionReturn {
  workTasks: TaskData[];
  lifeTasks: TaskData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useNotion = (): UseNotionReturn => {
  const [workTasks, setWorkTasks] = useState<TaskData[]>([]);
  const [lifeTasks, setLifeTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const notionToken = import.meta.env.VITE_NOTION_TOKEN;
  const databaseId = '1eba40b6e27d8004895bd2eb2d884d04';

  const fetchNotionData = async () => {
    if (!notionToken) {
      setError('Notion token not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Query the Notion database
      const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          page_size: 100,
          sorts: [
            {
              property: 'Priority',
              direction: 'descending'
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform Notion data to our TaskData format
      const transformedTasks: TaskData[] = data.results
        .filter((page: any) => page.properties)
        .map((page: any) => {
          const props = page.properties;
          
          return {
            id: page.id,
            title: props.Task?.title?.[0]?.plain_text || props.Name?.title?.[0]?.plain_text || 'Untitled Task',
            priority: props.Priority?.select?.name || 'Low',
            owner: props.Owner?.rich_text?.[0]?.plain_text || props.Assignee?.rich_text?.[0]?.plain_text || '',
            status: props.Status?.select?.name || 'Not started',
            dueDate: props['Due Date']?.date?.start || props['Start Date']?.date?.start || '',
            notes: props.Notes?.rich_text?.[0]?.plain_text || '',
            category: props.Category?.select?.name || props.Type?.select?.name || 'Work'
          };
        });

      // Separate tasks by category (Work vs Life)
      const workTasksData = transformedTasks.filter(task => 
        task.category === 'Work' || task.category === 'work' || !task.category
      );
      
      const lifeTasksData = transformedTasks.filter(task => 
        task.category === 'Life' || task.category === 'life' || task.category === 'Personal'
      );

      // If no category distinction exists, split tasks evenly or use priority
      if (workTasksData.length === 0 && lifeTasksData.length === 0) {
        const midpoint = Math.ceil(transformedTasks.length / 2);
        setWorkTasks(transformedTasks.slice(0, midpoint));
        setLifeTasks(transformedTasks.slice(midpoint));
      } else {
        setWorkTasks(workTasksData);
        setLifeTasks(lifeTasksData);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      console.error('Error fetching Notion data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotionData();
  }, []);

  const refetch = () => {
    fetchNotionData();
  };

  return {
    workTasks,
    lifeTasks,
    loading,
    error,
    refetch
  };
};