// src/utils/handleScroll.ts

// Handle smooth scroll to a section
export const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  event.preventDefault();
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
};
