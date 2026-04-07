export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  selectedToppings: Topping[];
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  queueNumber: number;
  tableNumber: number;
  status: 'pending' | 'delivered';
  timestamp: Date;
}

export const AVAILABLE_TOPPINGS: Topping[] = [
  { id: 'ayam', name: 'Ayam', price: 5000 },
  { id: 'telur', name: 'Telur', price: 3000 },
  { id: 'bakso', name: 'Bakso', price: 4000 },
];
