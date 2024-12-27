// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import CompaniesListPage from './pages/CompaniesListPage';
import CompanyManagement from './pages/Management';
import CommunicationMethods from './pages/CommunicationMethods'; // Import the CommunicationMethods component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/companies" element={<CompaniesListPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/companies" element={<CompanyManagement />} />
        <Route path="/admin/communication-methods" element={<CommunicationMethods />} /> {/* Add the route for CommunicationMethods */}
      </Routes>
    </Router>
  );
};

export default App;
