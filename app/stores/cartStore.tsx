import { create } from "zustand";

// Define the CartItem type
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string; // Use lowercase "image" for the field name to match standard conventions
}

// Define the state and actions for the cart
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

// Create the Zustand store with TypeScript
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  // Add item to cart
  addToCart: (product: CartItem) => {
    const existingItem = get().items.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if item already exists
      set({
        items: get().items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      // Add new item to the cart
      set({
        items: [...get().items, { ...product, quantity: 1 }],
      });
    }

    // Update total items and total price
    set((state) => ({
      totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    }));
  },

  // Remove item from cart
  removeFromCart: (id: number) => {
    set({
      items: get().items.filter(item => item.id !== id),
    });

    // Update total items and total price
    set((state) => ({
      totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    }));
  },

  // Update item quantity
  updateQuantity: (id: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(id); // Remove item if quantity is less than or equal to 0
    } else {
      set({
        items: get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      });
    }

    // Update total items and total price
    set((state) => ({
      totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    }));
  },

  // Clear the cartpP
  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));


export default useCartStore;