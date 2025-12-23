import { create } from "zustand";

export const useHotelStore = create((set) => ({
  hotels: [],
  setHotels: (hotels) => set({ hotels }),
}));
