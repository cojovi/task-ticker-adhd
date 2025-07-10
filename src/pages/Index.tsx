import TickerCarousel from '../components/TickerCarousel';
import { useGoogleSheets } from '../hooks/useGoogleSheets';
import { Button } from '../components/ui/button';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const { workTasks, lifeTasks, loading, error, refetch } = useGoogleSheets();

  // Debug logging
  console.log('Work tasks:', workTasks);
  console.log('Life tasks:', lifeTasks);
  console.log('Loading:', loading);
  console.log('Error:', error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="pt-8 pb-6 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Project Dashboard</h1>
              <p className="text-slate-300 text-lg">Live task ticker • Real-time project monitoring</p>
            </div>
            <Button 
              onClick={refetch}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Work Tasks Ticker - First Row */}
      <div className="px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white mb-2">Work Tasks</h2>
            <p className="text-sm text-slate-400">Count: {workTasks.length}</p>
          </div>
          <TickerCarousel 
            direction="left" 
            tasks={workTasks}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {/* Life Tasks Ticker - Second Row */}
      <div className="px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white mb-2">Life Tasks</h2>
            <p className="text-sm text-slate-400">Count: {lifeTasks.length}</p>
          </div>
          <div className="bg-red-500/20 border border-red-500 p-4 rounded mb-4">
            <p className="text-white">DEBUG: Life Tasks Length: {lifeTasks.length}</p>
            <p className="text-white">DEBUG: Loading: {loading.toString()}</p>
            <p className="text-white">DEBUG: Error: {error || 'none'}</p>
          </div>
          <TickerCarousel 
            direction="right" 
            tasks={lifeTasks}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-16 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-white">{workTasks.length}</div>
              <div className="text-slate-300 text-sm">Total Work Tasks</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-emerald-400">
                {[...workTasks, ...lifeTasks].filter(task => task.status.toLowerCase() === 'completed').length}
              </div>
              <div className="text-slate-300 text-sm">Completed Tasks</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-orange-400">
                {[...workTasks, ...lifeTasks].filter(task => task.priority.toLowerCase() === 'high').length}
              </div>
              <div className="text-slate-300 text-sm">High Priority Tasks</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">{lifeTasks.length}</div>
              <div className="text-slate-300 text-sm">Total Life Tasks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;