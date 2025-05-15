import './App.css';
import { Nav } from './Components/Nav/Nav';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Main } from './Components/Main/Main';
import { useData } from './Components/Function/useData';

function App() {
  const data = useData();

  return (
    <div className="app-container">
      <Nav />
      <div className="content-area">
        <Sidebar />
        <Main data={data} />
      </div>
    </div>
  );
}

export default App;
