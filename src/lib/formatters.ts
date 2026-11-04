/**
 * Indian Rupee & Real Estate Formatting Utilities
 */

/**
 * Formats a number as Indian Currency with comma groupings (e.g., ₹8,05,000)
 */
export function formatINR(amount?: number | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Price on Request';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a number in Lakhs/Crores for compact display (e.g. ₹8.05 Lakhs)
 */
export function formatINRLakhs(amount?: number | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'On Request';
  }
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lk = amount / 100000;
    return `₹${lk.toFixed(2)} Lakhs`;
  }
  return formatINR(amount);
}

/**
 * Formats plot dimensions into a readable string (e.g. 20 ft × 35 ft)
 */
export function formatPlotDimensions(
  width?: number | null,
  length?: number | null
): string {
  if (width && length) {
    return `${width} ft × ${length} ft`;
  }
  if (width) {
    return `${width} ft frontage`;
  }
  if (length) {
    return `${length} ft depth`;
  }
  return 'Standard Layout';
}

