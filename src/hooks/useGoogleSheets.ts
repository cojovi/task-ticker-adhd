import { useState, useEffect } from 'react';

export interface TaskData {
  id: string;
  title: string;
  priority: string;
  owner: string;
  status: string;
  dueDate: string;
  notes: string;
}

interface UseGoogleSheetsReturn {
  workTasks: TaskData[];
  lifeTasks: TaskData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGoogleSheets = (): UseGoogleSheetsReturn => {
  const [workTasks, setWorkTasks] = useState<TaskData[]>([]);
  const [lifeTasks, setLifeTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
  const workSheetName = import.meta.env.VITE_WORK_SHEET_NAME || 'Work';
  const lifeSheetName = import.meta.env.VITE_LIFE_SHEET_NAME || 'Life';
  const range = import.meta.env.VITE_SHEET_RANGE || 'A2:F50';

  const fetchSheetData = async (sheetName: string): Promise<TaskData[]> => {
    if (!apiKey || !sheetId) {
      throw new Error('Missing Google Sheets API configuration');
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${sheetName} sheet: ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    return rows
      .filter((row: string[]) => row[0] && row[0].trim() !== '' && row[0] !== 'Task') // Filter out empty rows and header
      .map((row: string[], index: number) => ({
        id: `${sheetName}-${index}`,
        title: row[0] || '',
        priority: row[1] || 'Low',
        owner: row[2] || '',
        status: row[3] || 'Not started',
        dueDate: row[4] || '',
        notes: row[5] || ''
      }));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [workData, lifeData] = await Promise.all([
        fetchSheetData(workSheetName),
        fetchSheetData(lifeSheetName)
      ]);

      setWorkTasks(workData);
      setLifeTasks(lifeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching Google Sheets data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    workTasks,
    lifeTasks,
    loading,
    error,
    refetch
  };
};