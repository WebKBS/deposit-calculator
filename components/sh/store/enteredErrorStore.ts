import { create } from 'zustand';

interface IUseErrorStore {
  enteredError: boolean;
  setEnteredError: (newEnteredError: boolean) => void;
}

const useEnteredErrorStore = create<IUseErrorStore>((set) => ({
  enteredError: false,
  setEnteredError: (newEnteredError) => set({ enteredError: newEnteredError }),
}));

export default useEnteredErrorStore;
