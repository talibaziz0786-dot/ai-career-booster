import { create } from "zustand";

import type {
  CareerProfile,
} from "../types/career-profile";

interface CareerProfileStore {

  profile:

    CareerProfile |

    null;

  setProfile: (

    profile: CareerProfile

  ) => void;

  updateProfile: (

    data: Partial<CareerProfile>

  ) => void;

  clearProfile: () => void;

}

export const useCareerProfileStore =

create<CareerProfileStore>((set) => ({

  profile: null,

  setProfile: (

    profile

  ) =>

    set({

      profile,

    }),

  updateProfile: (

    data

  ) =>

    set((state) => ({

      profile:

        state.profile

          ? {

              ...state.profile,

              ...data,

            }

          : null,

    })),

  clearProfile: () =>

    set({

      profile: null,

    }),

}));