import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define what a Cart Item looks like
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 2. Updated CartStore Interface
interface CartStore {
  items: CartItem[];
  isOpen: boolean; // Controls if the sidebar is visible
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void; // Added for post-checkout cleanup
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      // THE FIX: Implementation to reset items to an empty array
      clearCart: () => set({ items: [] }), 
    }),
    { name: 'cart-storage' } // Saves the cart in the browser's LocalStorage!
  )
);

// 3. Filter Store for Search and Categories
interface FilterStore {
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
}

export const useFilters = create<FilterStore>((set) => ({
  searchQuery: "",
  selectedCategory: "All",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategory: (category) => set({ selectedCategory: category }),
}));