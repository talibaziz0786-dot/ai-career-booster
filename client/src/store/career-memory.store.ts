import { create } from "zustand";

import type {
  CareerMemory,
} from "../types/career-memory";

interface CareerMemoryStore {

  memory: CareerMemory | null;

  setMemory: (
    memory: CareerMemory
  ) => void;

  updateMemory: (
    data: Partial<CareerMemory>
  ) => void;

  clearMemory: () => void;

}

export const useCareerMemoryStore =
create<CareerMemoryStore>((set) => ({

  memory: null,

  

  setMemory: (
    memory
  ) =>
    set({
      memory,
    }),
    

  updateMemory: (
    data
  ) =>
    set((state) => ({

      memory:
        state.memory
          ? {
              ...state.memory,
              ...data,
            }
          : null,

    })),

  clearMemory: () =>
    set({
      memory: null,
    }),

}));