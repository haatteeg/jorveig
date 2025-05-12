import './App.css';
import { Nav } from './Components/Nav/Nav';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Main } from './Components/Main/Main';


function App() {
  return (
    <div className="app-container">
      <Nav />
      <div className="content-area">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
