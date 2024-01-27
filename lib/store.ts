import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  toggle: () => void;
}
interface DepositChange {
  isDepositChange: boolean;
<<<<<<< HEAD
  setToggleDepositChange: () => void;
=======
  toggleDepositChange: () => void;
>>>>>>> refs/remotes/origin/main
}

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

<<<<<<< HEAD
export const useDepositChange = create<DepositChange>((set) => ({
  isDepositChange: false,
  setToggleDepositChange: () =>
=======
export const depositChange = create<DepositChange>((set) => ({
  isDepositChange: false,
  toggleDepositChange: () =>
>>>>>>> refs/remotes/origin/main
    set((state) => ({ isDepositChange: !state.isDepositChange })),
}));
