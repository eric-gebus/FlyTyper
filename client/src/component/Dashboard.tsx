import { Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import SoloPlay from './SoloPlay.tsx';
import QuickPlay from './QuickPlay.tsx';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/soloplay"
          element={<SoloPlay />}
        />
        <Route
          path="/quickplay"
          element={<QuickPlay />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
