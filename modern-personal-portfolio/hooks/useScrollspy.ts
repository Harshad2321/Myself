
import { useState, useEffect, useRef } from 'react';

export const useScrollspy = (ids: string[], options?: IntersectionObserverInit) => {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));
    
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });

    return () => observer.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, options]);

  return activeId;
};
