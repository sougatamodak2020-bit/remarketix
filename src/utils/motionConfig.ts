import { Variants, Transition } from "framer-motion";

// Optimized transition presets
export const smoothTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export const fastTransition: Transition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
};

export const slowTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

// Optimized animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: fastTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: fastTransition,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: smoothTransition,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: fastTransition,
  },
};

// Viewport configuration for better performance
export const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: "-50px",
};