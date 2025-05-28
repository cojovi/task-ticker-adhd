
import TickerCarousel from '../components/TickerCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="pt-8 pb-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Project Dashboard</h1>
          <p className="text-slate-300 text-lg">Live task ticker • Real-time project monitoring</p>
        </div>
      </div>

      {/* Main Ticker */}
      <div className="px-8">
        <div className="max-w-7xl mx-auto">
          <TickerCarousel />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-16 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-slate-300 text-sm">Active Tasks</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-emerald-400">8</div>
              <div className="text-slate-300 text-sm">Completed</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-orange-400">3</div>
              <div className="text-slate-300 text-sm">High Priority</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">67%</div>
              <div className="text-slate-300 text-sm">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
