import { useCallback, useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks pointer position relative to the given container ref, expressed
 * in percentage (0-100) so it can drive a CSS radial-gradient glow that
 * follows the cursor. Falls back to the center point until first move.
 */
export function useMousePosition<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const [position, setPosition] = useState<MousePosition>({ x: 50, y: 50 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { containerRef, position };
}
