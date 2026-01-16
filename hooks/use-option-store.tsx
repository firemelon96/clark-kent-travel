import { create } from "zustand";

interface OptionsState {
  id: string | null;
  setId: (id: string) => void;
  onClose: () => void;
}

const useOptionStore = create<OptionsState>((set) => ({
  id: null,
  onClose: () => set({ id: null }),
  setId: (data) => set(() => ({ id: data })),
}));

export default useOptionStore;
