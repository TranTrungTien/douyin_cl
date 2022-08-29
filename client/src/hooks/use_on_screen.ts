import { MutableRefObject, useEffect, useState } from "react";
import { ISearchPapeData } from "../pages/search_page";

export function useOnScreen<T extends Element>(
  ref: MutableRefObject<T | null>,
  rootMargin: string = "0px"
): ISearchPapeData {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<ISearchPapeData>({
    isActive: false,
    isNext: false,
    isPrev: false,
    isVisible: false,
  });
  useEffect(() => {
    let observerRefValue: any = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting((prev) => {
          return {
            ...prev,
            isActive: entry.isIntersecting,
            isVisible: entry.isIntersecting,
          };
        });
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }
    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
