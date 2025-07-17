import { useState, useEffect } from 'react';

export interface TaskData {
  id: string;
  title: string;
  priority: string;
  owner: string;
  status: string;
  dueDate: string;
  notes: string;
  category?: string;
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
      
      console.log('Fetching from Notion API...');
      console.log('Database ID:', databaseId);
      console.log('Token exists:', !!notionToken);

      // Try to make the API call with proper headers and error handling
      let response;
      try {
        response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
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
      } catch (fetchError) {
        console.error('Fetch failed:', fetchError);
        throw new Error('CORS Error: Cannot connect to Notion API directly from browser. You need to set up a backend proxy server or use a different approach. This is a browser security limitation.');
      }

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        if (response.status === 401) {
          throw new Error('Invalid Notion token - please check your credentials');
        } else if (response.status === 404) {
          throw new Error('Database not found - please check the database ID');
        } else if (response.status === 403) {
          throw new Error('Permission denied - please share the database with your integration');
        } else {
          throw new Error(`Notion API error: ${response.status} - ${errorText}`);
        }
      }

      const data = await response.json();
      console.log('Notion API response:', data);
      
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid response format from Notion API');
      }

      // Transform Notion data to our TaskData format
      const transformedTasks: TaskData[] = data.results
        .filter((page: any) => page.properties)
        .map((page: any) => {
          const props = page.properties;
          console.log('Processing page properties:', props);
          
          return {
            id: page.id,
            title: props.Task?.title?.[0]?.plain_text || 
                   props.Name?.title?.[0]?.plain_text || 
                   props.Title?.title?.[0]?.plain_text || 
                   'Untitled Task',
            priority: props.Priority?.select?.name || 'Low',
            owner: props.Owner?.rich_text?.[0]?.plain_text || 
                   props.Assignee?.rich_text?.[0]?.plain_text || 
                   props.Person?.rich_text?.[0]?.plain_text || 
                   'Unassigned',
            status: props.Status?.select?.name || 'Not started',
            dueDate: props['Due Date']?.date?.start || 
                     props['Start Date']?.date?.start || 
                     props.Date?.date?.start || 
                     '',
            notes: props.Notes?.rich_text?.[0]?.plain_text || 
                   props.Description?.rich_text?.[0]?.plain_text || 
                   '',
            category: props.Category?.select?.name || 
                     props.Type?.select?.name || 
                     'Work'
          };
        });

      console.log('Transformed tasks:', transformedTasks);

      // Separate tasks by category
      const workTasksData = transformedTasks.filter(task => 
        task.category === 'Work' || task.category === 'work' || !task.category
      );
      
      const lifeTasksData = transformedTasks.filter(task => 
        task.category === 'Life' || task.category === 'life' || task.category === 'Personal'
      );

      // If no category distinction exists, split tasks evenly
      if (workTasksData.length === 0 && lifeTasksData.length === 0) {
        const midpoint = Math.ceil(transformedTasks.length / 2);
        setWorkTasks(transformedTasks.slice(0, midpoint));
        setLifeTasks(transformedTasks.slice(midpoint));
      } else {
        setWorkTasks(workTasksData);
        setLifeTasks(lifeTasksData);
      }

      console.log('Work tasks set:', workTasksData.length);
      console.log('Life tasks set:', lifeTasksData.length);

    } catch (err) {
      console.error('Error fetching Notion data:', err);
      
      if (err instanceof TypeError && (err.message.includes('Failed to fetch') || err.message.includes('CORS') || err.message.includes('Network request failed'))) {
        const corsError = 'CORS Error: Cannot connect to Notion API directly from browser. You need to set up a backend proxy server or use a different approach. This is a browser security limitation.';
        setError(corsError);
        console.log('CORS error detected, fallback should be triggered');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      }
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