import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './component/Dashboard.tsx'
import Navbar from "./component/Navbar.tsx"
import Footer from './component/Footer.tsx';

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
