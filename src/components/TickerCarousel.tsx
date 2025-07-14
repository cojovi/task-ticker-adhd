import React, { useEffect, useRef, useState } from 'react';
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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading || error || !tasks.length) {
      setIsAnimating(false);
      return;
    }

    console.log(`Starting animation for ${tasks.length} tasks in direction ${direction}`);

    // Reset any existing animation
    setIsAnimating(false);
    container.style.transform = 'translateX(0px)';
    
    // Remove any existing clones
    const existingClones = container.querySelectorAll('.ticker-content-clone');
    existingClones.forEach(clone => clone.remove());

    const startAnimation = () => {
      const content = container.querySelector('.ticker-content') as HTMLElement;
      if (!content) {
        console.log('No content found, retrying...');
        setTimeout(startAnimation, 100);
        return;
      }

      // Wait for content to render
      setTimeout(() => {
        const contentWidth = content.scrollWidth;
        console.log(`Content width: ${contentWidth}px`);
        
        if (contentWidth === 0) {
          console.log('Content width is 0, retrying...');
          setTimeout(startAnimation, 100);
          return;
        }

        // Create clone for seamless looping
        const clone = content.cloneNode(true) as HTMLElement;
        clone.classList.add('ticker-content-clone');
        clone.classList.remove('ticker-content');
        container.appendChild(clone);

        // Set up the animation
        let animationId: number;
        let startTime: number;
        const duration = Math.max(30000, contentWidth * 50); // Adjust speed based on content
        
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
        
        setIsAnimating(true);
        animationId = requestAnimationFrame(animate);
        console.log('Animation started');

        return () => {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          setIsAnimating(false);
        };
      }, 200);
    };

    const timeoutId = setTimeout(startAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
      setIsAnimating(false);
    };
  }, [direction, tasks, loading, error]);

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
      <div className="relative overflow-hidden">
        <div 
          ref={containerRef}
          className="flex items-center py-8 ticker-container"
          style={{ 
            willChange: 'transform',
            transition: isAnimating ? 'none' : 'transform 0.3s ease'
          }}
        >
          <div className="ticker-content flex">
            {tasks.map((task, index) => (
              <TaskCard key={`${task.id}-${index}`} task={task} />
            ))}
          </div>
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