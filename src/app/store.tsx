import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order } from './types';

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, item: CartItem) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: 'pending' | 'delivered') => void;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('webmie-cart');
    const savedOrders = localStorage.getItem('webmie-orders');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      // Convert timestamp strings back to Date objects
      const ordersWithDates = parsedOrders.map((order: any) => ({
        ...order,
        timestamp: new Date(order.timestamp),
      }));
      setOrders(ordersWithDates);
    }
  }, []);

  // Save to localStorage whenever cart or orders change
  useEffect(() => {
    localStorage.setItem('webmie-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('webmie-orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartItem = (itemId: string, updatedItem: CartItem) => {
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...updatedItem, id: itemId } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: 'pending' | 'delivered') => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        orders,
        addOrder,
        updateOrderStatus,
        currentOrder,
        setCurrentOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
