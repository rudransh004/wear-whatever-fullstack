import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Updated CartItem interface with size & composite key
export interface CartItem {
  id: string;          // Original Product ID
  cartItemId?: string;  // Unique composite key: `${id}-${size}`
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;         // Selected size (e.g., 'S', 'M', 'L', 'XL', 'XXL')
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateSize: (cartItemId: string, newSize: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) => set((state) => {
        const itemSize = newItem.size || 'M';
        const compositeId = `${newItem.id}-${itemSize}`;
        
        const existingIndex = state.items.findIndex(
          (item) => (item.cartItemId || `${item.id}-${item.size}`) === compositeId
        );

        if (existingIndex > -1) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex].quantity += newItem.quantity || 1;
          return { isOpen: true, items: updatedItems };
        }

        const brandNewItem: CartItem = {
          ...newItem,
          size: itemSize,
          cartItemId: compositeId,
          quantity: newItem.quantity || 1,
        };

        return {
          isOpen: true,
          items: [...state.items, brandNewItem],
        };
      }),

      removeItem: (cartItemId) => set((state) => ({
        items: state.items.filter(
          (item) => (item.cartItemId || `${item.id}-${item.size}`) !== cartItemId
        ),
      })),

      updateQuantity: (cartItemId, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter(
              (item) => (item.cartItemId || `${item.id}-${item.size}`) !== cartItemId
            ),
          };
        }
        return {
          items: state.items.map((item) =>
            (item.cartItemId || `${item.id}-${item.size}`) === cartItemId
              ? { ...item, quantity }
              : item
          ),
        };
      }),

      updateSize: (cartItemId, newSize) => set((state) => {
        const targetItem = state.items.find(
          (item) => (item.cartItemId || `${item.id}-${item.size}`) === cartItemId
        );
        if (!targetItem) return state;

        const newCompositeId = `${targetItem.id}-${newSize}`;
        const existingTargetIndex = state.items.findIndex(
          (item) => (item.cartItemId || `${item.id}-${item.size}`) === newCompositeId
        );

        // If the new size already exists in cart, merge quantities
        if (existingTargetIndex > -1 && newCompositeId !== cartItemId) {
          const updatedItems = state.items
            .filter((item) => (item.cartItemId || `${item.id}-${item.size}`) !== cartItemId)
            .map((item) =>
              (item.cartItemId || `${item.id}-${item.size}`) === newCompositeId
                ? { ...item, quantity: item.quantity + targetItem.quantity }
                : item
            );
          return { items: updatedItems };
        }

        return {
          items: state.items.map((item) =>
            (item.cartItemId || `${item.id}-${item.size}`) === cartItemId
              ? { ...item, size: newSize, cartItemId: newCompositeId }
              : item
          ),
        };
      }),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);

// Filter Store
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

// Wishlist Store
interface WishlistStore {
  wishlistIds: string[];
  userId: string | null;
  setWishlist: (ids: string[]) => void;
  setUserId: (id: string | null) => void;
  clientToggle: (id: string) => void;
}

export const useWishlist = create<WishlistStore>((set) => ({
  wishlistIds: [],
  userId: null,
  setWishlist: (ids) => set({ wishlistIds: ids }),
  setUserId: (id) => set({ userId: id }),
  clientToggle: (id) => set((state) => ({
    wishlistIds: state.wishlistIds.includes(id)
      ? state.wishlistIds.filter((pId) => pId !== id)
      : [...state.wishlistIds, id]
  })),
}));