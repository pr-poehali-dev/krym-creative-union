import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  canDuplicate: boolean;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  duplicateItem: (id: string) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  applyPromocode: (code: string) => boolean;
  promoCode: string;
  discount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMOCODES: Record<string, number> = {
  'старт платформы': 5,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        if (item.canDuplicate) {
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return prevItems;
      }
      
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const duplicateItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.canDuplicate
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const applyPromocode = (code: string): boolean => {
    const normalizedCode = code.toLowerCase().trim();
    if (PROMOCODES[normalizedCode]) {
      setPromoCode(code);
      setDiscount(PROMOCODES[normalizedCode]);
      return true;
    }
    return false;
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    setDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        duplicateItem,
        getTotalPrice,
        getItemCount,
        applyPromocode,
        promoCode,
        discount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};