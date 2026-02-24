/**
 * Helper functions for TypeScript learning
 */

export function greetLearner(name: string): string {
  return `Welcome to TypeScript Course, ${name}! Ìæì`;
}

export function logMessage(title: string, message: string): void {
  console.log(`\n[${title}]`);
  console.log(message);
  console.log('---\n');
}

export function exercise<T>(name: string, fn: () => T): T {
  console.log(`Ì≥ù Exercise: ${name}`);
  const result = fn();
  console.log(`‚úÖ Completed!`);
  return result;
}
