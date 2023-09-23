import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  image: "",
};

const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    setPlantName(state, action) {
      state.name = action.payload;
    },
    setPlantImage(state, action) {
      state.image = action.payload;
    },
  },
});

export const { setPlantName, setPlantImage } = plantSlice.actions;
export default plantSlice.reducer;

export const selectPlantName = (state) => state.plant.name;
export const selectPlantImage = (state) => state.plant.image;
