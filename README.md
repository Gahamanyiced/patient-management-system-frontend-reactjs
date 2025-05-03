# Patient Management System

A comprehensive web application for managing patient records, built with React, Redux, and Material-UI.

## Features

- ✨ **Full CRUD Operations**: Create, Read, Update, and Delete patient records
- 📋 **Patient Information**: Track patient details including name, address, diagnosis, treatment, and medical history
- 🚀 **Real-time Updates**: Instant feedback for all operations
- 🎨 **Material Design**: Clean, modern UI using Material-UI components
- 🔄 **State Management**: Powered by Redux for efficient state handling
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gahamanyiced/patient-management-system-frontend-reactjs.git
   cd patient-management-system-frontend-reactjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The application will open automatically in your default browser at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
patient-management-system-frontend-reactjs/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/           # React components
│   │   └── patient/         # Patient component
│   ├── feature/             # Redux slices
│   │   └── patientSlice.js  # Patient state management
│   ├── App.js               # Main application component
│   ├── index.js             # Application entry point
│   └── ...
├── package.json
└── README.md
```

## Component Overview

### Patient Component

The main component for managing patient records includes:

- **Patient Table**: Displays all patient records
- **Add/Edit Dialog**: Modal form for creating or updating patients
- **Delete Functionality**: Remove patients with confirmation
- **Notifications**: Success/error messages using Snackbar

## API Integration

The application communicates with a backend API for all CRUD operations:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patient` | Fetch all patients |
| POST | `/patient` | Create new patient |
| GET | `/patient/:id` | Get single patient |
| PUT | `/patient/:id` | Update patient |
| DELETE | `/patient/:id` | Delete patient |

## State Management

The application uses Redux with the following pattern:

```javascript
// Redux structure
{
  patients: {
    patients: [],    // Array of all patients
    patient: null,    // Single patient for operations
    isLoading: false, // Loading state
    error: null       // Error message
  }
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Technologies Used

- [React](https://reactjs.org/) - Frontend library
- [Redux](https://redux.js.org/) - State management
- [Material-UI](https://mui.com/) - UI components
- [Axios](https://axios-http.com/) - HTTP client
- [Redux Toolkit](https://redux-toolkit.js.org/) - Redux utilities

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the backend server is running
   - Check if the API URL in your code matches your backend URL

2. **Installation Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

3. **CORS Errors**
   - Configure CORS in your backend server
   - Ensure the frontend URL is allowed in the CORS configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Gahamanyi CEd - gahamacedr@gmail

Project Link: [https://github.com/Gahamanyiced/patient-management-system-frontend-reactjs](https://github.com/Gahamanyiced/patient-management-system-frontend-reactjs)

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [Material-UI Documentation](https://mui.com/getting-started/installation/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)