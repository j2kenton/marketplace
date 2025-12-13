export const clampQuantity = (
  quantity: number,
  maxQuantity?: number
): number => {
  const nonNegative = Math.max(0, quantity);
  return typeof maxQuantity === "number"
    ? Math.min(nonNegative, maxQuantity)
    : nonNegative;
};
