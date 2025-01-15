export const rolesPermission = Object.freeze({
  2: ["2"] as string[],
  1: ["1", "2"] as string[],
} as Record<number, string[]>);

export const roles = Object.freeze({
  ADMIN: 1,
  USER: 2
});

export const permissibleRole: Record<number, number[]> = {
  1: [roles.ADMIN],
  2: [roles.ADMIN, roles.USER],
};

export const groceryType = Object.freeze({
  l: "1" as string,
  kg: "2" as string,
  dz: "3" as string,
  gm: "4" as string,
  ml: "5" as string,
});

export const groceryTypeCategory = Object.freeze({
  KG: [groceryType.kg, groceryType.gm],
  LITRE: [groceryType.l, groceryType.ml],
});

export const groceryCategory = Object.freeze({
  DAIRY: "1" as string,
  GRAIN: "2" as string,
  BAKERY: "3" as string,
  DRY_FRUITS: "4" as string,
  SWEETS: "5" as string,
  VEGETABLES: "6" as string,
  FRUITS: "7" as string,
  INSTANT_FOOD: "8" as string,
  OTHERS: "9" as string,
});

export const placedOrderStatus = Object.freeze({
  1: 'Confirmed',
  2: 'Out of stock',
  3: 'Grocery not exist'
});