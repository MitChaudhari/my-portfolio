// src/components/DotPortrait.tsx
import dynamic from 'next/dynamic';
import React, { useRef, useEffect } from 'react';
import type p5Types from 'p5';
import { SketchProps } from 'react-p5';

// Dynamically load p5.js to avoid SSR issues
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

// Define a Dot interface
interface Dot {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  offsetX: number;
  offsetY: number;
  noiseX: number;
  noiseY: number;
  displacementX: number;
  displacementY: number;
  randomX?: number;
  randomY?: number;
}

const DotPortrait = () => {
  const width = 600; // Canvas width
  const height = 600; // Canvas height

  const dotsRef = useRef<Dot[]>([]);
  const displacementFactorRef = useRef(0);
  const animationProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Animation states: 'normal', 'scroll', 'pixelate'
  const animationStateRef = useRef<'normal' | 'scroll' | 'pixelate'>('normal');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lastScrollYRef.current = window.scrollY;
    }

    const handleScroll = () => {
      if (animationStateRef.current === 'pixelate') return; // Freeze other animations during pixelate

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          // User is in the About Me section
          if (delta !== 0) {
            // User scrolled
            const maxDisplacement = 15; // Adjust as needed
            dotsRef.current.forEach((dot) => {
              dot.displacementX = (Math.random() * 2 - 1) * maxDisplacement;
              dot.displacementY = (Math.random() * 2 - 1) * maxDisplacement;
            });

            displacementFactorRef.current = 1;
            animationStateRef.current = 'scroll';

            // Clear any existing timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }

            // Set a timeout to gradually reduce displacement after scrolling stops
            scrollTimeoutRef.current = window.setTimeout(() => {
              // The displacementFactorRef will be reduced in the draw function
              animationStateRef.current = 'normal';
            }, 100);
          }
        }
      }
    };

    const handleAboutButtonClick = () => {
      // Start pixelate animation
      if (animationStateRef.current !== 'pixelate') {
        animationStateRef.current = 'pixelate';
        animationProgressRef.current = 0;

        // Assign random positions for each dot within the canvas
        dotsRef.current.forEach((dot) => {
          dot.randomX = Math.random() * width;
          dot.randomY = Math.random() * height;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('aboutButtonClick', handleAboutButtonClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('aboutButtonClick', handleAboutButtonClick);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const setup: SketchProps['setup'] = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.noStroke();

    // Load the image
    p5.loadImage('/images/portrait/image4.png', (img) => {
      img.resize(width, height);
      img.loadPixels();

      const dotSpacing = 2; // Adjust for dot density

      const tempDots: Dot[] = [];

      for (let y = 0; y < img.height; y += dotSpacing) {
        for (let x = 0; x < img.width; x += dotSpacing) {
          const index = (x + y * img.width) * 4;
          const alpha = img.pixels[index + 3];
          if (alpha > 128) {
            tempDots.push({
              targetX: x,
              targetY: y,
              currentX: x,
              currentY: y,
              offsetX: 0,
              offsetY: 0,
              noiseX: p5.random(0, 1000),
              noiseY: p5.random(0, 1000),
              displacementX: 0,
              displacementY: 0,
            });
          }
        }
      }

      dotsRef.current = tempDots;
    });
  };

  const draw: SketchProps['draw'] = (p5: p5Types) => {
    p5.clear(0, 0, 0, 0); // Clear the canvas to make it transparent

    const dots = dotsRef.current;
    const displacementFactor = displacementFactorRef.current;
    const animationState = animationStateRef.current;
    const animationProgress = animationProgressRef.current;

    dots.forEach((dot) => {
      if (animationState === 'pixelate' && dot.randomX !== undefined && dot.randomY !== undefined) {
        // Pixelate animation
        const pixelateDuration = 120; // Number of frames for the pixelate effect
        const progress = animationProgress / pixelateDuration;

        if (progress < 0.5) {
          // Move dots to random positions
          const easedProgress = easeOutQuad(progress * 2); // Ease out for the first half
          dot.currentX = p5.lerp(dot.targetX, dot.randomX, easedProgress);
          dot.currentY = p5.lerp(dot.targetY, dot.randomY, easedProgress);
        } else {
          // Move dots back to original positions
          const easedProgress = easeInQuad((progress - 0.5) * 2); // Ease in for the second half
          dot.currentX = p5.lerp(dot.randomX, dot.targetX, easedProgress);
          dot.currentY = p5.lerp(dot.randomY, dot.targetY, easedProgress);
        }
      } else if (animationState === 'scroll') {
        // Scroll-induced displacement
        dot.currentX = p5.lerp(
          dot.currentX,
          dot.targetX + dot.displacementX * displacementFactor,
          0.1
        );
        dot.currentY = p5.lerp(
          dot.currentY,
          dot.targetY + dot.displacementY * displacementFactor,
          0.1
        );
      } else {
        // Normal state
        dot.currentX = p5.lerp(dot.currentX, dot.targetX, 0.1);
        dot.currentY = p5.lerp(dot.currentY, dot.targetY, 0.1);
      }

      // Apply subtle noise movement
      const movementRadius = 4; // Adjust the radius of movement
      const noiseScale = 0.02; // Adjust for movement speed

      dot.offsetX = p5.map(p5.noise(dot.noiseX), 0, 1, -movementRadius, movementRadius);
      dot.offsetY = p5.map(p5.noise(dot.noiseY), 0, 1, -movementRadius, movementRadius);

      dot.noiseX += noiseScale;
      dot.noiseY += noiseScale;

      p5.fill(255, 255, 255, 200);
      p5.ellipse(dot.currentX + dot.offsetX, dot.currentY + dot.offsetY, 2, 2);
    });

    // Handle displacement factor reduction
    if (animationState === 'scroll') {
      displacementFactorRef.current = p5.lerp(displacementFactorRef.current, 0, 0.05);
    }

    // Handle pixelate animation progress
    if (animationState === 'pixelate') {
      animationProgressRef.current += 1;

      if (animationProgressRef.current > 60) {
        // Pixelate animation completed
        animationStateRef.current = 'normal';
        animationProgressRef.current = 0;

        // Reset random positions
        dots.forEach((dot) => {
          dot.randomX = undefined;
          dot.randomY = undefined;
        });
      }
    }
  };

  // Easing functions
  const easeOutQuad = (t: number) => t * (2 - t);
  const easeInQuad = (t: number) => t * t;

  return (
    <div className="dot-portrait-wrapper">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default DotPortrait;