import './App.css';
import { Nav } from './Components/Nav/Nav';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Main } from './Components/Main/Main';
import { useData } from './Components/Function/useData';
import { Temp } from './Components/Temp/Temp';

function App() {
  const data = useData();

  return (
    <div className="app-container">
      {/* <Nav /> */}
      <div className="content-area">
        <Temp data={data} />
        {/* <Sidebar />
        <Main data={data} /> */}
      </div>
    </div>
  );
}

export default App;
