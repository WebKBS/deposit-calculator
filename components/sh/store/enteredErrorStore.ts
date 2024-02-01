import create from 'zustand';

interface IErrorStore {
  enteredError: boolean;
  setEnteredError: (newEnteredError: boolean) => void;
}

const enteredErrorStore = create<IErrorStore>((set) => ({
  enteredError: false,
  setEnteredError: (newEnteredError) => set({ enteredError: newEnteredError }),
}));

export default enteredErrorStore;
