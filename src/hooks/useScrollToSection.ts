import { useCallback } from 'react';

const useScrollToSection = () => {
  const scrollToSection = useCallback((id: string): void => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { scrollToSection };
};

export default useScrollToSection;
