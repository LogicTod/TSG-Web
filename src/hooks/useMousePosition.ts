import { useCallback, useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface RawMousePosition {
  x: number;
  y: number;
}

/**
 * Tracks pointer position relative to the given container ref, expressed
 * in percentage (0-100) and raw pixels so it can drive radial-gradient glows
 * and spotlight text reveals that follow the cursor.
 */
export function useMousePosition<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const [position, setPosition] = useState<MousePosition>({ x: 50, y: 50 });
  const [rawPosition, setRawPosition] = useState<RawMousePosition>({ x: -9999, y: -9999 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
    setRawPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { containerRef, position, rawPosition };
}
