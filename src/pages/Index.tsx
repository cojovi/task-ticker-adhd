import TickerCarousel from '../components/TickerCarousel';
import { useNotionWithFallback } from '../hooks/useNotionWithFallback';
import { Button } from '../components/ui/button';
import { RefreshCw, Database, AlertTriangle } from 'lucide-react';

const Index = () => {
  const { workTasks, lifeTasks, loading, error, refetch, usingMockData } = useNotionWithFallback();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="pt-8 pb-6 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Project Dashboard</h1>
              <p className="text-slate-300 text-lg flex items-center gap-2">
                <Database className="w-5 h-5" />
                Live task ticker • {usingMockData ? 'Mock Data' : 'Powered by Notion'}
              </p>
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

      {/* CORS Warning */}
      {usingMockData && (
        <div className="px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-orange-300 text-lg font-semibold mb-2">Development Mode - Mock Data</h3>
                  <p className="text-orange-200 mb-3">
                    The Notion API cannot be called directly from the browser due to CORS restrictions. 
                    Currently showing mock data for development purposes.
                  </p>
                  <p className="text-orange-200 mb-4">
                    <strong>To use real Notion data, you need to:</strong>
                  </p>
                  <ul className="text-orange-200 text-sm space-y-1 mb-4">
                    <li>• Set up a backend server/proxy to handle Notion API calls</li>
                    <li>• Use a serverless function (Vercel, Netlify, etc.)</li>
                    <li>• Deploy the application with proper CORS handling</li>
                  </ul>
                  <Button 
                    onClick={refetch} 
                    variant="outline" 
                    className="bg-orange-500/20 border-orange-500/50 text-orange-200 hover:bg-orange-500/30"
                  >
                    Try Notion API Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Error State */}
      {error && error !== 'CORS_ERROR' && !usingMockData && (
        <div className="px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
              <h3 className="text-red-300 text-lg font-semibold mb-2">Connection Error</h3>
              <p className="text-red-200 mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={refetch} variant="outline" className="bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Work Tasks Ticker */}
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
            error={!usingMockData ? error : null}
          />
        </div>
      </div>

      {/* Life Tasks Ticker */}
      <div className="px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white mb-2">Life Tasks</h2>
            <p className="text-sm text-slate-400">Count: {lifeTasks.length}</p>
          </div>
          <TickerCarousel 
            direction="right" 
            tasks={lifeTasks}
            loading={loading}
            error={!usingMockData ? error : null}
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
                {[...workTasks, ...lifeTasks].filter(task => 
                  task.status.toLowerCase() === 'completed' || task.status.toLowerCase() === 'done'
                ).length}
              </div>
              <div className="text-slate-300 text-sm">Completed Tasks</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-orange-400">
                {[...workTasks, ...lifeTasks].filter(task => 
                  task.priority.toLowerCase() === 'high' || task.priority.toLowerCase() === 'code red'
                ).length}
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