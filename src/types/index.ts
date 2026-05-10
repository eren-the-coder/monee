export interface WishObject {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export interface Combo {
  objects: WishObject[];
  totalPrice: number;
  remaining: number;
}

export type Screen = 'home' | 'combos';