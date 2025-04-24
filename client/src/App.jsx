import './App.css'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './component/Dashboard'
import Navbar from "./component/Navbar"
import Footer from './component/Footer';

function App() {

  return (
    < div className='layout has-background-white-ter'>
      <Router>
        <Navbar />
        <Dashboard />
        <Footer />
      </Router>
    </div>
  )
}

export default App
