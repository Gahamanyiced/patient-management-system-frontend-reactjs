import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:8000/api/v1';

// Add a patient
export const addPatientAsync = createAsyncThunk(
  'patients/addPatient',
  async (patient, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/patient`,
        patient,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add patient'
      );
    }
  }
);

// Get all patients
export const getAllPatientsAsync = createAsyncThunk(
  'patients/getAllPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/patient`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch patients'
      );
    }
  }
);

// Get patient by ID
export const getPatientByIdAsync = createAsyncThunk(
  'patients/getPatientById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/patient/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch patient'
      );
    }
  }
);

// Update patient
export const updatePatientAsync = createAsyncThunk(
  'patients/updatePatient',
  async ({ id, patient }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/patient/${id}`,
        patient,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update patient'
      );
    }
  }
);

// Delete patient
export const deletePatientAsync = createAsyncThunk(
  'patients/deletePatient',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/patient/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete patient'
      );
    }
  }
);

export const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    patient: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Add patient
      .addCase(addPatientAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.patient = null;
      })
      .addCase(addPatientAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload;
      })
      .addCase(addPatientAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add patient';
      })
      // Get all patients
      .addCase(getAllPatientsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPatientsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(getAllPatientsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch patients';
      })
      // Get patient by ID
      .addCase(getPatientByIdAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPatientByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload;
      })
      .addCase(getPatientByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch patient';
      })
      // Update patient
      .addCase(updatePatientAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePatientAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload;
      })
      .addCase(updatePatientAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update patient';
      })
      // Delete patient
      .addCase(deletePatientAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePatientAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload;
      })
      .addCase(deletePatientAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete patient';
      });
  },
});

export default patientSlice.reducer;