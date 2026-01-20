"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";

interface BouncingHobbyProps {
  hobby: string;
  emoji: string;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  containerSize: { width: number; height: number };
  isVisible: boolean;
}

const BouncingHobby = ({ hobby, emoji, containerRef, containerSize, isVisible }: BouncingHobbyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef({ 
    x: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.4), 
    y: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.4) 
  });
  const positionRef = useRef({ x: 0, y: 0 });
  const elementSizeRef = useRef({ width: 80, height: 32 }); // Default fallback
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isInitializedRef = useRef(false);

  // Initialize position and measure element size
  useEffect(() => {
    if (!elementRef.current || !containerRef.current) return;
    if (containerSize.width === 0 || containerSize.height === 0) return;
    if (isInitializedRef.current) return;

    // Measure element size
    const measureElement = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          elementSizeRef.current = { width: rect.width, height: rect.height };
          return true;
        }
      }
      return false;
    };

    // Try to measure, use fallback if needed
    const hasSize = measureElement();
    const width = elementSizeRef.current.width;
    const height = elementSizeRef.current.height;

    // Initialize position
    const maxX = Math.max(0, containerSize.width - width);
    const maxY = Math.max(0, containerSize.height - height);
    const startX = maxX > 0 ? Math.random() * maxX : 0;
    const startY = maxY > 0 ? Math.random() * maxY : 0;
    
    positionRef.current = { x: startX, y: startY };
    x.set(startX);
    y.set(startY);
    isInitializedRef.current = true;

    // If element wasn't measured, try again after a delay
    if (!hasSize) {
      setTimeout(() => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            elementSizeRef.current = { width: rect.width, height: rect.height };
          }
        }
      }, 100);
    }
  }, [containerSize, x, y, containerRef]);

  // Animation loop
  useEffect(() => {
    // Always clean up any existing animation first
    if (animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }

    if (!containerRef.current || !elementRef.current) return;
    if (containerSize.width === 0 || containerSize.height === 0) return;
    if (!isInitializedRef.current) return;
    if (isDragging || !isVisible) return;

    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;
      
      // Check if we should continue animating
      if (!containerRef.current || !elementRef.current || isDragging || !isVisible) {
        animationFrameRef.current = undefined;
        isRunning = false;
        return;
      }

      let newX = positionRef.current.x + velocityRef.current.x;
      let newY = positionRef.current.y + velocityRef.current.y;

      // Bounce off horizontal edges
      if (newX <= 0) {
        newX = 0;
        velocityRef.current.x = Math.abs(velocityRef.current.x);
      } else if (newX + elementSizeRef.current.width >= containerSize.width) {
        newX = containerSize.width - elementSizeRef.current.width;
        velocityRef.current.x = -Math.abs(velocityRef.current.x);
      }

      // Bounce off vertical edges
      if (newY <= 0) {
        newY = 0;
        velocityRef.current.y = Math.abs(velocityRef.current.y);
      } else if (newY + elementSizeRef.current.height >= containerSize.height) {
        newY = containerSize.height - elementSizeRef.current.height;
        velocityRef.current.y = -Math.abs(velocityRef.current.y);
      }

      positionRef.current = { x: newX, y: newY };
      x.set(newX);
      y.set(newY);

      if (isRunning) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  }, [containerRef, isDragging, isVisible, containerSize]);

  const handleDragStart = () => {
    setIsDragging(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Update position ref from current motion values
    if (elementRef.current) {
      positionRef.current = { x: x.get(), y: y.get() };
    }
  };

  return (
    <motion.div
      ref={elementRef}
      className="absolute px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-white font-medium whitespace-nowrap cursor-grab active:cursor-grabbing select-none will-change-transform"
      style={{ x, y }}
      drag
      dragConstraints={containerRef}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
    >
      <span className="mr-1.5">{emoji}</span>
      {hobby}
    </motion.div>
  );
};

interface BouncingHobbiesProps {
  hobbies: Array<{ name: string; emoji: string }>;
}

const BouncingHobbies = ({ hobbies }: BouncingHobbiesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Intersection Observer to pause when not visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Cache container size and update on resize
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    // Initial measurement
    updateSize();

    // Watch for resize
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full min-h-[150px]">
      <div ref={containerRef} className="relative w-full h-full overflow-hidden">
        {hobbies.map((hobby, index) => (
          <BouncingHobby 
            key={hobby.name} 
            hobby={hobby.name} 
            emoji={hobby.emoji}
            index={index} 
            containerRef={containerRef}
            containerSize={containerSize}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default BouncingHobbies;
