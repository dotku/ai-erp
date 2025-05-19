/**
 * Breakpoints for responsive design
 */

export const breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

// Media query helpers for styled-components
export const media = {
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
  xxl: `@media (max-width: ${breakpoints.xxl})`,
  
  // Between breakpoints
  between: (min, max) => `@media (min-width: ${min}) and (max-width: ${max})`,
  
  // Up from breakpoint
  up: (size) => `@media (min-width: ${breakpoints[size]})`,
  
  // Down from breakpoint
  down: (size) => `@media (max-width: ${breakpoints[size]})`,
};
