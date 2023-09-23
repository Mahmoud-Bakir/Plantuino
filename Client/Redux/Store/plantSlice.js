import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plantName: "",
  image: "",
};

const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    setPlantName(state, action) {
      state.plantName = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
  },
});

export const { setPlantName, setImage } = plantSlice.actions;
export default plantSlice.reducer;

export const selectPlantName = (state) => state.plant.plantName;
export const selectImage = (state) => state.plant.image;
