"use client";

import { useEffect, useRef } from "react";
import { advanceCardSpring } from "../../lib/ui/card-motion";

// Track the pointer on a stationary surface, with a wider 20°/35° tilt range.
export function useCardHover() {
  const ref = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const card = ref.current;
    const surface = surfaceRef.current;
    if (!card || !surface) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rest = { rotateX: 0, rotateY: 0, x: 50, y: 50, opacity: 0 };
    const current = { ...rest };
    let target = { ...rest };
    const velocity = { rotateX: 0, rotateY: 0, x: 0, y: 0, opacity: 0 };
    const keys = Object.keys(rest) as (keyof typeof rest)[];
    let frame = 0;
    let frequency = 18;
    let previousTime = 0;
    let bounds: DOMRect | undefined;

    function paint() {
      if (!card) return;
      card.style.setProperty("--rotate-x", `${current.rotateX}deg`);
      card.style.setProperty("--rotate-y", `${current.rotateY}deg`);
      card.style.setProperty("--pointer-x", `${current.x}%`);
      card.style.setProperty("--pointer-y", `${current.y}%`);
      card.style.setProperty("--background-y", `${current.y}%`);
      card.style.setProperty("--pointer-from-center", String(Math.min(Math.hypot(current.x - 50, current.y - 50) / 50, 1)));
      card.style.setProperty("--card-opacity", String(Math.max(0, Math.min(1, current.opacity))));
    }

    function animate(time: number) {
      frame = 0;
      const seconds = Math.min((time - previousTime) / 1000, .064);
      previousTime = time;
      let moving = false;
      for (const key of keys) {
        const distance = target[key] - current[key];
        if (Math.abs(distance) < .001 && Math.abs(velocity[key]) < .001) {
          current[key] = target[key];
          velocity[key] = 0;
        } else {
          const next = advanceCardSpring(current[key], velocity[key], target[key], seconds, frequency);
          velocity[key] = next.velocity;
          current[key] = next.value;
          moving = true;
        }
      }
      paint();
      if (moving) frame = requestAnimationFrame(animate);
    }

    function start() {
      if (frame) return;
      previousTime = performance.now();
      frame = requestAnimationFrame(animate);
    }

    function move(event: PointerEvent) {
      if (!surface || event.pointerType === "touch" || reducedMotion.matches) return;
      bounds ??= surface.getBoundingClientRect();
      const percent = (value: number) => Math.max(0, Math.min(100, Math.round(value * 100) / 100));
      const x = percent((event.clientX - bounds.left) / bounds.width * 100);
      const y = percent((event.clientY - bounds.top) / bounds.height * 100);
      target = { rotateX: -(x - 50) / 50 * 20, rotateY: (y - 50) / 50 * 35, x, y, opacity: 1 };
      frequency = 18;
      start();
    }

    function leave() {
      bounds = undefined;
      target = { ...rest };
      frequency = 14;
      start();
    }

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      bounds = undefined;
      target = { ...rest };
      Object.assign(current, rest);
      for (const key of keys) velocity[key] = 0;
      paint();
    }

    const invalidateBounds = () => { bounds = undefined; };
    const resizeObserver = new ResizeObserver(invalidateBounds);
    resizeObserver.observe(surface);
    window.addEventListener("scroll", invalidateBounds, true);
    window.addEventListener("resize", invalidateBounds);
    surface.addEventListener("pointerenter", move);
    surface.addEventListener("pointermove", move);
    surface.addEventListener("pointerleave", leave);
    surface.addEventListener("pointercancel", reset);
    reducedMotion.addEventListener("change", reset);
    return () => {
      reset();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", invalidateBounds, true);
      window.removeEventListener("resize", invalidateBounds);
      surface.removeEventListener("pointerenter", move);
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", leave);
      surface.removeEventListener("pointercancel", reset);
      reducedMotion.removeEventListener("change", reset);
    };
  }, []);
  return { cardRef: ref, surfaceRef };
}
