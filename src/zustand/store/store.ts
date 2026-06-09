import { create } from "zustand";
type FormStore<T extends object = object> = {
  data: Partial<T>;
  setData: (newData: Partial<T>) => void;
  reset: () => void;
};

export function CreateFormStore<T extends object>() {
  return create<FormStore<T>>((set) => ({
    data: {},
    setData(newData) {
      set((state) => ({
        data: { ...state.data, ...newData },
      }));
    },
    reset: () => set({ data: {} }),
  }));
}
