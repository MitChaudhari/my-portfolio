// src/utils/iconJumpEffect.ts

 //Icon Jump Effect, home page
export const addJumpEffectToIcons = () => {
    const icons = document.querySelectorAll('.social-icon');
    if (icons.length === 0) return;
  
    const addJumpClass = () => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      randomIcon.classList.add('jump');
      setTimeout(() => {
        randomIcon.classList.remove('jump');
      }, 1000); // Adjust to match animation duration
    };
  
    const intervalId = setInterval(() => {
      addJumpClass();
    }, Math.random() * 4000 + 3000); // Random interval between 3 to 7 seconds
  
    return () => clearInterval(intervalId);
  };
  