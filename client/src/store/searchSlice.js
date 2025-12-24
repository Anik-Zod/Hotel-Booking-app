import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: "Chittagong",
  selectedDates: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    newSearch: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { newSearch } = searchSlice.actions;
export default searchSlice.reducer;