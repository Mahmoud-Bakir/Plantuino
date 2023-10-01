import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plantName: "",
  image: "",
  maxLight: null,
  maxMoisture: null,
  minLight: null,
  minMoisture: null,
  defined: false,
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
    setPlantDetails(state, action) {
      const {
        maxLight,
        maxMoisture,
        minLight,
        minMoisture,
        plantName,
        image
      } = action.payload;
      state.maxLight = maxLight;
      state.maxMoisture = maxMoisture;
      state.minLight = minLight;
      state.minMoisture = minMoisture;
      state.plantName = plantName;
      state.image = image;
      state.defined = true; 
    },
    setDefinedTrue(state) {
      state.defined = true;
    },
  },
});

export const {
  setPlantName,
  setPlantImage,
  setPlantDetails,
  setDefinedTrue,
} = plantSlice.actions;

export const selectPlantName = (state) => state.plant.name;
export const selectPlantImage = (state) => state.plant.image;
export const selectPlantDefined = (state) => state.plant.defined;
export const selectPlantDetails = (state) => state.plant;


export default plantSlice.reducer;
