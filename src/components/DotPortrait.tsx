// src/components/DotPortrait.tsx
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
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
  offsetX: number;
  offsetY: number;
  noiseX: number;
  noiseY: number;
}

const DotPortrait = () => {
  const width = 600; // Canvas width
  const height = 600; // Canvas height

  const dotsRef = useRef<Dot[]>([]);

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
              offsetX: 0,
              offsetY: 0,
              noiseX: p5.random(0, 1000),
              noiseY: p5.random(0, 1000),
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

    dots.forEach((dot) => {
      // Update offsets using Perlin noise for smooth movement
      const movementRadius = 5; // Adjust the radius of movement
      const noiseScale = 0.02; // Adjust for movement speed

      dot.offsetX = p5.map(p5.noise(dot.noiseX), 0, 1, -movementRadius, movementRadius);
      dot.offsetY = p5.map(p5.noise(dot.noiseY), 0, 1, -movementRadius, movementRadius);

      dot.noiseX += noiseScale;
      dot.noiseY += noiseScale;

      p5.fill(255, 255, 255, 200);
      p5.ellipse(dot.targetX + dot.offsetX, dot.targetY + dot.offsetY, 2, 2);
    });
  };

  return (
    <div className="dot-portrait-wrapper">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default DotPortrait;
