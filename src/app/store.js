import { configureStore } from '@reduxjs/toolkit';
import patientReduce from '../feature/patientSlice'; // Update the import path based on your file structure

export const store = configureStore({
  reducer: {
    patients: patientReduce,
  },
});

export default store;
