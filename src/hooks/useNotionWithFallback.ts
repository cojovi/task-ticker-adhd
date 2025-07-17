import { useState, useEffect } from 'react';
import { useNotion, TaskData } from './useNotion';
import { mockWorkTasks, mockLifeTasks } from '../components/MockNotionData';

interface UseNotionWithFallbackReturn {
  workTasks: TaskData[];
  lifeTasks: TaskData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  usingMockData: boolean;
}

export const useNotionWithFallback = (): UseNotionWithFallbackReturn => {
  const { workTasks, lifeTasks, loading, error, refetch } = useNotion();
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    // If there's a CORS error, switch to mock data
    if (error && error.includes('CORS Error')) {
      setUsingMockData(true);
    }
  }, [error]);

  // If using mock data, return mock data instead
    if (error === 'CORS_ERROR' || (error && error.includes('CORS'))) {
    return {
      workTasks: mockWorkTasks,
      lifeTasks: mockLifeTasks,
      loading: false,
      error: 'Using mock data due to CORS restrictions. To use real Notion data, you need to set up a backend proxy server.',
      refetch: () => {
        setUsingMockData(false);
        refetch();
      },
      usingMockData: true
    };
  }

  return {
    workTasks,
    lifeTasks,
    loading,
    error,
    refetch,
    usingMockData: false
  };
};