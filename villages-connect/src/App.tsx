import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Events, Directory, Messages, Emergency } from './screens';

// Main App component for Villages Connect
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/emergency" element={<Emergency />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
