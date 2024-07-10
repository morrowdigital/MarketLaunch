/**
 * Determines if the current environment is a web browser.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 *  Determines if the current environment is a Node.js server.
 */
export function isNode(): boolean {
  return !isBrowser();
}
