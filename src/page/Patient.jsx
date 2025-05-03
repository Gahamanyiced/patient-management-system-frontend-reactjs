import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  addPatientAsync,
  getAllPatientsAsync,
  updatePatientAsync,
  deletePatientAsync,
} from '../feature/patientSlice';

function Patient() {
  const dispatch = useDispatch();
  const { isLoading, error, patient, patients } = useSelector(
    (state) => state.patients
  );

  useEffect(() => {
    dispatch(getAllPatientsAsync());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [patientData, setPatientData] = useState({
    name: '',
    address: '',
    diagnosis: '',
    treatment: '',
    history: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isEditMode && selectedPatientId) {
        response = await dispatch(updatePatientAsync({
          id: selectedPatientId,
          patient: patientData
        }));
      } else {
        response = await dispatch(addPatientAsync(patientData));
      }

      if (response.payload && response.payload.success) {
        setSnackbar({
          open: true,
          message: response.payload.message || `Patient ${isEditMode ? 'updated' : 'added'} successfully!`,
          severity: 'success',
        });
        handleClose();
        dispatch(getAllPatientsAsync());
      } else if (response.error) {
        setSnackbar({
          open: true,
          message: response.error.message || `Failed to ${isEditMode ? 'update' : 'add'} patient`,
          severity: 'error',
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'An unexpected error occurred',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (patientId) => {
    try {
      const response = await dispatch(deletePatientAsync(patientId));
      
      if (response.payload && response.payload.success) {
        setSnackbar({
          open: true,
          message: response.payload.message || 'Patient deleted successfully!',
          severity: 'success',
        });
        dispatch(getAllPatientsAsync());
      } else if (response.error) {
        setSnackbar({
          open: true,
          message: response.error.message || 'Failed to delete patient',
          severity: 'error',
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'An unexpected error occurred',
        severity: 'error',
      });
    }
  };

  const handleEdit = (patient) => {
    setIsEditMode(true);
    setSelectedPatientId(patient._id);
    setPatientData({
      name: patient.name,
      address: patient.address,
      diagnosis: patient.diagnosis,
      treatment: patient.treatment,
      history: patient.history,
    });
    setOpen(true);
  };

  const handleClickOpen = () => {
    setIsEditMode(false);
    setSelectedPatientId(null);
    setPatientData({
      name: '',
      address: '',
      diagnosis: '',
      treatment: '',
      history: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    setSelectedPatientId(null);
    setPatientData({
      name: '',
      address: '',
      diagnosis: '',
      treatment: '',
      history: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Patient Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Add New Patient'}
        </Button>
      </Box>

      {/* Patient List Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Treatment</TableCell>
              <TableCell>Medical History</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading patients...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Alert severity="error">{error}</Alert>
                </TableCell>
              </TableRow>
            ) : patients?.data?.length > 0 ? (
              patients.data.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>{patient.diagnosis}</TableCell>
                  <TableCell>{patient.treatment}</TableCell>
                  <TableCell>{patient.history}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(patient)}
                      disabled={isLoading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(patient._id)}
                      disabled={isLoading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No patients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Patient Dialog */}
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle>
          {isEditMode ? 'Edit Patient' : 'Add New Patient'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Please fill in the patient details below:
            </DialogContentText>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Full Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={patientData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={patientData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  id="diagnosis"
                  name="diagnosis"
                  label="Diagnosis"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={patientData.diagnosis}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  id="treatment"
                  name="treatment"
                  label="Treatment"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={patientData.treatment}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="history"
                  name="history"
                  label="Medical History"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={patientData.history}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary" 
              disabled={isLoading}
              variant="contained"
            >
              {isLoading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Patient;