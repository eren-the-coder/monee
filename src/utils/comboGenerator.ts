import { WishObject, Combo } from '../types';

export function generateCombos(objects: WishObject[], budget: number): Combo[] {
  if (objects.length === 0 || budget <= 0) return [];

  const affordableObjects = objects.filter(obj => obj.price <= budget);
  if (affordableObjects.length === 0) return [];

  const combos: Combo[] = [];
  const n = affordableObjects.length;
  const maxSubsets = Math.min(1 << n, 4096);

  for (let mask = 1; mask < maxSubsets && mask < (1 << n); mask++) {
    const currentCombo: WishObject[] = [];
    let totalPrice = 0;

    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        currentCombo.push(affordableObjects[i]);
        totalPrice += affordableObjects[i].price;
      }
    }

    if (totalPrice <= budget) {
      combos.push({
        objects: currentCombo,
        totalPrice,
        remaining: budget - totalPrice
      });
    }
  }

  combos.sort((a, b) => {
    if (a.objects.length !== b.objects.length) {
      return b.objects.length - a.objects.length;
    }
    return a.totalPrice - b.totalPrice;
  });

  return combos;
}