/**
 * Generates a random booking ID
 * @returns A random booking ID in the format SV-XXXXXX
 */
export const generateBookingId = (): string => {
  const randomPart = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  return `SV-${randomPart}`;
};