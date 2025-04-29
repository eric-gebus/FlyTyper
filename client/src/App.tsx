import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Dashboard from './component/Dashboard'
import Navbar from "./component/Navbar"
import Footer from './component/Footer';

function App() {

  return (
    < div className='layout is-flex is-justify-content-space-between'>
      <Router>
        <Navbar />
        <Dashboard />
        <Footer />
      </Router>
    </div>
  )
}

export default App
