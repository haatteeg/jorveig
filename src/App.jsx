import './App.css';
import { Nav } from './Components/Nav/Nav';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Main } from './Components/Main/Main';
import { Section1 } from './Components/Sidebar/Section1/Section1';
import { useData } from './Components/Function/useData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const data = useData();

  return (
    <Router>
      <div className="app-container">
        <Nav />
        <div className="content-area">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Main data={data} />} />
            <Route path="/section1" element={<Section1 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;