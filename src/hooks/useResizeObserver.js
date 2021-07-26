import { useEffect, useState } from 'react';

function useResizeObserver(ref) {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observerTatget = ref.current;
    let resizeObserver;
    if (observerTatget) {
      resizeObserver = new ResizeObserver(([entry]) =>
        setDimensions(entry.contentRect)
      );

      resizeObserver.observe(observerTatget);
    }

    return () => {
      resizeObserver.unobserve(observerTatget);
    };
  }, [ref]);

  return dimensions;
}

export default useResizeObserver;
