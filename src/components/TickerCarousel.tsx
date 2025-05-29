
import React, { useEffect, useRef } from 'react';
import TaskCard from './TaskCard';

const mockTasks = [
  {
    id: 1,
    title: "Design Homepage UI Mockups",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-06-01",
    tags: ["Design", "Frontend", "UI/UX"]
  },
  {
    id: 2,
    title: "Implement Authentication API",
    status: "Completed",
    priority: "High",
    dueDate: "2025-05-28",
    tags: ["Backend", "Security", "API"]
  },
  {
    id: 3,
    title: "Write Project Documentation",
    status: "Not Started",
    priority: "Medium",
    dueDate: "2025-06-10",
    tags: ["Documentation", "Planning"]
  },
  {
    id: 4,
    title: "Database Schema Optimization",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-06-05",
    tags: ["Database", "Performance", "Backend"]
  },
  {
    id: 5,
    title: "Mobile App Wireframes",
    status: "Completed",
    priority: "Low",
    dueDate: "2025-05-25",
    tags: ["Mobile", "Design", "Wireframes"]
  },
  {
    id: 6,
    title: "Performance Testing Suite",
    status: "Not Started",
    priority: "High",
    dueDate: "2025-05-30",
    tags: ["Testing", "Performance", "QA"]
  },
  {
    id: 7,
    title: "Customer Feedback Analysis",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-06-08",
    tags: ["Research", "Analytics", "Customer"]
  },
  {
    id: 8,
    title: "Deploy Staging Environment",
    status: "Completed",
    priority: "High",
    dueDate: "2025-05-27",
    tags: ["DevOps", "Deployment", "Infrastructure"]
  }
];

interface TickerCarouselProps {
  direction?: 'left' | 'right';
}

const TickerCarousel: React.FC<TickerCarouselProps> = ({ direction = 'left' }) => {
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
          {mockTasks.map((task) => (
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
