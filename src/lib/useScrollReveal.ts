'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Intersection Observer-based scroll reveal.
 * Adds 'is-visible' class when element enters viewport.
 * Uses CSS classes defined in globals.css for animation.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return ref;
}

/**
 * Batch reveal hook for multiple children.
 * Attaches IntersectionObserver to parent, reveals children with staggered delays.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealChildren = container.querySelectorAll('.reveal');
    if (prefersReducedMotion) {
      revealChildren.forEach((child) => child.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealChildren.forEach((child) => child.classList.add('is-visible'));
          observer.unobserve(container);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
        ...options,
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [options]);

  return ref;
}
