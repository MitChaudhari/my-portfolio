export const fetchDotCoordinates = async (): Promise<{ x: number; y: number }[]> => {
    try {
      const response = await fetch('/animation/dot-cords.json');
      if (!response.ok) throw new Error('Failed to fetch dot coordinates');
      return response.json();
    } catch (error) {
      console.error('Error loading dot coordinates:', error);
      return [];
    }
  };
  