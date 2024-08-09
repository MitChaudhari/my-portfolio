// src/utils/firefliesEffect.ts

//home page background firefiles effect
export const createFireflies = (container: HTMLDivElement | null, count: number) => {
    if (!container) return;
  
    for (let i = 0; i < count; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      firefly.style.top = `${60 + Math.random() * 40}%`; // Position fireflies in the bottom 40% of the screen
      firefly.style.left = `${Math.random() * 100}%`;
      firefly.style.setProperty('--random-x', `${Math.random()}`);
      firefly.style.setProperty('--random-y', `${Math.random()}`);
      firefly.style.setProperty('--random-speed', `${Math.random()}`);
      firefly.style.animationDelay = `${Math.random() * 2}s`;
      firefly.style.animationDuration = `${Math.random() * 6 + 4}s`; // Slower and more natural animation
      container.appendChild(firefly);
    }
  };
  