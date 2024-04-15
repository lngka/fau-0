import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 *  merges class names using twMerge and clsx.
 *
 * @param {ClassValue[]} inputs - An array of class values to be merged.
 * @return {string} The merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
