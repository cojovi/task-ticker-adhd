
import React, { useEffect, useRef } from 'react';
import TaskCard from './TaskCard';
import { TaskData } from '../hooks/useGoogleSheets';

interface TickerCarouselProps {
  direction?: 'left' | 'right';
  tasks: TaskData[];
  loading?: boolean;
  error?: string | null;
}

const TickerCarousel: React.FC<TickerCarouselProps> = ({ 
  direction = 'left', 
  tasks, 
  loading = false, 
  error = null 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Duplicate the content for seamless looping
    const content = container.querySelector('.ticker-content') as HTMLElement;
    if (!content) return;

    const clone = content.cloneNode(true) as HTMLElement;
    clone.classList.add('ticker-content-clone');
    container.appendChild(clone);

    // Calculate the width of one set of content
    const contentWidth = content.scrollWidth;
    
    // Set up the animation
    let animationId: number;
    let startTime: number;
    const duration = 60000; // 60 seconds for full cycle
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      const offset = progress * contentWidth;
      
      // Apply direction - left scrolls left-to-right, right scrolls right-to-left
      const translateX = direction === 'left' ? -offset : offset - contentWidth;
      container.style.transform = `translateX(${translateX}px)`;
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [direction]);

  if (loading) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center py-8">
          <div className="text-white/60">Loading tasks...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center py-8">
          <div className="text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center py-8">
          <div className="text-white/60">No tasks found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
      
      {/* Ticker container */}
      <div 
        ref={containerRef}
        className="flex items-center py-8"
        style={{ willChange: 'transform' }}
      >
        <div className="ticker-content flex">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      
      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-slate-400">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        LIVE
      </div>
    </div>
  );
};

export default TickerCarousel;
