import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  toggle: () => void;
}

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
