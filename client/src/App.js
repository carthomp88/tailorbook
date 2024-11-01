
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import OwnerHome from './owner/OwnerHome';
import CustomerHome from './customer/CustomerHome';
import OwnerCalendar from './owner/OwnerCalendar';
import CustomerCalendar from './customer/CustomerCalendar';
import OwnerServices from './owner/OwnerServices';
import OwnerSiteSettings from './owner/OwnerSiteSettings';
import CustomerServices from './owner/OwnerSiteSettings';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/owner/home" element={<OwnerHome />} />
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/owner/calendar" element={<OwnerCalendar />} />
          <Route path="/customer/calendar" element={<CustomerCalendar />} />
          <Route path="/owner/services" element={<OwnerServices />} />
          <Route path="/owner/site-settings" element={<OwnerSiteSettings />} />
          <Route path="/customer/services" element={<CustomerServices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

